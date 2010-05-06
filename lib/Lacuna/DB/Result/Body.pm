package Lacuna::DB::Result::Body;

use Moose;
extends 'Lacuna::DB::Result';
use Lacuna::Util;

__PACKAGE__->load_components('DynamicSubclass');
__PACKAGE__->table('body');
__PACKAGE__->add_columns(
    name                            => { data_type => 'char', size => 30, is_nullable => 0 },
    star_id                         => { data_type => 'int', size => 11, is_nullable => 0 },
    orbit                           => { data_type => 'int', size => 11, default_value => 0 },
    x                               => { data_type => 'int', size => 11, default_value => 0 }, # indexed here to speed up
    y                               => { data_type => 'int', size => 11, default_value => 0 }, # searching of planets based
    z                               => { data_type => 'int', size => 11, default_value => 0 }, # on stor location
    zone                            => { data_type => 'char', size => 16, is_nullable => 0 }, # fast index for where we are
    class                           => { data_type => 'char', size => 255, is_nullable => 0 },
    size                            => { data_type => 'int', size => 11, default_value => 0 },
    usable_as_starter               => { data_type => 'int', size => 11, default_value => 0 },
    size                            => { data_type => 'int', size => 11, default_value => 0 },
    empire_id                       => { data_type => 'int', size => 11, is_nullable => 1 },
    last_tick                       => { data_type => 'datetime', is_nullable => 0 },
    building_count                  => { data_type => 'int', size => 11, default_value => 0 },
    happiness_hour                  => { data_type => 'int', size => 11, default_value => 0 },
    happiness                       => { data_type => 'int', size => 11, default_value => 0 },
    waste_hour                      => { data_type => 'int', size => 11, default_value => 0 },
    waste_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    waste_capacity                  => { data_type => 'int', size => 11, default_value => 0 },
    energy_hour                     => { data_type => 'int', size => 11, default_value => 0 },
    energy_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    energy_capacity                 => { data_type => 'int', size => 11, default_value => 0 },
    water_hour                      => { data_type => 'int', size => 11, default_value => 0 },
    water_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    water_capacity                  => { data_type => 'int', size => 11, default_value => 0 },
    ore_capacity                    => { data_type => 'int', size => 11, default_value => 0 },
    rutile_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    chromite_stored                 => { data_type => 'int', size => 11, default_value => 0 },
    chalcopyrite_stored             => { data_type => 'int', size => 11, default_value => 0 },
    galena_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    gold_stored                     => { data_type => 'int', size => 11, default_value => 0 },
    uraninite_stored                => { data_type => 'int', size => 11, default_value => 0 },
    bauxite_stored                  => { data_type => 'int', size => 11, default_value => 0 },
    goethite_stored                 => { data_type => 'int', size => 11, default_value => 0 },
    halite_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    gypsum_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    trona_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    kerogen_stored                  => { data_type => 'int', size => 11, default_value => 0 },
    methane_stored                  => { data_type => 'int', size => 11, default_value => 0 },
    anthracite_stored               => { data_type => 'int', size => 11, default_value => 0 },
    sulfur_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    zircon_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    monazite_stored                 => { data_type => 'int', size => 11, default_value => 0 },
    fluorite_stored                 => { data_type => 'int', size => 11, default_value => 0 },
    beryl_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    magnetite_stored                => { data_type => 'int', size => 11, default_value => 0 },
    rutile_hour                     => { data_type => 'int', size => 11, default_value => 0 },
    chromite_hour                   => { data_type => 'int', size => 11, default_value => 0 },
    chalcopyrite_hour               => { data_type => 'int', size => 11, default_value => 0 },
    galena_hour                     => { data_type => 'int', size => 11, default_value => 0 },
    gold_hour                       => { data_type => 'int', size => 11, default_value => 0 },
    uraninite_hour                  => { data_type => 'int', size => 11, default_value => 0 },
    bauxite_hour                    => { data_type => 'int', size => 11, default_value => 0 },
    goethite_hour                   => { data_type => 'int', size => 11, default_value => 0 },
    halite_hour                     => { data_type => 'int', size => 11, default_value => 0 },
    gypsum_hour                     => { data_type => 'int', size => 11, default_value => 0 },
    trona_hour                      => { data_type => 'int', size => 11, default_value => 0 },
    kerogen_hour                    => { data_type => 'int', size => 11, default_value => 0 },
    methane_hour                    => { data_type => 'int', size => 11, default_value => 0 },
    anthracite_hour                 => { data_type => 'int', size => 11, default_value => 0 },
    sulfur_hour                     => { data_type => 'int', size => 11, default_value => 0 },
    zircon_hour                     => { data_type => 'int', size => 11, default_value => 0 },
    monazite_hour                   => { data_type => 'int', size => 11, default_value => 0 },
    fluorite_hour                   => { data_type => 'int', size => 11, default_value => 0 },
    beryl_hour                      => { data_type => 'int', size => 11, default_value => 0 },
    magnetite_hour                  => { data_type => 'int', size => 11, default_value => 0 },
    ore_hour                        => { data_type => 'int', size => 11, default_value => 0 },
    food_capacity                   => { data_type => 'int', size => 11, default_value => 0 },
    food_consumption_hour           => { data_type => 'int', size => 11, default_value => 0 },
    lapis_production_hour           => { data_type => 'int', size => 11, default_value => 0 },
    potato_production_hour          => { data_type => 'int', size => 11, default_value => 0 },
    apple_production_hour           => { data_type => 'int', size => 11, default_value => 0 },
    root_production_hour            => { data_type => 'int', size => 11, default_value => 0 },
    corn_production_hour            => { data_type => 'int', size => 11, default_value => 0 },
    cider_production_hour           => { data_type => 'int', size => 11, default_value => 0 },
    wheat_production_hour           => { data_type => 'int', size => 11, default_value => 0 },
    bread_production_hour           => { data_type => 'int', size => 11, default_value => 0 },
    soup_production_hour            => { data_type => 'int', size => 11, default_value => 0 },
    chip_production_hour            => { data_type => 'int', size => 11, default_value => 0 },
    pie_production_hour             => { data_type => 'int', size => 11, default_value => 0 },
    pancake_production_hour         => { data_type => 'int', size => 11, default_value => 0 },
    milk_production_hour            => { data_type => 'int', size => 11, default_value => 0 },
    meal_production_hour            => { data_type => 'int', size => 11, default_value => 0 },
    algae_production_hour           => { data_type => 'int', size => 11, default_value => 0 },
    syrup_production_hour           => { data_type => 'int', size => 11, default_value => 0 },
    fungus_production_hour          => { data_type => 'int', size => 11, default_value => 0 },
    burger_production_hour          => { data_type => 'int', size => 11, default_value => 0 },
    shake_production_hour           => { data_type => 'int', size => 11, default_value => 0 },
    beetle_production_hour          => { data_type => 'int', size => 11, default_value => 0 },
    bean_production_hour            => { data_type => 'int', size => 11, default_value => 0 },
    bean_stored                     => { data_type => 'int', size => 11, default_value => 0 },
    lapis_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    potato_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    apple_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    root_stored                     => { data_type => 'int', size => 11, default_value => 0 },
    corn_stored                     => { data_type => 'int', size => 11, default_value => 0 },
    cider_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    wheat_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    bread_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    soup_stored                     => { data_type => 'int', size => 11, default_value => 0 },
    chip_stored                     => { data_type => 'int', size => 11, default_value => 0 },
    pie_stored                      => { data_type => 'int', size => 11, default_value => 0 },
    pancake_stored                  => { data_type => 'int', size => 11, default_value => 0 },
    milk_stored                     => { data_type => 'int', size => 11, default_value => 0 },
    meal_stored                     => { data_type => 'int', size => 11, default_value => 0 },
    algae_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    syrup_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    fungus_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    burger_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    shake_stored                    => { data_type => 'int', size => 11, default_value => 0 },
    beetle_stored                   => { data_type => 'int', size => 11, default_value => 0 },
    freebies                        => { data_type => 'mediumtext', is_nullable => 1, 'serializer_class' => 'JSON' },
    boost_enabled                   => { data_type => 'int', size => 1, default_value => 0 },
    needs_recalc                    => { data_type => 'int', size => 1, default_value => 0 },
    restrict_coverage               => { data_type => 'int', size => 1, default_value => 1 },  
    restrict_coverage_delta         => { data_type => 'datetime', is_nullable => 0 },
);

