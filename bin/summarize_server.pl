use 5.010;
use strict;
use lib '/data/Lacuna-Server/lib';
use Lacuna::DB;
use Lacuna;
use Lacuna::Util qw(format_date);
use Getopt::Long;
use JSON;
use SOAP::Amazon::S3;
use Lacuna::Constants qw(SHIP_TYPES);


  $|=1;

  our $quiet;

  GetOptions(
    'quiet'         => \$quiet,  
  );

  out('Started');
  my $start = DateTime->now;

  out('Loading DB');
  our $db = Lacuna->db;

  summarize_spies();
  summarize_colonies();
  my $mapping = summarize_empires();
  summarize_alliances();
  delete_old_records($start);
  rank_spies();
  rank_colonies();
  rank_empires();
  rank_alliances();
  output_map($mapping);
  generate_overview();

  my $finish = time;
  out('Finished');
  out((($finish - $start->epoch)/60)." minutes have elapsed");
exit;


###############
## SUBROUTINES
###############

sub generate_overview {
    out('Generating Overview');
    my $stars       = $db->resultset('Lacuna::DB::Result::Map::Star');
    my $bodies      = $db->resultset('Lacuna::DB::Result::Map::Body');
    my @off_limits  = $bodies->search({empire_id => {'<' => 2}})->get_column('id')->all;
    my $ships       = $db->resultset('Lacuna::DB::Result::Ships')->search({body_id => { 'not in' => \@off_limits}});
    my $spies       = $db->resultset('Lacuna::DB::Result::Spies')->search({empire_id => { '>' => 1}});
    my $buildings   = $db->resultset('Lacuna::DB::Result::Building')->search({body_id => { 'not in' => \@off_limits}});
    my $empires     = $db->resultset('Lacuna::DB::Result::Empire')->search({id => { '>' => 1}});
    my $probes      = $db->resultset('Lacuna::DB::Result::Probes')->search({empire_id => { '>' => 1}});
    
    # basics
    out('Getting Basic Counts');
    my %out = (
        stars       => {
            count           => $stars->count,
            probes_count    => $probes->count,
            probed_count    => $probes->search(undef, { group_by => ['star_id'] })->count,
        },
        bodies      => {
            count           => $bodies->count,
            colony_count    => $bodies->search({empire_id => { '>' => 0}})->count,
        },
        ships       => {
            count           => $ships->count,
        },
        spies       => {
            count                           => $spies->count,
            average_defense                 => $spies->get_column('defense')->func('avg'),
            average_offense                 => $spies->get_column('offense')->func('avg'),
            highest_defense                 => $spies->get_column('defense')->max,
            highest_offense                 => $spies->get_column('offense')->max,
            gathering_intelligence_count    => $spies->search({task => 'Gather Intelligence'})->count,
            hacking_networks_count          => $spies->search({task => 'Hack Networks'})->count,
            countering_espionage_count      => $spies->search({task => 'Counter Espionage'})->count,
            inciting_rebellion_count        => $spies->search({task => 'Incite Rebellion'})->count,
            sabotaging_infrastructure_count => $spies->search({task => 'Sabotage Infrastructure'})->count,
            appropriating_technology_count  => $spies->search({task => 'Appropriate Technology'})->count,
            travelling_count                => $spies->search({task => 'Travelling'})->count,
            training_count                  => $spies->search({task => 'Training'})->count,
            in_prison_count                 => $spies->search({task => 'Captured'})->count,
            unconscious_count               => $spies->search({task => 'Unconscious'})->count,
            idle_count                      => $spies->search({task => 'Idle'})->count,
        },
        buildings   => {
            count           => $buildings->count,
        },
        empires     => {
            count                       => $empires->count,
            average_university_level    => $empires->get_column('university_level')->func('avg'),
            highest_university_level    => $empires->get_column('university_level')->max,
            isolationist_count          => $empires->search({is_isolationist => 1})->count,
            essentia_using_count        => $empires->search({essentia => { '>' => 0 }})->count,
            currently_active_count      => $empires->search({last_login => {'>=' => DateTime->now->subtract(hours=>1)}})->count,
            active_today_count          => $empires->search({last_login => {'>=' => DateTime->now->subtract(hours=>24)}})->count,
            active_this_week_count      => $empires->search({last_login => {'>=' => DateTime->now->subtract(days=>7)}})->count,
        },
    );
    
    # flesh out bodies
    out('Flesh Out Body Stats');
    my %body_types = (
        gas_giants  => 'Lacuna::DB::Result::Map::Body::Planet::GasGiant%',
        habitables  => 'Lacuna::DB::Result::Map::Body::Planet::P%',
        stations    => 'Lacuna::DB::Result::Map::Body::Planet::Station',
        asteroids   => 'Lacuna::DB::Result::Map::Body::Asteroid%',
    );
    foreach my $key (keys %body_types) {
  out($key);
        my $type = $bodies->search({class => {like => $body_types{$key}}});
        $out{bodies}{types}{$key} = {
            count           => $type->count,
            average_size    => $type->get_column('size')->func('avg'),
            largest_size    => $type->get_column('size')->max,
            smallest_size   => $type->get_column('size')->min,
            average_orbit   => $type->get_column('orbit')->func('avg'),
        };
    }

    # flesh out orbits
    out('Flesh Out Orbital Stats');
    foreach my $orbit (1..8) {
  out($orbit);
        $out{orbits}{$orbit} = {
            inhabited   => $bodies->search({empire_id => {'>', 0}, orbit => $orbit})->count,
            bodies      => $bodies->search({orbit => $orbit})->count,
        }
    }

    # flesh out buildings
    out('Flesh Out Building Stats');
    my $distinct = $buildings->search(undef, { group_by => ['class'] })->get_column('class');
    while (my $class = $distinct->next) {
  out($class);
        my $type_rs = $buildings->search({class=>$class});
        my $count = $type_rs->count;
        $out{buildings}{types}{$class->name} = {
            average_level       => $type_rs->get_column('level')->func('avg'),
            highest_level       => $type_rs->get_column('level')->max,
            count               => $count,
        };
    }

    # flesh out ships
    out('Flesh Out Ship Stats');
    foreach my $type (SHIP_TYPES) {
        my $type_rs = $ships->search({type=>$type});
        my $count = $type_rs->count;
        $out{ships}{types}{$type} = {
            average_hold_size   => $type_rs->get_column('hold_size')->func('avg'),
            largest_hold_size   => $type_rs->get_column('hold_size')->max,
            smallest_hold_size  => $type_rs->get_column('hold_size')->min,
            average_speed       => $type_rs->get_column('speed')->func('avg'),
            fastest_speed       => $type_rs->get_column('speed')->max,
            slowest_speed       => $type_rs->get_column('speed')->min,
            count               => $count
        };
    }

    out('Write To S3');
    my $config = Lacuna->config;
    my $s3 = SOAP::Amazon::S3->new($config->get('access_key'), $config->get('secret_key'), { RaiseError => 1 });
    my $bucket = $s3->bucket($config->get('feeds/bucket'));
    my $object = $bucket->putobject('server_overview.json', to_json(\%out), { 'Content-Type' => 'application/json' });
    $object->acl('public');
}


