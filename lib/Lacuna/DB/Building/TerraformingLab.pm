package Lacuna::DB::Building::TerraformingLab;

use Moose;
extends 'Lacuna::DB::Building';

around 'build_tags' => sub {
    my ($orig, $class) = @_;
    return ($orig->($class), qw(Infrastructure Colonization Ships));
};

use constant controller_class => 'Lacuna::Building::TerraformingLab';

use constant university_prereq => 9;

use constant image => 'terraforminglab';

use constant name => 'Terraforming Lab';

use constant food_to_build => 250;

use constant energy_to_build => 250;

use constant ore_to_build => 500;

use constant water_to_build => 100;

use constant waste_to_build => 250;

use constant time_to_build => 1200;

use constant food_consumption => 50;

use constant energy_consumption => 50;

use constant ore_consumption => 50;

use constant water_consumption => 50;

use constant waste_production => 100;


no Moose;
__PACKAGE__->meta->make_immutable;
