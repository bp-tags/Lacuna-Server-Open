package Lacuna::RPC::Building::BlackHoleGenerator;
# Upcoming enhancements
# Email empires of planets modified.

use Moose;
use utf8;
no warnings qw(uninitialized);
extends 'Lacuna::RPC::Building';
use Lacuna::Util qw(randint random_element);
use Lacuna::Constants qw(FOOD_TYPES ORE_TYPES);

sub app_url {
    return '/blackholegenerator';
}

sub model_class {
    return 'Lacuna::DB::Result::Building::Permanent::BlackHoleGenerator';
}

around 'view' => sub {
  my ($orig, $self, $session_id, $building_id) = @_;
  my $empire = $self->get_empire_by_session($session_id);
  my $building = $self->get_building($empire, $building_id, skip_offline => 1);
  my $out = $orig->($self, $empire, $building);
  my @tasks = bhg_tasks($building);
  if ($building->is_working) {
    $out->{tasks} = {
      seconds_remaining   => $building->work_seconds_remaining,
      can                 => 0,
      };
  }
  else {
    $out->{tasks} = \@tasks;
  }
return $out;
};

sub find_target {
  my ($self, $target_params) = @_;
  unless (ref $target_params eq 'HASH') {
    confess [-32602,
             'The target parameter should be a hash reference. For example { "body_id" : 9999 }.'];
  }
  my $target;
  if (exists $target_params->{body_id}) {
    $target = Lacuna->db
                ->resultset('Lacuna::DB::Result::Map::Body')
                ->find($target_params->{body_id});
  }
  elsif (exists $target_params->{body_name}) {
    $target = Lacuna->db
                ->resultset('Lacuna::DB::Result::Map::Body')
                ->search({ name => $target_params->{body_name} }, {rows=>1})->single;
  }
  elsif (exists $target_params->{x}) {
    $target = Lacuna->db
                ->resultset('Lacuna::DB::Result::Map::Body')
                ->search({ x => $target_params->{x}, y => $target_params->{y} }, {rows=>1})->single;
  }
  unless (defined $target) {
    confess [ 1002, 'Could not find the target.', $target];
  }
return $target;
}