sub rank_spies {
    out('Ranking Spies');
    my $spies = $db->resultset('Lacuna::DB::Result::Log::Spies');
    foreach my $field (qw(level success_rate dirtiest)) {
        my $ranked = $spies->search(undef, {order_by => {-desc => $field}});
        my $counter = 1;
        while (my $spy = $ranked->next) {
            $spy->update({$field.'_rank' => $counter++});
        }
    }
}

sub rank_colonies {
    out('Ranking Colonies');
    my $colonies = $db->resultset('Lacuna::DB::Result::Log::Colony');
    foreach my $field (qw(population)) {
        my $ranked = $colonies->search(undef, {order_by => {-desc => $field}});
        my $counter = 1;
        while (my $colony = $ranked->next) {
            $colony->update({$field.'_rank' => $counter++});
        }
    }
}

sub rank_empires {
    out('Ranking Empires');
    my $empires = $db->resultset('Lacuna::DB::Result::Log::Empire');
    foreach my $field (qw(empire_size university_level offense_success_rate defense_success_rate dirtiest)) {
        my $ranked = $empires->search(undef, {order_by => {-desc => $field}});
        my $counter = 1;
        while (my $empire = $ranked->next) {
            $empire->update({$field.'_rank' => $counter++});
        }
    }
}

