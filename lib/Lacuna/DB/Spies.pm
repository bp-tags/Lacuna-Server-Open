package Lacuna::DB::Spies;

use Moose;
extends 'SimpleDB::Class::Item';
use Lacuna::Util qw(format_date);
use DateTime;

__PACKAGE__->set_domain_name('spies');
__PACKAGE__->add_attributes(
    empire_id               => { isa => 'Str' },
    name                    => { isa => 'Str', default => 'Agent Null' },
    from_body_id            => { isa => 'Str' },
    on_body_id              => { isa => 'Str' },
    task                    => { isa => 'Str' },
    available_on            => { isa => 'DateTime' },
    offense                 => { isa => 'Int', default => 1 },
    defense                 => { isa => 'Int', default => 1 },
);

__PACKAGE__->belongs_to('empire', 'Lacuna::DB::Empire', 'empire_id');
__PACKAGE__->belongs_to('from_body', 'Lacuna::DB::Body::Planet', 'from_body_id');
__PACKAGE__->belongs_to('on_body', 'Lacuna::DB::Body::Planet', 'on_body_id');

sub format_available_on {
    my ($self) = @_;
    return format_date($self->available_on);
}

sub is_available {
    my ($self) = @_;
    if (DateTime->now > $self->available_on) {
        if ($self->task eq 'Travelling' || $self->task eq 'Training' || $self->task eq 'Captured') {
            $self->task('Idle');
            $self->put;
        }
        return 1;
    }
    return 0;
}

use constant assignments => (
    'Idle',
    'Gather Intelligence',
    'Capture Spies',
    'Sabotage Infrastructure',
    'Appropriate Technology',
    'Incite Rebellion',
    'Hack Networks'
);

sub assign {
    my ($self, $assignment) = @_;
    my @assignments = $self->assignments;
    unless ($assignment ~~ @assignments) {
        confess [1009, "You can't assign a spy a task that he's not trained for."];
    }
    unless ($self->is_available) {
        confess [1013, "This spy is unavailable for reassignment."];
    }
    $self->task($assignment);
    return $self;
}

sub steal_a_building {
    my ($self, $building) = @_;
    my $body = $building->body;
    if ($building->level == 0) {
        $self->from_body->add_free_build($building->class, 1);
    }
    else {
        $self->from_body->add_free_upgrade($building->class, $building->level + 1);
    }
    $self->empire->send_predefined_message(
        tags        => ['Alert'],
        filename    => 'building_theft_report.txt',
        params      => [$building->level + 1, $building->name, $self->name],
    );
    $body->interception_score ( $body->interception_score + 5);
}

sub steal_a_ship {
    my ($self, $body, $type, $payload) = @_;
    my $home = $self->from_body;
    my $duration = $self->calculate_seconds_from_body_to_body('spy_pod', $body, $home);
    my $date = DateTime->now->add(seconds=>$duration);
    $payload->{spies} = [ $self->id ];
    $self->available_on($date->clone);
    $self->on_body_id($home->id);
    $self->task('Travelling');
    $self->put;
    return Lacuna::DB::TravelQueue->send(
        simpledb        => $self->simpledb,
        body            => $home,
        foreign_body    => $body,
        payload         => $payload,
        ship_type       => $type,
        direction       => 'incoming',
        date_arrives    => $date,
    );
    $type =~ s/_/ /g;
    $self->empire->send_predefined_message(
        tags        => ['Alert'],
        filename    => 'ship_theft_report.txt',
        params      => [$type, $self->name],
    );
    $self->empire->send_predefined_message(
        tags        => ['Alert'],
        filename    => 'ship_stolen.txt',
        params      => [$type, $body->name],
    );
    $body->add_news(60,'In a daring escape a thief absconded with a %s from %s today.', $type, $body->name);
    $body->theft_score( $body->theft_score - $self->offense);
    $body->interception_score ( $body->interception_score + 10);
}

sub sabotage_a_building {
    my ($self, $building) = @_;
    my $body = $building->body;
    $self->empire->send_predefined_message(
        tags        => ['Alert'],
        filename    => 'sabotage_report.txt',
        params      => [$building->name, $body->name, $self->name],
    );
    $body->interception_score( $body->interception_score + 20);
}

sub sabotage_a_ship {
    my ($self, $building, $type) = @_;
    my $body = $building->body;
    $type =~ s/_/ /g;
    $self->empire->send_predefined_message(
        tags        => ['Alert'],
        filename    => 'sabotage_report.txt',
        params      => [$type, $body->name, $self->name],
    );
    $body->interception_score( $body->interception_score + 10);
}





no Moose;
__PACKAGE__->meta->make_immutable;