sub generate_singularity {
  my ($self, $session_id, $building_id, $target_params, $task_name, $params) = @_;
  my $empire   = $self->get_empire_by_session($session_id);
  my $building = $self->get_building($empire, $building_id);
  my $body = $building->body;
  my $target = $self->find_target($target_params);
  my $effect = {};
  my $return_stats = {};
  if ($building->is_working) {
    confess [1010, 'The Black Hole Generator is cooling down from the last use.']
  }
  unless (defined $target) {
    confess [1002, 'Could not locate target.'];
  }
  my @tasks = bhg_tasks($building);
  my ($task) = grep { $task_name eq $_->{name} } @tasks;
  unless ($task) {
    confess [1002, 'Could not find task: '.$task_name];
  }
  unless ($building->level >= $task->{min_level}) {
    confess [1013, sprintf("You need a Level %d Black Hole Generator to do that",
                           $task->{min_level})];
  }
  my $btype = $target->get_type;
  unless ( grep { $btype eq $_ } @{$task->{types}} ) {
    confess [1009, $task->{reason}];
  }
# TEST SETTINGS
#  $task->{waste_cost} = 1;
#  $task->{recovery} = 5;
#  $task->{side_chance} = 95;
# TEST SETTINGS
  my $dist = sprintf "%7.2f", $building->body->calculate_distance_to_target($target)/100;
  my $range = $building->level * 10;
  unless ($dist < $range) {
    confess [1009, 'That body is too far away at '.$dist.' with a range of '.$range.'. '.$target->id."\n"];
  }
  unless ($body->waste_stored >= $task->{waste_cost}) {
    confess [1011, 'You need at least '.$task->{waste_cost}.' waste to run that function of the Black Hole Generator.'];
  }
  unless ($task->{occupied}) {
    if ($btype eq 'asteroid') {
      my $platforms = Lacuna->db->resultset('Lacuna::DB::Result::MiningPlatforms')->
                      search({asteroid_id => $target->id });
      my $count = 0;
      while (my $platform = $platforms->next) {
        $count++;
      }
      if ($count) {
        $body->add_news(75, sprintf('Scientists revolt against %s for despicable practices.', $empire->name));
        $effect->{fail} = bhg_self_destruct($building);
        return {
          status => $self->format_status($empire, $body),
          effect => $effect,
        };
      }
    }
    elsif (defined($target->empire)) {
      $body->add_news(75,
             sprintf('Scientists revolt against %s for trying to turn %s into an asteroid.',
                     $empire->name, $target->name));
      $effect->{fail} = bhg_self_destruct($building);
      return {
        status => $self->format_status($empire, $body),
        effect => $effect,
      };
    }
  }
  if ( $task->{name} eq "Change Type" && defined ($target->empire) ) {
    unless ( ($body->empire->id == $target->empire->id) or
             ( $body->empire->alliance_id &&
               ($body->empire->alliance_id == $target->empire->alliance_id))) {
      confess [1009, "You can not change type of a body if it is occupied by another alliance!\n"];
    }
  }
  elsif ( $task->{name} eq "Swap Places" ) {
    my $confess = "";
    my $allowed = 0;
    if (defined($target->empire)) {
      $confess = "You can not attempt that action on a body if it is occupied by another alliance!\n";
      if ($body->empire->id == $target->empire->id) {
        $allowed = 1;
      }
      elsif ($body->empire->alliance_id &&
            ($body->empire->alliance_id == $target->empire->alliance_id)) {
        $allowed = 1;
      }
      elsif ($target->star->station_id) {
        if ($target->star->station->laws->search({type => 'MembersOnlyColonization'})->count) {
          if ($target->star->station->alliance_id == $body->empire->alliance_id) {
            $allowed = 1;
          }
          else {
            $confess = 'Only '.$target->star->station->alliance->name.
              ' members can colonize planets in the jurisdiction of the space station.\n';
          }
        }
      }
      else {
        $allowed = 1;
      }
    }
    else {
      if ($target->star->station_id) {
        if ($target->star->station->laws->search({type => 'MembersOnlyColonization'})->count) {
          if ($target->star->station->alliance_id == $body->empire->alliance_id) {
            $allowed = 1;
          }
          else {
            $confess = 'Only '.$target->star->station->alliance->name.
              ' members can colonize planets in the jurisdiction of the space station.\n';
          }
        }
        else {
          $allowed = 1;
        }
      }
      else {
        $allowed = 1;
      }
    }
    unless ($allowed) {
      confess [ 1010, $confess ];
    }
  }

  $body->spend_waste($task->{waste_cost})->update;
  $building->start_work({}, $task->{recovery})->update;
# Pass the basic checks
# Check for startup failure
  my $fail = randint(0,99) - (30 - sqrt( ($range - $dist) * (300/$range)) * 2.71);
  if (($task->{fail_chance} > $fail )) {
# Something went wrong with the start
    $fail = randint(0,19);
    if ($fail == 0) {
      $return_stats = bhg_self_destruct($building);
      $body->add_news(75,
             sprintf('%s finds a decimal point out of place.',
                     $empire->name));
    }
    elsif ($fail <  6) {
      $return_stats = bhg_decor($building, $body, -1);
      $body->add_news(30,
             sprintf('%s is wracked with changes.',
                     $body->name));
    }
    elsif ($fail < 11) {
      $return_stats = bhg_resource($body, -1);
      $body->add_news(50,
             sprintf('%s opens up a wormhole near their storage area.',
                     $body->name));
    }
    elsif ($fail < 16) {
      $return_stats = bhg_size($building, $body, -1);
      $body->add_news(50,
             sprintf('%s deforms after an expirement goes wild.',
                     $body->name));
    }
    elsif ($fail < 19) {
      $return_stats = bhg_random_make($building);
      $body->add_news(50,
             sprintf('Scientists on %s are concerned when their singularity has a malfunction.',
                     $body->name));
    }
    else {
      $return_stats = bhg_random_type($building);
      $body->add_news(50,
             sprintf('Scientists on %s are concerned when their singularity has a malfunction.',
                     $body->name));
    }
    $effect->{fail} = $return_stats;
  }
  else {
# We have a working BHG!
    if ($task->{name} eq "Make Planet") {
      $return_stats = bhg_make_planet($building, $target);
      $body->add_news(50,
                      sprintf('%s has expanded %s into a habitable world!',
                        $empire->name, $target->name));
    }
    elsif ($task->{name} eq "Make Asteroid") {
      $return_stats = bhg_make_asteroid($building, $target);
      $body->add_news(75, sprintf('%s has destroyed %s.', $empire->name, $target->name));
    }
    elsif ($task->{name} eq "Increase Size") {
      $return_stats = bhg_size($building, $target, 1);
      $body->add_news(50, sprintf('%s has expanded %s.', $empire->name, $target->name));
    }
    elsif ($task->{name} eq "Change Type") {
      $return_stats = bhg_change_type($target, $params);
      $body->add_news(50, sprintf('The geology of %s has been extensively altered by powers unknown', $target->name));
    }
    elsif ($task->{name} eq "Swap Places") {
      $return_stats = bhg_swap($building, $target);
      $body->add_news(50,
        sprintf('%s has switched places with %s!',
                $body->name, $target->name));
    }
    else {
      confess [552, "Internal Error"];
    }
    $effect->{target} = $return_stats;
#And now side effect time
# If we add swap, swap two random unihabited bodies or possibly current planet with another random?
    my $side = randint(0,99);
    if ($task->{side_chance} > $side) {
      my $side_type = randint(0,99);
      if ($side_type < 25) {
        $return_stats = bhg_random_size($building);
      }
      elsif ($side_type < 40) {
        $return_stats = bhg_random_make($building);
      }
      elsif ($side_type < 50) {
        $return_stats = bhg_random_type($building);
      }
      elsif ($side_type < 75) {
        $return_stats = bhg_random_resource($building);
      }
      elsif ($side_type < 95) {
        $return_stats = bhg_random_decor($building);
      }
      else {
        $return_stats = bhg_size($building, $body, 0);
      }
      $effect->{side} = $return_stats;
    }
  }
  return {
    status => $self->format_status($empire, $body),
    effect => $effect,
  };
}