sub rank_alliances {
    out('Ranking Alliances');
    my $alliances = $db->resultset('Lacuna::DB::Result::Log::Alliance');
    foreach my $field (qw(influence population space_station_count average_empire_size offense_success_rate defense_success_rate dirtiest)) {
        my $ranked = $alliances->search(undef, {order_by => {-desc => $field}});
        my $counter = 1;
        while (my $alliance = $ranked->next) {
            $alliance->update({$field.'_rank' => $counter++});
        }
    }
}

sub delete_old_records {
    out('Deleting old records');
    my $start = shift;
    $db->resultset('Lacuna::DB::Result::Log::Alliance')->search({date_stamp => { '<' => $start}})->delete;
    $db->resultset('Lacuna::DB::Result::Log::Empire')->search({date_stamp => { '<' => $start}})->delete;
    $db->resultset('Lacuna::DB::Result::Log::Colony')->search({date_stamp => { '<' => $start}})->delete;
    $db->resultset('Lacuna::DB::Result::Log::Spies')->search({date_stamp => { '<' => $start}})->delete;
}

sub summarize_alliances { 
  out('Summarizing Alliances');
  my $logs = $db->resultset('Lacuna::DB::Result::Log::Alliance');
  my $alliances = $db->resultset('Lacuna::DB::Result::Alliance');
  my $empire_logs = $db->resultset('Lacuna::DB::Result::Log::Empire');
  while (my $alliance = $alliances->next) {
    next if ! defined $alliance->leader_id; # until Alliances get deleted...
      out($alliance->name);
    my %alliance_data = (
        date_stamp                 => DateTime->now,
        space_station_count         => 0,
        influence                   => 0,
        alliance_id                 => $alliance->id,
        alliance_name               => $alliance->name,
        );
    my $empires = $empire_logs->search({alliance_id => $alliance->id});
    while ( my $empire = $empires->next) {
      $alliance_data{member_count}++;
      $alliance_data{colony_count}             += $empire->colony_count;
      $alliance_data{space_station_count}      += $empire->space_station_count;
      $alliance_data{influence}                += $empire->influence;
      $alliance_data{population}               += $empire->population;
      $alliance_data{building_count}           += $empire->building_count;
      $alliance_data{average_building_level}   += $empire->average_building_level;
      $alliance_data{defense_success_rate}     += $empire->defense_success_rate;
      $alliance_data{offense_success_rate}     += $empire->offense_success_rate;
      $alliance_data{dirtiest}                 += $empire->dirtiest;
      $alliance_data{spy_count}                += $empire->spy_count;
      $alliance_data{average_empire_size}      += $empire->empire_size;
      $alliance_data{average_university_level} += $empire->university_level;
    }
    if ($alliance_data{member_count}) {
      $alliance_data{average_empire_size}     /= $alliance_data{member_count};
      $alliance_data{average_university_level}/= $alliance_data{member_count};
      $alliance_data{average_building_level}  /= $alliance_data{member_count};
      $alliance_data{offense_success_rate}    /= $alliance_data{member_count};
      $alliance_data{defense_success_rate}    /= $alliance_data{member_count};
    }
    my $log = $logs->search({alliance_id => $alliance->id},{rows=>1})->single;
    if (defined $log) {
      if ($alliance_data{member_count}) {
        $log->update(\%alliance_data);
      }
      else {
        $log->delete;
      }
    }
    else {
      $logs->new(\%alliance_data)->insert;
    }
  }
}

