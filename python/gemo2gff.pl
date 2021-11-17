#!/usr/local/bin/perl
use strict;

##############################################################
# convert gemo block file to gff3 to send to genome browser  #
##############################################################

#perl gemo2gff.pl path/to/annot.txt path/to/color.txt path/to/write/gemo.gff

my $inFile = shift;
my $color = shift;
my $gff = shift;

#my $currentChr = "0";
#my $first = 1;
my $line;
#my $length;

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
    if ($line=~/(.*)\t(.*)\t(.*)/) {
        $color{$1}{'color'}=$3;
        $color{$1}{'name'}=$2;
    }
}
close COLOR;

#create gff output file
open GFF, ">$gff" or die "cannot create $gff !\n";

#initialise le json
#print JSON "{\"keys\": [\"name\", \"start\", \"length\", \"trackIndex\"],\n\t\"annots\": [\n";

#initialise chr1:
#print JSON "\t\t{\"chr\": \"1\", \"annots\": [";

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
        
        print GFF "Chr$1\tGeMo\tmatch\t$3\t$4\t.\t.\t.\tID=$5;Name=$color{$5}{'name'};Hap=$2;Color=$color{$5}{'color'}\n";

    }
}

close INFILE;
close GFF;
