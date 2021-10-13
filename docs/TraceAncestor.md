Chromosome painting using TraceAncestor
===========================================================================

TraceAncestor2.pl is a script that allows to estimate the allelic dosage of ancestral alleles in hybrid individuals and then to perform chromosome painting.

## Reference
- [Ahmed,D. et al. (2019) Genotyping by sequencing can reveal the complex mosaic genomes in gene pools resulting from reticulate evolution: a case study in diploid and polyploid citrus. Annals of Botany, 123, 1231–1251.](https://doi.org/10.1093/aob/mcz029)


## TAvcf2gst.pl

### Usage

This script is used to define GST values from individuals that are identified as pure breed for an ancestor.

Must be used on pure breed. If there is introgressed part on the genome of the individual, the part must be removed before analysis. 
	
```bash
TAvcf2gst.pl --help

Parameters :
    --vcf       vcf containing the ancestors [Required]
    --ancestor  ancestor file [Required]
    --depth     minimal depth for a snp to be used in the analysis (Default 5)
    --output    output file name (Default GSTmatrice)
    --help
```

*Example of an ancestor file:*

A1, A2, A3 are the ancestors and Ind1, Ind2 ... are the names of pure breed individuals in the Vcf files.

| A1 | Ind1 | Ind2 | Ind3 | Ind4 | Ind5 | Ind6 |
|----|------|------|------|------|------|------|
| M | Chiosf | depressa | Sunki | Cleopatre | Willow_Leaf|Nan_feng_mi_chu|
| P | Chandler | KaoPan | Pink | Timor | PampTahiti |Deep_red|
| C | CedCorse | Digite | Hupang | Mac_Veu_de_montagne | etrog |Poncire_commun|
| Mic | Micrantha_Sflopapeda | Micrantha |  |  |  ||


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

## TAprefilter.pl

### Usage

This script is used to define a matrix of ancestry informative markers from the matrix gotten at the step 1.

```bash 
TAprefilter.pl --help
Parameters :
    --input     reference matrice [Required]
    --gst       threshold for gst (Default : 0.9)
    --missing   threshold for missing data (Default 0.3)
    --output    output file name (Default Diagnosis_matrix)
    --help      display this help
```

### Ouputs

A matrix containing all the ancestry informative markers for every ancestors.

*Example:*

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

```bash
TraceAncestor2.pl --help

usage: TraceAncestor.pl [-t matrix file] [-v vcf file] [-p ploidy] [-w number of markers by window] [-s threshold for LOD] [-k window size in K-bases] [-i hybrid name to focus on]

-t | --input : reference matrice.
-v | --vcf : vcf of the hybrid population
-p | --ploidy : ploidy of the hybrid population
-w | --window : number of markers by window
-l | --lod : LOD value to conclude for one hypothesis
-s | --freq : theoretical frequency used to calcul the LOD
-k | --cut : number of K bases in one window
-i | --ind : particular hybrid you want to focus on.
-c | --curve : calculate curves for gemo vizualisation tools (needs a lot of memory. Activate it only on a cluster)
-h | --help : display this help
```

### Ouputs
	
- *ideogram_hybridname* : the painting data. An Ideogram output compatible with GeMo
- *len_ideogram_hybridname* : the chromosomes data. An Ideogram output compatible with ideogram.js
- *ancestorFreq* : frequency of ancestors alleles along chromosome for the particular hybrid focused.
- *Gemo_curve* (optionnal if the option -c is activated): frequency of ancestors alleles along chromosome for the GeMo vizualisation tool.
