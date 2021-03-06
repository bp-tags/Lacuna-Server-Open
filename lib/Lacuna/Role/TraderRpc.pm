package Lacuna::Role::TraderRpc;

use Moose::Role;
use feature "switch";
use Lacuna::Constants qw(ORE_TYPES FOOD_TYPES);
use Lacuna::Util qw(randint);

sub view_my_market {
    my ($self, $session_id, $building_id, $page_number) = @_;
    my $empire = $self->get_empire_by_session($session_id);
    my $building = $self->get_building($empire, $building_id);
    $page_number ||=1;
    my $my_trades = $building->my_market->search(undef, { rows => 25, page => $page_number });
    my @trades;
    while (my $trade = $my_trades->next) {
        push @trades, {
            id                      => $trade->id,
            date_offered            => $trade->date_offered_formatted,
            ask                     => $trade->ask,
            offer                   => $trade->format_description_of_payload,
        };
    }
    return {
        trades      => \@trades,
        trade_count => $my_trades->pager->total_entries,
        page_number => $page_number,
        status      => $self->format_status($empire, $building->body),
    };
}



sub view_market {
    my ($self, $session_id, $building_id, $page_number, $filter) = @_;
    my $empire = $self->get_empire_by_session($session_id);
    my $building = $self->get_building($empire, $building_id);
    $page_number ||=1;
    my $all_trades = $building->available_market->search(
        undef,
        { rows => 25, page => $page_number, join => 'body', order_by => 'ask' }
        );
    if ($filter && $filter ~~ [qw(food ore water waste energy glyph prisoner ship plan)]) {
        $all_trades = $all_trades->search({ 'has_'.$filter => 1 });
    }
    my @trades;
    while (my $trade = $all_trades->next) {
        if ($trade->body->empire_id eq '') {
            $trade->delete;
            next;
        }
        push @trades, {
            id                      => $trade->id,
            date_offered            => $trade->date_offered_formatted,
            ask                     => $trade->ask,
            offer                   => $trade->format_description_of_payload,
            body                    => {
                id      => $trade->body_id,
            },
            empire                  => {
                id      => $trade->body->empire->id,
                name    => $trade->body->empire->name,
            },
        };
    }
    return {
        trades      => \@trades,
        trade_count => $all_trades->pager->total_entries,
        page_number => $page_number,
        status      => $self->format_status($empire, $building->body),
    };
}

sub get_ships {
    my ($self, $session_id, $building_id) = @_;
    my $empire = $self->get_empire_by_session($session_id);
    my $building = $self->get_building($empire, $building_id);
    my $ships = Lacuna->db->resultset('Lacuna::DB::Result::Ships')->search(
        {body_id => $building->body_id, task => 'docked'},
        {order_by => [ 'type', 'hold_size', 'speed']}
        );
    my @out;
    while (my $ship = $ships->next) {
        push @out, {
            id          => $ship->id,
            name        => $ship->name,
            type        => $ship->type,
            hold_size   => $ship->hold_size,
            speed       => $ship->speed,
        };
    }
    return {
        ships                   => \@out,
        cargo_space_used_each   => 50_000,
        status                  => $self->format_status($empire, $building->body),
    };
}

sub get_ship_summary {
    my ($self, $session_id, $building_id) = @_;

    my $empire      = $self->get_empire_by_session($session_id);
    my $building    = $self->get_building($empire, $building_id);
    my $ships = Lacuna->db->resultset('Lacuna::DB::Result::Ships')->search(
        {body_id => $building->body_id, task => 'docked'},
        {order_by => [ 'type', 'hold_size', 'speed']}
        );

    my $ship_summary = {};
    while (my $ship = $ships->next) {
        my $key = sprintf("%s~%s~%02u~%02u", $ship->name, $ship->type, $ship->hold_size, $ship->speed);
        $ship_summary->{$key}++;
    }

    # Sort
    my @ships = map { {$_ => $ship_summary->{$_}} } sort {$a cmp $b} keys %$ship_summary;

    my @out;
    for my $ship (@ships) {
        my ($key,$quantity) = %$ship;
        my ($name,$type,$hold_size,$speed) = split /~/, $key;

        push @out, {
            name        => $name,
            type        => $type,
            hold_size   => int($hold_size),
            speed       => int($speed),
            quantity    => $quantity,
        };
    }
    return {
        ships                   => \@out,
        cargo_space_used_each   => 50_000,
        status                  => $self->format_status($empire, $building->body),
    };
}


sub get_prisoners {
    my ($self, $session_id, $building_id) = @_;
    my $empire = $self->get_empire_by_session($session_id);
    my $building = $self->get_building($empire, $building_id);
    my $prisoners = Lacuna->db->resultset('Lacuna::DB::Result::Spies')->search(
        { on_body_id => $building->body_id, task => 'Captured', available_on => { '>' => DateTime->now } },
        {order_by => [ 'name' ]}
        );
    my @out;
    while (my $prisoner = $prisoners->next) {
        push @out, {
            id          => $prisoner->id,
            name        => $prisoner->name,
            level       => $prisoner->level,
            sentence_expires => $prisoner->format_available_on,
        };
    }
    return {
        prisoners               => \@out,
        cargo_space_used_each   => 350,
        status                  => $self->format_status($empire, $building->body),
    };
}