sub bhg_swap {
  my ($building, $target) = @_;
  my $body = $building->body;
  my $return;
  my $old_x        = $body->x;
  my $old_y        = $body->y;
  my $old_zone     = $body->zone;
  my $old_star     = $body->star_id;
  my $old_orbit    = $body->orbit;
  $body->update({
    needs_recalc => 1,
    x            => $target->x,
    y            => $target->y,
    zone         => $target->zone,
    star_id      => $target->star_id,
    orbit        => $target->orbit,
  });
  $target->update({
    needs_recalc => 1,
    x            => $old_x,
    y            => $old_y,
    zone         => $old_zone,
    star_id      => $old_star,
    orbit        => $old_orbit,
  });
  return {
    message  => "Swapped Places",
    name     => $body->name,
    id       => $body->id,
    swapname => $target->name,
    swapid   => $target->id,
  };
}

sub bhg_make_planet {
  my ($building, $body) = @_;
  my $class;
  my $size;
  my $old_class = $body->class;
  my $old_size  = $body->size;
  my $random = randint(0,99);
  if ($random < 5) {
    $class = 'Lacuna::DB::Result::Map::Body::Planet::GasGiant::G'.randint(1,5);
    $size  = randint(70, 121);
  }
  else {
    $class = 'Lacuna::DB::Result::Map::Body::Planet::P'.randint(1,20);
    $size  = 30;
  }
 
  $body->update({
    class                       => $class,
    size                        => $size,
    needs_recalc                => 1,
    usable_as_starter_enabled   => 0,
  });
  $body->sanitize;
  return {
    message   => "Made Planet",
    old_class => $old_class,
    class     => $class,
    old_size  => $old_size,
    size      => $size,
    id        => $body->id,
    name      => $body->name,
  };
}

sub bhg_make_asteroid {
  my ($building, $body) = @_;
  my $old_class = $body->class;
  my $old_size  = $body->size;
  $body->buildings->delete_all;
  $body->update({
    class                       => 'Lacuna::DB::Result::Map::Body::Asteroid::A'.randint(1,21),
    size                        => int($building->level/5),
    needs_recalc                => 1,
    usable_as_starter_enabled   => 0,
    alliance_id => undef,
  });
  return {
    message   => "Made Asteroid",
    old_class => $old_class,
    class     => $body->class,
    old_size  => $old_size,
    size      => $body->size,
    id        => $body->id,
    name      => $body->name,
  };
}

