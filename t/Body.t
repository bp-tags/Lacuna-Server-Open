use lib '../lib';
use Test::More tests => 8;
use Test::Deep;
use LWP::UserAgent;
use JSON qw(to_json from_json);
use Lacuna::DB;
use Data::Dumper;
use 5.010;

my $result;

my $fed = {
    name        => 'some rand'.rand(9999999),
    species_id  => 'human_species',
    password    => '123qwe',
    password1   => '123qwe',
};
$result = post('empire', 'create', $fed);
my $fed_id = $result->{result}{empire_id};
my $session_id = $result->{result}{session_id};
my $home_planet = $result->{result}{status}{empire}{home_planet_id};

$result = post('body','rename', [$session_id, $home_planet, 'some rand '.rand(9999999)]);
is($result->{result}, 1, 'rename');

$result = post('body','rename', [$session_id, $home_planet, 'way too fricken long to be a valid name']);
is($result->{error}{code}, 1000, 'bad name');

$result = post('body','rename', [$session_id, 'aaa', 'new name']);
is($result->{error}{code}, 1002, 'cannot rename non-existant planet');

$result = post('body','get_buildings', [$session_id, 'aaa']);
is($result->{error}{code}, 1002, 'cannot fetch buildings on non-existant planet');

$result = post('body','get_buildings', [$session_id, $home_planet]);
is(ref $result->{result}{buildings}, 'HASH', 'fetch building list');
my $id;
foreach my $key (keys %{$result->{result}{buildings}}) {
    if ($result->{result}{buildings}{$key}{name} eq 'Planetary Command') {
        $id = $key;
        last;
    }
}
ok($result->{result}{buildings}{$id}{name} ne '', 'building has a name');

my $url = $result->{result}{buildings}{$id}{url};
$url =~ s/\///;
$result = post($url, 'view', [$session_id, $id]);
ok($result->{result}{building}{energy_hour} > 0, 'command center is functional');

$result = post('body', 'get_buildable', [$session_id, $home_planet, 3, 3]);
is($result->{result}{buildable}{'Wheat Farm'}, '/wheat', 'Can build buildings');

my $config = Config::JSON->new("/data/Lacuna-Server/etc/lacuna.conf");
sub post {
    my ($url, $method, $params) = @_;
    my $content = {
        jsonrpc     => '2.0',
        id          => 1,
        method      => $method,
        params      => $params,
    };
    my $ua = LWP::UserAgent->new;
    $ua->timeout(30);
    say "REQUEST: ".to_json($content);
    my $response = $ua->post($config->get('server_url').$url,
        Content_Type    => 'application/json',
        Content         => to_json($content),
        Accept          => 'application/json',
        );
    say "RESPONSE: ".$response->content;
    return from_json($response->content);
}

END {

    my $db = Lacuna::DB->new( access_key => $config->get('access_key'), secret_key => $config->get('secret_key'), cache_servers => $config->get('memcached'));
    $db->domain('empire')->find($fed_id)->delete;
}
