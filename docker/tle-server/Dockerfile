FROM centos:7

RUN yum -y upgrade

RUN yum install -y make cpan wget tar gcc gcc-c++ zlib-devel openssl openssl-devel expat expat-devel ncurses-devel
RUN yum install -y glibc-devel git mysql mysql-devel libxml2 libxml2-devel mysql-server gd gd-devel cronie bzip2

RUN mkdir /downloads
RUN mkdir /usr/src/perl
WORKDIR   /usr/src/perl

RUN curl -SL https://cpan.metacpan.org/authors/id/R/RJ/RJBS/perl-5.20.0.tar.bz2 -o perl-5.20.0.tar.bz2 \
    && echo 'e925e4fc36e90eace19a1ca850f912618ba6788f *perl-5.20.0.tar.bz2' | sha1sum -c - \
    && tar --strip-components=1 -xjf perl-5.20.0.tar.bz2 -C /usr/src/perl \
    && rm perl-5.20.0.tar.bz2 \
    && ./Configure -Duse64bitall -Duseshrplib  -des \
    && make -j$(nproc) \
    && make install \
    && cd /usr/src \
    && curl -LO https://raw.githubusercontent.com/miyagawa/cpanminus/master/cpanm \
    && chmod +x cpanm \
    && ./cpanm App::cpanminus \
    && rm -fr ./cpanm /usr/src/perl /tmp/*


# Term::ReadKey does not test (seemingly because in docker build there is no terminal)
RUN cpanm --notest Term::ReadKey

RUN cpanm Module::Build
RUN cpanm --verbose --notest GD
RUN cpanm GD::SecurityImage

# Install App::Daemon dependencies (with tests)
RUN cpanm Sysadm::Install File::Pid Log::Log4perl
# App::Daemon does not test (TODO look into this)
RUN cpanm --notest App::Daemon

RUN cpanm Exception::Class Test::Harness Test::Differences Test::Exception Test::Warn Test::Deep
RUN cpanm Time::HiRes
RUN cpanm --verbose Test::Most

# ENV ANYEVENT_WEBSOCKET_TEST_SKIP_SSL=1
RUN cpan MLEHMANN/AnyEvent-7.17.tar.gz
RUN cpanm Test::Most Test::Trap Beanstalk::Client Chat::Envolve Clone Config::JSON Config::YAML
RUN cpanm DateTime DateTime::Format::Duration DateTime::Format::MySQL DateTime::Format::Strptime DBD::mysql DBIx::Class
RUN cpanm DBIx::Class::DynamicSubclass DBIx::Class::InflateColumn::Serializer DBIx::Class::Schema DBIx::Class::TimeStamp
RUN cpanm Digest::HMAC_SHA1 Digest::MD5
RUN cpan ADAMK/Email-Stuff-2.06.tar.gz
RUN cpanm Email::Valid File::Copy File::Path Guard IO::Socket::SSL
RUN cpanm JSON JSON::WebToken JSON::XS List::MoreUtils List::Util
RUN cpanm List::Util::WeightedChoice Log::Any::Adapter Log::Any::Adapter::Log4perl Log::Log4perl LWP::Protocol::https LWP::UserAgent

# Fails when it cannot make a network connection
RUN cpanm --notest IO::Socket::IP

# Move these so deps. come first / and reduce duplicates also ver.
RUN cpan GARU/Data-Printer-0.99_022.tar.gz
RUN cpanm Business::PayPal::API
RUN cpan RIZEN/Facebook-Graph-1.1204.tar.gz

RUN cpanm JSON::RPC::Dispatcher JSON::RPC::Dispatcher::App

# without verbose it times out and aborts due to long compilation
RUN cpanm --verbose Memcached::libmemcached Net::Server::SS::PreFork

RUN cpanm Module::Find Moose namespace::autoclean Term::ProgressBar::Simple Net::Amazon::S3 Net::Server::SS::PreFork Path::Class
RUN cpanm Plack::Middleware::CrossOrigin Pod::Simple::HTML Regexp::Common Server::Starter SOAP::Lite String::Random
RUN cpanm Text::CSV_XS Tie::IxHash URI::Encode UUID::Tiny XML::FeedPP XML::Parser
RUN cpanm lib::abs
RUN cpanm XML::Hash::LX
RUN cpanm Term::ProgressBar Term::ProgressBar::Quiet PerlX::Maybe Firebase::Auth Gravatar::URL
RUN cpanm Digest::MD4 Bad::Words

# RUN cpan PERIGRIN/JSON-Any-1.32.tar.gz

RUN groupadd nogroup
WORKDIR /data/Lacuna-Server/bin

# RUN yum -y install vixie-cron
RUN chkconfig crond on
