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

Install
-------

*Coming soon*

Main features
-------------

Chromosome painting
~~~~~~~~~~~~~~~~~~~

Chromosome representation based on
`ideogram <https://github.com/eweitz/ideogram>`__.

Polyploidy
~~~~~~~~~~

Karyotype can display to 1x to nX chromosome. Aneuploidy can be
represented.

Refinement of ancestral/parental contribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Coming soon*

Plot genes on mosaic karyotypes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Coming soon*

Data and high resolution image downloads
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once data is visualized, customized and possibly curated, GeMo offers
the possibility to download the latest version of the data sets and
export the output graphics as SVG for publication purposes. data can be
also stored temporarily online with an unique URL allowing to share it
with multiple users.

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

Summo M. et al (in prep)

Acknowledgements
----------------

GeMo has been developed in the framework of the `Genome Harvest
project <https://www.genomeharvest.fr>`__ supported by the Agropolis
fondation.