__PACKAGE__->typecast_map(class => {
    'Lacuna::DB::Result::Body::Asteroid::A1' => 'Lacuna::DB::Result::Body::Asteroid::A1',
    'Lacuna::DB::Result::Body::Asteroid::A2' => 'Lacuna::DB::Result::Body::Asteroid::A2',
    'Lacuna::DB::Result::Body::Asteroid::A3' => 'Lacuna::DB::Result::Body::Asteroid::A3',
    'Lacuna::DB::Result::Body::Asteroid::A4' => 'Lacuna::DB::Result::Body::Asteroid::A4',
    'Lacuna::DB::Result::Body::Asteroid::A5' => 'Lacuna::DB::Result::Body::Asteroid::A5',
    'Lacuna::DB::Result::Body::Planet::P1' => 'Lacuna::DB::Result::Body::Planet::P1',
    'Lacuna::DB::Result::Body::Planet::P2' => 'Lacuna::DB::Result::Body::Planet::P2',
    'Lacuna::DB::Result::Body::Planet::P3' => 'Lacuna::DB::Result::Body::Planet::P3',
    'Lacuna::DB::Result::Body::Planet::P4' => 'Lacuna::DB::Result::Body::Planet::P4',
    'Lacuna::DB::Result::Body::Planet::P5' => 'Lacuna::DB::Result::Body::Planet::P5',
    'Lacuna::DB::Result::Body::Planet::P6' => 'Lacuna::DB::Result::Body::Planet::P6',
    'Lacuna::DB::Result::Body::Planet::P7' => 'Lacuna::DB::Result::Body::Planet::P7',
    'Lacuna::DB::Result::Body::Planet::P8' => 'Lacuna::DB::Result::Body::Planet::P8',
    'Lacuna::DB::Result::Body::Planet::P9' => 'Lacuna::DB::Result::Body::Planet::P9',
    'Lacuna::DB::Result::Body::Planet::P10' => 'Lacuna::DB::Result::Body::Planet::P10',
    'Lacuna::DB::Result::Body::Planet::P11' => 'Lacuna::DB::Result::Body::Planet::P11',
    'Lacuna::DB::Result::Body::Planet::P12' => 'Lacuna::DB::Result::Body::Planet::P12',
    'Lacuna::DB::Result::Body::Planet::P13' => 'Lacuna::DB::Result::Body::Planet::P13',
    'Lacuna::DB::Result::Body::Planet::P14' => 'Lacuna::DB::Result::Body::Planet::P14',
    'Lacuna::DB::Result::Body::Planet::P15' => 'Lacuna::DB::Result::Body::Planet::P15',
    'Lacuna::DB::Result::Body::Planet::P16' => 'Lacuna::DB::Result::Body::Planet::P17',
    'Lacuna::DB::Result::Body::Planet::P17' => 'Lacuna::DB::Result::Body::Planet::P17',
    'Lacuna::DB::Result::Body::Planet::P18' => 'Lacuna::DB::Result::Body::Planet::P18',
    'Lacuna::DB::Result::Body::Planet::P19' => 'Lacuna::DB::Result::Body::Planet::P19',
    'Lacuna::DB::Result::Body::Planet::P20' => 'Lacuna::DB::Result::Body::Planet::P20',
    'Lacuna::DB::Result::Body::Planet::GasGiant::G1' => 'Lacuna::DB::Result::Body::Planet::GasGiant::G1',
    'Lacuna::DB::Result::Body::Planet::GasGiant::G2' => 'Lacuna::DB::Result::Body::Planet::GasGiant::G2',
    'Lacuna::DB::Result::Body::Planet::GasGiant::G3' => 'Lacuna::DB::Result::Body::Planet::GasGiant::G3',
    'Lacuna::DB::Result::Body::Planet::GasGiant::G4' => 'Lacuna::DB::Result::Body::Planet::GasGiant::G4',
    'Lacuna::DB::Result::Body::Planet::GasGiant::G5' => 'Lacuna::DB::Result::Body::Planet::GasGiant::G5',
});

