GeMo - Genome Mosaics visualization tool
========================================

GeMo is a web interface that allows to visualize **Genome Mosaics** with
current focus on plants. GeMo is interactive and user-friendly to help
users to handle their data in an easy and interactive way.

Live demo
---------

GeMo is currently running at the `Banana Genome
Hub <https://banana-tools-genome-hub.southgreen.fr/gemo/>`__ where
anyone can upload its own data or test with pre-loaded mosaics/datasets.


Main features
-------------

1. Dynamic chromosome painting visualisation

2. Online Data curation of mosaic prediction

3. Markers or Genes Plots on mosaic karyotypes

4. Data and high quality image export


Data inputs (*Coming soon*)
---------------------------

It accepts two types of files:

-  Genomic blocks:

-  Normalized curves:

See the Wiki for full documentation.

Generating datasets
-------------------

In order to generate ready-to-use datasets, analyses can be conducted
with the following software:

VCFHunter
~~~~~~~~~

VCFHunter is a suite of `python
scripts <https://github.com/SouthGreenPlatform/VcfHunter>`__ enabling
chromosome painting of individual based on the contribution of ancestral
groups using VCF files.

Please look at the `tutorial <VCFHunter.md>`__

TraceAncestor
~~~~~~~~~~~~~

TraceAncestor allows to estimate the allelic dosage of ancestral alleles
in hybrid individuals and then to perform chromosome painting.

Please look at the `tutorial <TraceAncestor.md>`__

Citation
--------

ummo M, Comte A, Martin G, Weitz E, Perelle P, Droc G and Rouard M. GeMo: A mosaic genome painting tool for plant genomes. (in prep)

Acknowledgements
----------------

GeMo has been developed in the framework of the `Genome Harvest
project <https://www.genomeharvest.fr>`__ supported by the Agropolis
fondation.