sub bhg_random_make {
  my ($building) = @_;
  my $body = $building->body;
  my $return;
  my $target = Lacuna->db->resultset('Lacuna::DB::Result::Map::Body')->search(
                  { zone => $body->zone, empire_id => undef, },
                  {rows => 1, order_by => 'rand()' }
                )->single;
  my $btype = $target->get_type;
  if ($btype eq 'habitable planet' or $btype eq 'gas giant') {
    $body->add_news(75, sprintf('%s has been destroyed!', $target->name));
    $return = bhg_make_asteroid($building, $target);
  }
  elsif ($btype eq 'asteroid') {
    my $platforms = Lacuna->db->resultset('Lacuna::DB::Result::MiningPlatforms')->
                      search({asteroid_id => $target->id });
    unless ($platforms->next) {
      $body->add_news(50, sprintf('A new planet has appeared where %s had been!', $target->name));
      $return = bhg_make_planet($building, $target);
    }
    else {
      $return = {
        message => "Aborted making planet",
        id      => $target->id,
        name    => $target->name,
      };
    }
  }
  return $return;
}

sub bhg_random_type {
  my ($building) = @_;
  my $body = $building->body;
  my $target = Lacuna->db->resultset('Lacuna::DB::Result::Map::Body')->search(
                  { zone => $body->zone, empire_id => undef, },
                  {rows => 1, order_by => 'rand()' }
                )->single;
  my $btype = $target->get_type;
  my $return;
  if ($btype eq 'habitable planet') {
    my $params = { newtype => randint(1,20) };
    $body->add_news(50, sprintf('%s has gone thru extensive changes.', $target->name));
    $return = bhg_change_type($target, $params);
  }
  elsif ($btype eq 'asteroid') {
    my $params = { newtype => randint(1,21) };
    $body->add_news(50, sprintf('%s has gone thru extensive changes.', $target->name));
    $return = bhg_change_type($target, $params);
  }
  else {
    $return = {
      message => "Fizzle",
      id      => $target->id,
      name    => $target->name,
    };
  }
  return $return;
}

sub bhg_random_size {
  my ($building) = @_;
  my $body = $building->body;
  my $target = Lacuna->db->resultset('Lacuna::DB::Result::Map::Body')->search(
                  { zone => $body->zone, empire_id => undef },
                  {rows => 1, order_by => 'rand()' }
                )->single;
  my $return;
  my $btype = $target->get_type;
  if ($btype eq 'habitable planet') {
    $body->add_news(50, sprintf('%s has deformed.', $target->name));
    $return = bhg_size($building, $target, 0);
  }
  elsif ($btype eq 'asteroid') {
    $body->add_news(50, sprintf('%s has deformed.', $target->name));
    $return = bhg_size($building, $target, 0);
  }
  else {
    $return = {
      message => "Fizzle",
      id      => $target->id,
      name    => $target->name,
    };
  }
  return $return;
}

sub bhg_random_resource {
  my ($building) = @_;
  my $body = $building->body;
  my $target = Lacuna->db->resultset('Lacuna::DB::Result::Map::Body')->search(
                  { zone => $body->zone, empire_id => { '!=' => undef} },
                  {rows => 1, order_by => 'rand()' }
                )->single;
  my $return;
  my $btype = $target->get_type;
  if ($btype eq 'habitable planet' or $btype eq 'gas giant') {
    $body->add_news(50, sprintf('A wormhole briefly appeared on %s.', $target->name));
    my $variance =  (randint(0,9) < 2) ? 1 : 0;
    $return = bhg_resource($target, $variance);
  }
  else {
    $return = {
      message => "No Resources Modified",
      id      => $target->id,
      name    => $target->name,
    };
  }
  return $return;
}

sub bhg_random_decor {
  my ($building) = @_;
  my $body = $building->body;
  my $target = Lacuna->db->resultset('Lacuna::DB::Result::Map::Body')->search(
                  { zone => $body->zone },
                  {rows => 1, order_by => 'rand()' }
                )->single;
  my $btype = $target->get_type;
  my $return = {
                 id        => $target->id,
                 name      => $target->name,
  };
  if ($btype eq 'habitable planet') {
    if ($target->empire_id) {
      $body->add_news(75, sprintf('The population of %s marvels at the new terrain.', $target->name));
    }
    else {
      $body->add_news(30, sprintf('Astromers claim that the surface of %s has changed.', $target->name));
    }
    my $variance =  (randint(0,9) < 2) ? 1 : 0;
    $return = bhg_decor($building, $target, $variance);
  }
  else {
    $return = {
      message => "No decorating",
      id      => $target->id,
      name    => $target->name,
      type    => $btype,
    };
  }
  return $return;
}

