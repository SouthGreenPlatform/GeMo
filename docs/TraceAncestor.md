Tutorial for TraceAncestor chromosome painting and data visualization with GEMO
===========================================================================

This tutorial aimed at showing how data should be processed to be then 
visualized with the [GEMO tool](https://github.com/SouthGreenPlatform/GeMo) GEMO tool.


TraceAncestor2.pl is a script that permits to estimate the allelic dosage of ancestral alleles in hybrid individuals and then to perform chromosom painting.
The v2 of TranceAncestor is a modification of the v1 (https://github.com/SouthGreenPlatform/galaxy-wrappers/tree/master/Galaxy_SouthGreen/traceancestor) in order to match the input of the GeMo vizualisation tool.


# TUTORIAL

##1. TAvcf2gst.pl

### Usage

This script is used to define GST values from individuals that are identified as pure breed for an ancestor.

Must be used on pure breed. If there is introgressed part on the genome of the individual, the part must be removed before analysis. 
	
	perl TAvcf2gst.pl [-v vcf file] [-a ancestor file] [-d depth]

### Inputs
	-d | --depth : minimal depth for a snp to be used in the analysis (default = 5)

	-v | --vcf: vcf containing the pure breed individuals. 

	-a | --ancestor :  ancestor file.


*example of an ancestor file:*

A1, A2, A3 are the ancestors and Ind1, Ind2 ... are the names of pure breed individuals in the Vcf files.

| A1 | Ind1 | Ind2 | Ind3 | Ind4 | Ind5 | Ind6 |
|----|------|------|------|------|------|------|
| A2 | Ind7 | Ind8 | Ind9 | Ind10 |
| A3 | Ind11 | Ind12 | Ind13 | Ind14 | Ind15 |


### Ouputs

*The output is a CSV file containing GST (inter-population differentiation parameter) information:*

| #CHROM | POS | REF | ALT | %Nref | GST1 | GST2 | GST3 | F1 | F2 | F3 |
|--------|-----|-----|-----|-------|------|------|------|----|----|----|
| 1 | 85524 | A | G | 0.3103448276 | 0.2 | 0.2 | 1 | 0 | 0 | 1 |

*with :* 

- \#CHROM = chromosome name
- POS = position of DSNP
- REF = Base of the reference allele of this DSNP
- ALT = Base of the alternative allele of this DSNP
- %Nref = Percentage of maximal missing data for this DSNP
- GST = value of GST (inter-population differentiation parameter) (With 1,2,3 the ancestors names)
- F = Alternative allele frequency for each ancestor (With 1,2,3 the ancestors names)

##2. TAprefilter.pl

### Usage

This script is used to define a matrix of ancestry informative markers from the matrix gotten at the step 1.

	perl TAprefilter.pl [-t matrix file] [-g threshold for gst] [-m threshold for missing data]

### Inputs

	-g | --gst : maximum value of the GST of a DSNP to be a marker (default = 0.9).
	-m | --missing : maximum value of missing data frequence for a DSNP to be a marker (default = 0.3) 
	-t | --input : reference matrice with GST and alternative allele frequence (F) informations (output of TAvcf2gst.pl).


### Ouputs

A matrix containing all the ancestry informative markers for every ancestors.

*example:*

| ancestor | chromosome | position | allele |
|----------|------------|----------|--------|
| A1 | 1 | 150528 | T |

*with:*

- ancestor = Ancestor names
- chromosome = Chromosome numbers
- position = Position of the DSNP marker
- allele = Base of the ancestral allele

## TraceAncestor2.pl

### Usage

	perl TraceAncestor.pl [-t matrix file] [-v vcf file] [-m merge] [-c color file] [-p ploidy] [-w number of markers by window] [-l LOD value] [-s threshold for LOD] [-k window size in K-bases] [-i particular hybrid to focus on] [-f focus file with several hybrids to focus on] 

### Inputs

	-t | --input : reference matrice (output of TAprefilter.pl)

	-v | --vcf : vcf of the hybrid population
	
	-m | --merge : If this option is activated, the windows will be made only with common SNP between vcf and ancestor matrix (do not activate this option if the snp list in ancestor matrix is not exhaustive. For instance in the case of wgs analysis.)

	-p | --ploidy : ploidy of the hybrid population (2, 3 or 4).

	-w | --window : number of markers by window (default = 10)

	-l | --lod : lod value to conclude for one hypothesis or an other (default = 3)

	-s | --threshold : threshold for the calcul of LOD score (default = 0.99 (For an acceptable sequencage error rate of 0.01))

	-k | --cut : number of K bases for one window (default = 100)

	-i | --ind : particular hybrid you want to focus on.

    -c | --curve : calculate curves for gemo vizualisation tools (needs a lot of memory. Activate it only on a cluster)

	-h | --help : display an help

### Ouputs
	
	1- *ideogram_hybridname* : the painting data. An Ideogram output compatible with GeMo

	2- *len_ideogram_hybridname* : the chromosomes data. An Ideogram output compatible with ideogram.js
	
	3- *ancestorFreq* : frequency of ancestors alleles along chromosome for the particular hybrid focused.

    4- *Gemo_curve* (optionnal if the option -c is activated): frequency of ancestors alleles along chromosome for the GeMo vizualisation tool.