sub summarize_empires { 
  out('Summarizing Empires');
  my $logs = $db->resultset('Lacuna::DB::Result::Log::Empire');
  my $empires = $db->resultset('Lacuna::DB::Result::Empire')->search({ id   => {'>' => 1} });
  my $colony_logs = $db->resultset('Lacuna::DB::Result::Log::Colony');
  my %mapping;
  while (my $empire = $empires->next) {
    out($empire->name);
    my %empire_data = (
        date_stamp       => DateTime->now,
        university_level => $empire->university_level,
        empire_id        => $empire->id,
        empire_name      => $empire->name,
        alliance_id      => $empire->alliance_id,
        );
    my %map_data = (
        empire_id        => $empire->id,
        empire_name      => $empire->name,
        alliance_id      => $empire->alliance_id,
        home_id          => $empire->home_planet_id,
    );
    out("Working on Empire: $map_data{empire_name} $map_data{alliance_id} $map_data{home_id}");
    if ($empire->alliance_id) {
      $empire_data{alliance_name} = $empire->alliance->name;
      $map_data{alliance_name}    = $empire->alliance->name;
    }
    else {
      $empire_data{alliance_name} = undef;
      $map_data{alliance_id}   = 0;
      $map_data{alliance_name} = "Unalligned";
    }
    my @map_colonies;
    my $colonies = $colony_logs->search({empire_id => $empire->id});
    while ( my $colony = $colonies->next) {
      if ($colony->is_space_station) {
        $empire_data{influence}                 += $colony->influence;
        $empire_data{space_station_count}++;
        my %map_col = (
          type => "SS",
          x    => $colony->x,
          y    => $colony->y,
          zone => $colony->zone,
        );
        push @map_colonies, \%map_col;
      }
      else {
        $empire_data{colony_count}++;
        $empire_data{population}                += $colony->population;
        $empire_data{population_delta}          += $colony->population_delta;
        $empire_data{building_count}            += $colony->building_count;
        $empire_data{average_building_level}    += $colony->average_building_level;
        $empire_data{highest_building_level}    =  $colony->highest_building_level if ($colony->highest_building_level > $empire_data{highest_building_level});
        $empire_data{food_hour}                 += $colony->food_hour;
        $empire_data{ore_hour}                  += $colony->ore_hour;
        $empire_data{energy_hour}               += $colony->energy_hour;
        $empire_data{water_hour}                += $colony->water_hour;
        $empire_data{waste_hour}                += $colony->waste_hour;
        $empire_data{happiness_hour}            += $colony->happiness_hour;
        $empire_data{defense_success_rate}      += $colony->defense_success_rate;
        $empire_data{defense_success_rate_delta}+= $colony->defense_success_rate_delta;
        $empire_data{offense_success_rate}      += $colony->offense_success_rate;
        $empire_data{offense_success_rate_delta}+= $colony->offense_success_rate_delta;
        $empire_data{dirtiest}                  += $colony->dirtiest;
        $empire_data{dirtiest_delta}            += $colony->dirtiest_delta;
        $empire_data{spy_count}                 += $colony->spy_count;
        if ($colony->body_id eq $map_data{home_id}) {
          my %map_col = (
            type => "Cap",
            x    => $colony->x,
            y    => $colony->y,
            zone => $colony->zone,
          );
          push @map_colonies, \%map_col;
        }
      }
    }
    if (scalar @map_colonies > 0) {
      $map_data{bodies} = \@map_colonies;
      %{$mapping{$map_data{alliance_id}}} = %map_data;
    }
    if ($empire_data{colony_count}) {
      $empire_data{average_building_level}    = $empire_data{average_building_level} / $empire_data{colony_count};
      $empire_data{offense_success_rate}      = $empire_data{offense_success_rate} / $empire_data{colony_count};
      $empire_data
{defense_success_rate}      = $empire_data{defense_success_rate} / $empire_data{colony_count};
    }
    $empire_data{empire_size} = $empire_data{colony_count} * $empire_data{population};
    my $log = $logs->search({empire_id => $empire->id},{rows=>1})->single;
    if (defined $log) {
      $empire_data{colony_count_delta} = $empire_data{colony_count} - $log->colony_count + $log->colony_count_delta;
      $empire_data{empire_size_delta} = ($empire_data{colony_count_delta}) ? $empire_data{colony_count_delta} * $empire_data{population_delta} : $empire_data{population_delta};
      $log->update(\%empire_data);
    }
    else {
      $logs->new(\%empire_data)->insert;
    }
  }
  my $ai = $db->resultset('Lacuna::DB::Result::Empire')->search({ id   => {'<' => 0} });
  out('Summarizing AI for map');
  while (my $empire = $ai->next) {
    my %map_data = (
        empire_id        => $empire->id,
        empire_name      => $empire->name,
        alliance_id      => $empire->id,
        alliance_name    => $empire->name,
        home_id          => $empire->home_planet_id,
    );
    out("Working on Empire: $map_data{empire_name} $map_data{alliance_id}");
    my @map_colonies;
    my $colonies = $db->resultset('Lacuna::DB::Result::Map::Body')->search({ empire_id   => $empire->id});
    while ( my $colony = $colonies->next) {
      my %map_col = (
        x    => $colony->x,
        y    => $colony->y,
        zone => $colony->zone,
      );
      my $btype = $colony->get_type;
      if ($btype eq "space staion") {
        $map_col{type} = "SS",
      }
      elsif ($colony->id == $map_data{home_id}) {
        $map_col{type} = "Cap",
      }
      else {
        $map_col{type} = "Col",
      }
      push @map_colonies, \%map_col;
    }
    if (scalar @map_colonies > 0) {
      $map_data{bodies} = \@map_colonies;
      %{$mapping{$map_data{alliance_id}}} = %map_data;
    }
  }
  return (\%mapping);
}