sub get_plan_summary {
    my ($self, $session_id, $building_id) = @_;

    my $empire      = $self->get_empire_by_session($session_id);
    my $building    = $self->get_building($empire, $building_id);
    my $plans = Lacuna->db->resultset('Lacuna::DB::Result::Plans')->search(
        {body_id => $building->body_id}
    );

    my $plan_summary = {};
    while (my $plan = $plans->next) {
        my $key = sprintf("%s~%s~%02u~%02u", $plan->class->name, $plan->class, $plan->level, $plan->extra_build_level);
        $plan_summary->{$key}++;
    }

    # Sort
    my @plans = map { {$_ => $plan_summary->{$_}} } sort {$a cmp $b} keys %$plan_summary;

    my @out;
    for my $plan (@plans) {
        my ($key,$quantity) = %$plan;
        my ($name,$class,$level,$extra) = split /~/, $key;
        my $plan_type = $class;
        $plan_type =~ s/Lacuna::DB::Result::Building:://;
        $plan_type =~ s/::/_/g;

        push @out, {
            name                => $name,
            plan_type           => $plan_type,
            level               => int($level),
            extra_build_level   => int($extra),
            quantity            => $quantity,
        };
    }
    return {
        plans                   => \@out,
        cargo_space_used_each   => 10_000,
        status                  => $self->format_status($empire, $building->body),
    };
}


sub get_plans {
    my ($self, $session_id, $building_id) = @_;
    my $empire = $self->get_empire_by_session($session_id);
    my $building = $self->get_building($empire, $building_id);
    my $plans = Lacuna->db->resultset('Lacuna::DB::Result::Plans')->search(
        {body_id => $building->body_id},
        {order_by => [ 'class', 'level']}
        );
    my @out;
    while (my $plan = $plans->next) {
        push @out, {
            id                      => $plan->id,
            name                    => $plan->class->name,
            level                   => $plan->level,
            extra_build_level       => $plan->extra_build_level,
        };
    }
    # Put plans in a sensible order
    @out = sort {$a->{name} cmp $b->{name} || $a->{level} <=> $b->{level} || $b->{extra_build_level} <=> $a->{extra_build_level} } @out;
    return {
        plans                   => \@out,
        cargo_space_used_each   => 10_000,
        status                  => $self->format_status($empire, $building->body),
    };
}

sub get_glyphs {
    my ($self, $session_id, $building_id) = @_;
    my $empire = $self->get_empire_by_session($session_id);
    my $building = $self->get_building($empire, $building_id);
    my $glyphs = $building->body->glyphs;
    my @out;
    while (my $glyph = $glyphs->next) {
        push @out, {
            id                      => $glyph->id,
            type                    => $glyph->type,
        };
    }
    return {
        glyphs                  => \@out,
        cargo_space_used_each   => 100,
        status                  => $self->format_status($empire, $building->body),
    };
}

sub get_glyph_summary {
    my ($self, $session_id, $building_id) = @_;

    my $empire      = $self->get_empire_by_session($session_id);
    my $building    = $self->get_building($empire, $building_id);
    my $glyphs      = $building->body->glyphs;

    my $glyph_summary = {};
    while (my $glyph = $glyphs->next) {
        $glyph_summary->{$glyph->type}++;
    }
    # sort
    my @out = map { {name => $_, quantity => $glyph_summary->{$_}}} sort {$a cmp $b} keys %$glyph_summary;

    return {
        glyphs                  => \@out,
        cargo_space_used_each   => 100,
        status                  => $self->format_status($empire, $building->body),
    };
}


sub get_stored_resources {
    my ($self, $session_id, $building_id) = @_;
    my $empire = $self->get_empire_by_session($session_id);
    my $building = $self->get_building($empire, $building_id);
    my @types = (FOOD_TYPES, ORE_TYPES, qw(water waste energy));
    my %out;
    my $body = $building->body;
    foreach my $type (@types) {
        my $stored = $body->type_stored($type);
        next if $stored < 1;
        $out{$type} = $stored;
    }
    return {
        resources               => \%out,
        cargo_space_used_each   => 1,
        status                  => $self->format_status($empire, $body),
    };
}


sub report_abuse {
    my ($self, $session_id, $building_id, $trade_id) = @_;
    unless ($trade_id) {
        confess [1002, 'You have not specified a trade to withdraw.'];
    }
    my $empire = $self->get_empire_by_session($session_id);
    my $building = $self->get_building($empire, $building_id);
    my $cache = Lacuna->cache;
    if ($cache->get('trade_lock', $trade_id)) {
        confess [1013, 'A buyer has placed an offer on this trade. Please wait a few moments and try again.'];
    }
    my $times_reporting = $cache->increment('empire_reporting_trade_abuse'.DateTime->now->day, $empire->id, 1, 60 * 60 * 24);
    if ($times_reporting > 10) {
        confess [1010, 'You have reported enough abuse for one day.'];
    }
    my $reports = $cache->increment('trade_abuse',$trade_id,1, 60 * 60 * 24 * 3);
    if ($reports >= 5) {
        my $trade = $building->market->find($trade_id);
        if (defined $trade) {
            $trade->body->empire->send_predefined_message(
                filename    => 'trade_abuse.txt',
                params      => [join("\n",@{$trade->format_description_of_payload}), $trade->ask.' essentia'],
                tags        => ['Trade','Alert'],
            );
            $trade->withdraw($trade->body);
        }
        return {
            status      => $self->format_status($empire, $building->body),
        };
    }
}


1;


