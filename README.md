# GeMo - Genome Mosaics visualization tool

GeMo is a WebApp to respresent **Genome Mosaics** with current focus on plants. However, GeMo is developed in a generic way it can be also applied to other organisms.


## Live demo
Gemo is currently running at the [Banana Genome Hub](https://banana-tools-genome-hub.southgreen.fr/gemo/) where anyone can upload its own data or test with pre-loaded datasets.

## Install

*Coming soon*

## Main features 

### Chromosome painting

Chromosome representation based on [ideogram](https://github.com/eweitz/ideogram).

### Polyploidy 

Karyotype can display to 1x to nX chromosome. Aneuploidy can be represented.

### Refinement of Ancestral/Parental contribution

*Coming soon*

### Plot genes on mosaic karyotypes

*Coming soon*

## Data inputs (*Coming soon*)

It accepts two types of files:

- Genomic blocks: 

- Normalized curves:

See the Wiki for full documentation.


## Generating datasets

In order to generate ready-to-use datasets, analyses can be conducted with the following software:

### VCFHunter

VCFHunter is a suite of [python scripts](https://github.com/SouthGreenPlatform/VcfHunter) enabling chromosome painting of indivisual based on the contribution of ancestral groups using VCF files.

Please look at the [tutorial](https://github.com/SouthGreenPlatform/VcfHunter/blob/master/turorial_painting_GEMO_visualization.md)

### TraceAncestor

TraceAncestor permits to estimate the allelic dosage of ancestral alleles in hybrid individuals and then to perform chromosom painting.

Please look at the [tutorial](https://github.com/SouthGreenPlatform/TraceAncestor_gemo)  
## Citation

Summo M. et al (in prep)

## Acknowledgements

GeMo has been developed in the framework of the [Genome Harvest project](https://www.genomeharvest.fr) supported by the Agropolis fondation.
