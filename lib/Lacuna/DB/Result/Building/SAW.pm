package Lacuna::DB::Result::Building::SAW;

use Moose;
use utf8;
no warnings qw(uninitialized);
extends 'Lacuna::DB::Result::Building';

around 'build_tags' => sub {
    my ($orig, $class) = @_;
    return ($orig->($class), qw(Infrastructure Ships));
};

before has_special_resources => sub {
    my $self = shift;
    my $planet = $self->body;
    my $amount_needed = sprintf('%.0f', $self->ore_to_build * $self->upgrade_cost * 0.20);
    if ($planet->chalcopyrite_stored + $planet->gold_stored + $planet->bauxite_stored < $amount_needed) {
        confess [1012,"You do not have a sufficient supply (".$amount_needed.") of conductive metals such as Chalcopyrite, Gold, and Bauxite to build magnetic pulse cannons."];
    }
    if ($planet->rutile_stored + $planet->chromite_stored + $planet->bauxite_stored + $planet->magnetite_stored + $planet->monazite_stored < $amount_needed) {
        confess [1012,"You do not have a sufficient supply (".$amount_needed.") of magnetic and paramagnetic minerals such as Magnetite, Monazite, Rutile, Bauxite, and Chromite needed to build high-impact shells."];
    }
};

around spend_efficiency => sub {
    my ($orig, $self, $amount) = @_;
    if ($amount * 100 < $self->body->water_stored) {
        $self->body->spend_water($amount * 100);
    }
    else {
        $orig->($self, $amount);
    }
    return $self;
};

use constant max_instances_per_planet => 10;

use constant controller_class => 'Lacuna::RPC::Building::SAW';

use constant university_prereq => 8;

use constant image => 'saw';

use constant name => 'Shield Against Weapons';

use constant food_to_build => 180;

use constant energy_to_build => 250;

use constant ore_to_build => 250;

use constant water_to_build => 200;

use constant waste_to_build => 100;

use constant time_to_build => 60 * 2;

use constant food_consumption => 2;

use constant energy_consumption => 50;

use constant ore_consumption => 5;

use constant water_consumption => 6;

use constant waste_production => 20;


no Moose;
__PACKAGE__->meta->make_immutable(inline_constructor => 0);
