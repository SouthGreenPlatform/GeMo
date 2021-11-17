#!/usr/local/bin/perl
use strict;
use Data::Dumper;
$Data::Dumper::Indent = 0;
##############################################################
# convert gemo block file to gff3 to send to genome browser  #
##############################################################

#perl gemo2gff.pl path/to/annot.txt path/to/color.txt path/to/write/gemo.gff

my $inFile = shift;
my $color = shift;
my $gff = shift;
my $line;
my %color;

#parse color file
open COLOR, "$color" or die "cannot open $color !\n";
while (<COLOR>) {
    #skip if header
    $line = $_;
    if ($line=~/group\tname\thex\n/) {
        print "next";
        next;
    }
    
    #regexp g6	zeb	#e10b53
	#       group	name	hex
    if ($line=~/(.*)\t(.*)\t(.*)\n/) {
        #rentre les données par group
        $color{$1}{'color'}=$3;
        $color{$1}{'name'}=$2;
        $color{$1}{'group'}=$1;
        #mais aussi par couleur
        $color{$3}{'color'}=$3;
        $color{$3}{'group'}=$1;
        $color{$3}{'name'}=$2;
    }
    my $str = Dumper(%color);
}
close COLOR;

#create gff output file
open GFF, ">$gff" or die "cannot create $gff !\n";

#parse infile
open INFILE, "$inFile" or die "cannot open $inFile !\n";
while (<INFILE>) {
	$line =$_;

    #skip if header
    if ($line=~/chr.*\n/) {
        next;
    }

    #regexp 01 0 3976820 3976820 g7
	#       chr hap start stop group
    if ($line=~/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.*)\n/) {
        #print("$1 $2 $3 $4 $5");
        my $chr = $1;
        my $hap=$2;
        my $start = $3;
        my $stop = $4;
        my $val = $5;
        $val =~ s/\s+$//; #enleve les espace en fin de chaine

        print GFF "Chr$chr\tGeMo\tmatch\t$start\t$stop\t.\t.\t.\tID=$color{$val}{'name'};Name=$color{$val}{'name'};Hap=$hap;Color=$color{$val}{'color'}\n";        
    }
}
close INFILE;
close GFF;