sub bhg_self_destruct {
  my ($building) = @_;
  my $body = $building->body;
  my $return = {
                 id        => $body->id,
                 name      => $body->name,
  };
  $body->waste_stored(0);
  my $bombed = $body->buildings;
  my $bombs = $building->level;

  for my $cnt (1..$bombs) {
    my $placement = $bombed->search(
                       { class => { 'not in' => [
                    'Lacuna::DB::Result::Building::Permanent::Crater',
                    'Lacuna::DB::Result::Building::DeployedBleeder',
                ],
            },
        },
        {order_by => { -desc => ['efficiency', 'rand()'] }, rows=>1}
      )->single;
    last unless defined($placement);
    my $amount = randint(10, 100);
    $placement->spend_efficiency($amount)->update;
  }
  $body->needs_surface_refresh(1);
  $body->needs_recalc(1);
  $body->update;
  $building->update({class=>'Lacuna::DB::Result::Building::Permanent::Crater'});
  $return->{message} = "Black Hole Generator Destroyed";
  return $return;
}

sub bhg_decor {
  my ($building, $body, $variance) = @_;
  my @decor = qw(
                 Lacuna::DB::Result::Building::Permanent::Crater
                 Lacuna::DB::Result::Building::Permanent::Lake
                 Lacuna::DB::Result::Building::Permanent::RockyOutcrop
                 Lacuna::DB::Result::Building::Permanent::Grove
                 Lacuna::DB::Result::Building::Permanent::Sand
                 Lacuna::DB::Result::Building::Permanent::Lagoon
              );
  my $plant; my $max_level;
  if ($variance == -1) {
    $plant = randint(1, int($building->level/10)+1);
    $max_level = 3;
  }
  elsif ($variance == 0) {
    $plant = randint(1, int($building->level/5)+1);
    $max_level = int($building->level/5);
  }
  else {
    $plant = randint(1, int($building->level/3)+1);
    $max_level = $building->level;
  }
  my $planted = 0;
  my $now = DateTime->now;
  foreach my $cnt (1..$plant) {
    my ($x, $y) = eval { $body->find_free_space};
    unless ($@) {
        my $deployed = Lacuna->db->resultset('Lacuna::DB::Result::Building')->new({
            date_created => $now,
            class        => random_element(\@decor),
            x            => $x,
            y            => $y,
            level        => randint(1, $max_level),
            body_id      => $body->id,
        })->insert;
        $planted++;
    }
    else {
      last;
    }
  }
  if ($planted) {
    $body->needs_surface_refresh(1);
    $body->update;
    if ($body->empire) {
      my $plural = ($planted > 1) ? "s" : "";
      $body->empire->send_predefined_message(
        tags        => ['Alert'],
        filename    => 'new_decor.txt',
        params      => [$planted, $plural, $body->name],
      );
    }
    return {
      message => "$planted decor items placed",
      id      => $body->id,
      name    => $body->name,
    };
  }
  else {
    return {
      message => "Fizzle",
      id      => $body->id,
      name    => $body->name,
    };
  }
}

