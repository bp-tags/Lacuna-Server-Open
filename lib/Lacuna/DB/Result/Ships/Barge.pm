package Lacuna::DB::Result::Ships::Barge;

use Moose;
use utf8;
no warnings qw(uninitialized);
extends 'Lacuna::DB::Result::Ships';

use constant prereq                 => { class=> 'Lacuna::DB::Result::Building::Trade',  level => 5 };
use constant base_food_cost         => 650;
use constant base_water_cost        => 1900;
use constant base_energy_cost       => 6100;
use constant base_ore_cost          => 10300;
use constant base_time_cost         => 5000;
use constant base_waste_cost        => 900;
use constant base_speed             => 1050;
use constant base_stealth           => 2450;
use constant base_hold_size         => 790;
use constant pilotable              => 1;
use constant build_tags             => [qw(Trade Mining Intelligence)];

with "Lacuna::Role::Ship::Send::UsePush";
with "Lacuna::Role::Ship::Arrive::CaptureWithSpies";
with "Lacuna::Role::Ship::Arrive::CargoExchange";
with "Lacuna::Role::Ship::Arrive::PickUpSpies";

no Moose;
__PACKAGE__->meta->make_immutable(inline_constructor => 0);