# RELATIONSHIPS

__PACKAGE__->belongs_to('star', 'Lacuna::DB::Result::Star', 'star_id');
__PACKAGE__->belongs_to('empire', 'Lacuna::DB::Result::Empire', 'empire_id', {join_type => 'left', cascade_delete => 0});
__PACKAGE__->has_many('regular_buildings','Lacuna::DB::Result::Building','body_id');
__PACKAGE__->has_many('food_buildings','Lacuna::DB::Result::Building::Food','body_id');
__PACKAGE__->has_many('water_buildings','Lacuna::DB::Result::Building::Water','body_id');
__PACKAGE__->has_many('waste_buildings','Lacuna::DB::Result::Building::Waste','body_id');
__PACKAGE__->has_many('ore_buildings','Lacuna::DB::Result::Building::Ore', 'body_id');
__PACKAGE__->has_many('energy_buildings','Lacuna::DB::Result::Building::Energy','body_id');
__PACKAGE__->has_many('permanent_buildings','Lacuna::DB::Result::Building::Permanent','body_id');


with 'Lacuna::Role::Zoned';



sub lock {
    my $self = shift;
    return Lacuna->cache->set('planet_contention_lock',$self->id,{locked=>1},60); # lock it
}

sub is_locked {
    my $self = shift;
    return eval{Lacuna->cache->get('planet_contention_lock',$self->id)->{locked}};
}

sub image {
    confess "override me";
}

sub get_type {
    my ($self) = @_;
    my $type = 'habitable planet';
    if ($self->isa('Lacuna::DB::Result::Body::Planet::GasGiant')) {
        $type = 'gas giant';
    }
    elsif ($self->isa('Lacuna::DB::Result::Body::Asteroid')) {
        $type = 'asteroid';
    }
    elsif ($self->isa('Lacuna::DB::Result::Body::Station')) {
        $type = 'space station';
    }
    return $type;
}

sub get_status {
    my ($self) = @_;
    my %out = (
        name            => $self->name,
        image           => $self->image,
        x               => $self->x,
        y               => $self->y,
        z               => $self->z,
        orbit           => $self->orbit,
        type            => $self->get_type,
        star_id         => $self->star_id,
        star_name       => $self->star->name,
        id              => $self->id,
        alignment       => 'none',
    );
    return \%out;
}


no Moose;
__PACKAGE__->meta->make_immutable(inline_constructor => 0);