sub summarize_colonies { 
    out('Summarizing Planets');
    my $logs = $db->resultset('Lacuna::DB::Result::Log::Colony');
    my $planets = $db->resultset('Lacuna::DB::Result::Map::Body')->search({ empire_id   => {'>' => 1} },{order_by => 'name'});
    my $spy_logs = $db->resultset('Lacuna::DB::Result::Log::Spies');
    while (my $planet = $planets->next) {
        out($planet->name);
        my $log = $logs->search({planet_id => $planet->id},{rows=>1})->single;
        my %colony_data = (
            date_stamp             => DateTime->now,
            planet_name            => $planet->name,
            building_count         => $planet->buildings->count,
            population             => $planet->population,
            population_delta       => (defined $log ? $log->population_delta + $planet->population - $log->population :  $planet->population ),
            average_building_level => $planet->buildings->get_column('level')->func('avg'),
            highest_building_level => $planet->buildings->get_column('level')->max,
            food_hour              => $planet->food_hour,
            water_hour             => $planet->water_hour,
            waste_hour             => $planet->waste_hour,
            energy_hour            => $planet->energy_hour,
            ore_hour               => $planet->ore_hour,
            happiness_hour         => $planet->happiness_hour,
            empire_id              => $planet->empire_id,
            empire_name            => $planet->empire->name,
            body_id                => $planet->id,
            x                      => $planet->x,
            y                      => $planet->y,
            zone                   => $planet->zone,
        );
        if ($planet->class =~ /Station$/) {
            $colony_data{is_space_station} = 1;
            $colony_data{influence} = $planet->influence_spent;
        }


        my $spies = $spy_logs->search({planet_id => $planet->id});
        while (my $spy = $spies->next) {
          $colony_data{spy_count}++;
            $colony_data{offense_success_rate}          += $spy->offense_success_rate;
            $colony_data{offense_success_rate_delta}    += $spy->offense_success_rate_delta;
            $colony_data{defense_success_rate}          += $spy->defense_success_rate;
            $colony_data{defense_success_rate_delta}    += $spy->defense_success_rate_delta;
            $colony_data{dirtiest}                      += $spy->dirtiest;
            $colony_data{dirtiest_delta}                += $spy->dirtiest_delta;
        }
        $colony_data{offense_success_rate} = ($colony_data{spy_count}) ? $colony_data{offense_success_rate} / $colony_data{spy_count} : 0;
        $colony_data{defense_success_rate} = ($colony_data{spy_count}) ? $colony_data{defense_success_rate} / $colony_data{spy_count} : 0;
        if (defined $log) {
            $log->update(\%colony_data);
        }
        else {
            $colony_data{planet_id}    = $planet->id;
            $logs->new(\%colony_data)->insert;
        }
    }
}