sub bhg_resource {
  my ($body, $variance) = @_;
# If -1 deduct resources, if 0 randomize, if 1 add
  my @food = map { $_.'_stored' } FOOD_TYPES;
  my @ore  = map { $_.'_stored' } ORE_TYPES;

  my $return = {
    variance  => $variance,
    id        => $body->id,
    name      => $body->name,
    message   => "Resource Shuffle",
  };
# Waste always reacts oddly
  my $waste_msg;
  my $waste_rnd = randint(1,5);
  if ($waste_rnd > 3) {
    $body->waste_stored($body->waste_capacity);
    $return->{waste} = "Filled";
    $waste_msg = "filled our waste containers";
  }
  elsif ($waste_rnd < 3) {
    $body->waste_stored(0);
    $return->{waste} = "Zero";
    $waste_msg = "emptied our waste containers";
  }
  else {
    $body->waste_stored(randint(0, $body->waste_capacity));
    $return->{waste} = "Random";
    $waste_msg = "randomized our waste storage";
  }
# Other resources
  my $resource_msg;
  if ($variance == 1) {
    $body->water_stored(randint($body->water_stored, $body->water_capacity));
    $body->energy_stored(randint($body->energy_stored, $body->energy_capacity));
    my $arr = rand_perc(scalar @food);
    my $food_stored = 0;
    for my $attrib (@food) { $food_stored += $body->$attrib; }
    my $food_room = $body->food_capacity - $food_stored;
    for (0..(scalar @food - 1)) {
      my $attribute = $food[$_];
      $body->$attribute(randint($attribute,
                              int($food_room * $arr->[$_]/100) ));
    }
    $arr = rand_perc(scalar @ore);
    my $ore_stored = 0;
    for my $attrib (@ore) { $ore_stored += $body->$attrib; }
    my $ore_room = $body->ore_capacity - $ore_stored;
    for (0..(scalar @ore - 1)) {
      my $attribute = $ore[$_];
      $body->$attribute(randint($attribute,
                              int($ore_room * $arr->[$_]/100) ));
    }
    $resource_msg = "added various resources";
  }
  elsif ($variance == -1) {
    $body->water_stored(randint(0, $body->water_stored));
    $body->energy_stored(randint(0, $body->energy_stored));
    foreach my $attribute (@food, @ore) {
      next unless $body->$attribute;
      $body->$attribute(randint(0, $body->$attribute));
    }
    $resource_msg = "took away various resources";
  }
  else {
    $body->water_stored(randint(0, $body->water_capacity));
    $body->energy_stored(randint(0, $body->energy_capacity));
    my $arr = rand_perc(scalar @food);
    for (0..(scalar @food - 1)) {
      my $attribute = $food[$_];
      $body->$attribute(randint(0, int($body->food_capacity * $arr->[$_]/100) ));
    }
    $arr = rand_perc(scalar @ore);
    for (0..(scalar @ore - 1)) {
      my $attribute = $ore[$_];
      $body->$attribute(randint(0, int($body->ore_capacity * $arr->[$_]/100) ));
    }
    $resource_msg = "randomized our resources. We may need to do a full inventory";
  }
  $body->empire->send_predefined_message(
    tags        => ['Alert'],
    filename    => 'wormhole.txt',
    params      => [$body->name, $waste_msg, $resource_msg],
  );
  $body->update({
    needs_recalc                => 1,
  });
  return $return;
}

sub rand_perc {
  my ($num) = @_;

  my @arr;
  for (1..100) {
    $arr[randint(0,$num)]++;
  }
  return \@arr;
}

sub bhg_change_type {
  my ($body, $params) = @_;
  my $class = $body->class;
  my $old_class = $class;
  my $btype = $body->get_type;
  if ($btype eq 'asteroid') {
    if ($params->{newtype} >= 1 and $params->{newtype} <= 21) {
      $class = 'Lacuna::DB::Result::Map::Body::Asteroid::A'.$params->{newtype};
    }
    else {
      confess [1013, "Trying to change to a forbidden type!"];
    }
  }
  elsif ($btype eq 'gas giant') {
    confess [1013, "We can't change the type of that body"];
  }
  elsif ($btype eq 'habitable planet') {
    if ($params->{newtype} >= 1 and $params->{newtype} <= 20) {
      $class = 'Lacuna::DB::Result::Map::Body::Planet::P'.$params->{newtype};
      $old_class =~ /::(P\d+)/;
      my $old_type = $1;
      $class =~ /::(P\d+)/;
      my $new_type = $1;
      if ($body->empire and $old_type ne $new_type) {
        $body->empire->send_predefined_message(
          tags        => ['Alert'],
          filename    => 'changed_type.txt',
          params      => [$body->name, $old_type, $new_type],
        );
      }
    }
    else {
      confess [1013, "Trying to change to a forbidden type!"];
    }
  }
  else {
    confess [1013, "We can't change the type of that body"];
  }
  if ($class eq $old_class) {
    return {
      message    => "Fizzle",
      id         => $body->id,
      name       => $body->name,
    };
  }
  my $starter = (!$body->empire && $body->size >= 40 && $body->size <= 50) ? 1 : 0;
  $body->update({
    needs_recalc                => 1,
    class                       => $class,
    usable_as_starter_enabled   => $starter,
  });
  return {
    message   => "Changed Type",
    old_class => $old_class,
    class     => $class,
    id        => $body->id,
    name      => $body->name,
  };
}

sub bhg_size {
  my ($building, $body, $variance) = @_;
  my $current_size = $body->size;
  my $old_size     = $current_size;
  my $btype = $body->get_type;
  if ($btype eq 'asteroid') {
    if ($variance == -1) {
      $current_size -= randint(1, int($building->level/10)+1);
      $current_size = 1 if ($current_size < 1);
    }
    elsif ($variance == 1) {
      if ($current_size >= 10) {
        $current_size++ if (randint(0,99) < 10);
        $current_size = 20 if ($current_size > 20);
      }
      else {
        $current_size += int($building->level/5);
        $current_size = 10 if ($current_size > 10);
      }
    }
    else {
      $current_size += randint(1,5) - 3;
      $current_size = 1 if ($current_size < 1);
    }
  }
  elsif ($btype eq 'gas giant') {
    confess [1013, "We can't change the sizes of that body"];
  }
  elsif ($btype eq 'habitable planet') {
    if ($variance == -1) {
      $current_size -= randint(1,$building->level);
      $current_size = 30 if ($current_size < 30);
    }
    elsif ($variance == 1) {
      if ($current_size >= 65) {
        $current_size++ if (randint(0,99) < 10);
        $current_size = 70 if ($current_size > 70);
      }
      else {
        $current_size += $building->level;
        $current_size = 65 if ($current_size > 65);
      }
    }
    else {
      $current_size += randint(1,5) - 3;
      $current_size = 30 if ($current_size < 30);
    }
    if ($old_size != $current_size && $body->empire) {
      $body->empire->send_predefined_message(
        tags        => ['Alert'],
        filename    => 'changed_size.txt',
        params      => [$body->name, $old_size, $current_size],
      );
    }
  }
  else {
    confess [1013, "We can't change the sizes of that body"];
  }
  if ($old_size == $current_size) {
    return {
      message   => "Fizzle",
      id        => $body->id,
      name      => $body->name,
    };
  }
  my $starter = (!$body->empire && $body->size >= 40 && $body->size <= 50) ? 1 : 0;
  $body->update({
    needs_recalc                => 1,
    size                        => $current_size,
    usable_as_starter_enabled   => $starter,
  });
  return {
    message   => "Changed Size",
    old_size  => $old_size,
    size      => $current_size,
    id        => $body->id,
    name      => $body->name,
    type      => $btype,
  };
}

sub bhg_tasks {
  my ($building) = @_;
  my $day_sec = 60 * 60 * 24;
  my $blevel = $building->level == 0 ? 1 : $building->level;
  my @tasks = (
    {
      name         => 'Make Asteroid',
      types        => ['habitable planet', 'gas giant'],
      reason       => "You can only make an asteroid from a planet.",
      occupied     => 0,
      min_level    => 10,
      recovery     => int($day_sec * 90/$blevel),
      waste_cost   => 50_000_000,
      fail_chance  => int(100 - $building->level * 3),
      side_chance  => 25,
    },
    {
      name         => 'Make Planet',
      types        => ['asteroid'],
      reason       => "You can only make a planet from an asteroid.",
      occupied     => 0,
      min_level    => 15,
      recovery     => int($day_sec * 90/$blevel),
      waste_cost   => 100_000_000,
      fail_chance  => int(100 - $building->level * 2.75),
      side_chance  => 40,
    },
    {
      name         => 'Increase Size',
      types        => ['habitable planet', 'asteroid'],
      reason       => "You can only increase the sizes of habitable planets and asteroids.",
      occupied     => 1,
      min_level    => 20,
      recovery     => int($day_sec * 180/$blevel),
      waste_cost   => 1_000_000_000,
      fail_chance  => int(100 - $building->level * 2.5),
      side_chance  => 60,
    },
    {
      name         => 'Change Type',
      types        => ['habitable planet'],
      reason       => "You can only change the type of habitable planets.",
      occupied     => 1,
      min_level    => 25,
      recovery     => int($day_sec * 300/$blevel),
      waste_cost   => 10_000_000_000,
      fail_chance  => int(100 - $building->level * 2.25),
      side_chance  => 75,
    },
    {
      name         => 'Swap Places',
      types        => ['asteroid', 'habitable planet', 'gas giant', 'space station'],
      reason       => "Invalid reason.",
      occupied     => 1,
      min_level    => 30,
      recovery     => int($day_sec * 360/$blevel),
      waste_cost   => 15_000_000_000,
      fail_chance  => int(100 - $building->level * 2),
      side_chance  => 90,
    },
  );
  return @tasks;
}

__PACKAGE__->register_rpc_method_names(qw(generate_singularity));

no Moose;
__PACKAGE__->meta->make_immutable;