sub summarize_spies {
    out('Summarizing Spies');
    my $spies = $db->resultset('Lacuna::DB::Result::Spies')->search({ empire_id   => {'>' => 1} });
    my $logs = $db->resultset('Lacuna::DB::Result::Log::Spies');
    while (my $spy = $spies->next) {
        out($spy->name);
        my $log = $logs->search({ spy_id => $spy->id },{ rows => 1 } )->single;
        my $offense_success_rate = ($spy->offense_mission_count) ? 100 * $spy->offense_mission_successes / $spy->offense_mission_count : 0;
        my $defense_success_rate = ($spy->defense_mission_count) ? 100 * $spy->defense_mission_successes / $spy->defense_mission_count : 0;
        my $success_rate = $offense_success_rate + $defense_success_rate;
        my $planet = $db->resultset('Lacuna::DB::Result::Map::Body')->find($spy->from_body_id);
        my %spy_data = (
            date_stamp                  => DateTime->now,
            spy_name                    => $spy->name,
            planet_id                   => $spy->from_body_id,
            planet_name                 => $planet->name,
            level                       => $spy->level,
            level_delta                 => 0,
            offense_success_rate        => $offense_success_rate,
            offense_success_rate_delta  => 0,
            defense_success_rate        => $defense_success_rate,
            defense_success_rate_delta  => 0,
            success_rate                => $success_rate,
            success_rate_delta          => 0,
            age                         => time - $spy->date_created->epoch,
            times_captured              => $spy->times_captured,
            times_turned                => $spy->times_turned,
            seeds_planted               => $spy->seeds_planted,
            spies_killed                => $spy->spies_killed,
            spies_captured              => $spy->spies_captured,
            spies_turned                => $spy->spies_turned,
            things_destroyed            => $spy->things_destroyed,
            things_stolen               => $spy->things_stolen,
            dirtiest                    => ($spy->seeds_planted + $spy->spies_killed + $spy->spies_captured + $spy->spies_turned + $spy->things_destroyed + $spy->things_stolen),
            dirtiest_delta              => 0,
            empire_id                   => $spy->empire_id,
            empire_name                 => $spy->empire->name,
        );
        if (defined $log) {
            $spy_data{dirtiest_delta}               = $spy_data{dirtiest} - $log->dirtiest + $log->dirtiest_delta;
            $spy_data{level_delta}                  = $spy->level - $log->level;
            $spy_data{defense_success_rate_delta}   = $defense_success_rate - $log->defense_success_rate + $log->defense_success_rate_delta;
            $spy_data{offense_success_rate_delta}   = $offense_success_rate - $log->offense_success_rate + $log->offense_success_rate_delta;
            $spy_data{success_rate_delta}           = $success_rate - $log->success_rate + $log->success_rate_delta;
            $log->update(\%spy_data);
        }
        else {
            $spy_data{spy_id}       = $spy->id;
            $logs->new(\%spy_data)->insert;
        }
    }
}

sub output_map {
  my $mapping = shift;
  
  my %output;
  my $star_map_size = Lacuna->config->get('map_size');
  $output{map} = {
    bounds => $star_map_size,
  };
  for my $emp_id (keys %$mapping) {
    my @info;
    my @data;
    for my $bod (@{$mapping->{$emp_id}->{bodies}}) {
      my $info_str =
        sprintf("%s (%s) -- %s : (%d,%d) [%s]",
          $mapping->{$emp_id}->{empire_name},
          $mapping->{$emp_id}->{alliance_name},
          $bod->{type},
          $bod->{x},
          $bod->{y},
          $bod->{zone});
      my $data_str = [ $bod->{x}, $bod->{y} ];
      push @info, $info_str;
      push @data, $data_str;
    }
    my $key = $mapping->{$emp_id}->{alliance_id};
    if (defined $output{alliances}->{$key}) {
      push @{$output{alliances}->{$key}->{info}}, @info;
      push @{$output{alliances}->{$key}->{data}}, @data;
    }
    else {
      $output{alliances}->{$key}->{label}       = $mapping->{$emp_id}->{alliance_name};
      $output{alliances}->{$key}->{alliance_id} = $mapping->{$emp_id}->{alliance_id};
      $output{alliances}->{$key}->{info}        = \@info;
      $output{alliances}->{$key}->{data}        = \@data;
    }
  }
  open(OUT, ">starmap.json");
  print OUT to_json(\%output, { pretty => 1});
  close(OUT);
  out('Write To S3');
  my $config = Lacuna->config;
  my $s3 = SOAP::Amazon::S3->new($config->get('access_key'), $config->get('secret_key'), { RaiseError => 1 });
  my $bucket = $s3->bucket($config->get('feeds/bucket'));
  my $object = $bucket->putobject('starmap.json', to_json(\%out), { 'Content-Type' => 'application/json' });
  $object->acl('public');
}

# UTILITIES

sub out {
    my $message = shift;
    unless ($quiet) {
        say format_date(DateTime->now), " ", $message;
    }
}


