TraceAncestor2.pl is a script that allows to estimate the allelic dosage
of ancestral alleles in hybrid individuals and then to perform
chromosome painting.

Installation
============

.. code-block:: bash

   git clone https://github.com/SouthGreenPlatform/TraceAncestor.git
   cd TraceAncestor
   chmod +x bin/*

vcf2gst.pl
==========

Usage
-----

This script is used to define GST values from individuals that are
identified as pure breed for an ancestor.

Must be used on pure breed. If there is introgressed part on the genome
of the individual, the part must be removed before analysis.


.. code-block:: bash

   vcf2gst.pl --help

   Parameters :
       --vcf       vcf containing the ancestors [Required]
       --ancestor  ancestor file [Required]
       --depth     minimal depth for a snp to be used in the analysis (Default 5)
       --output    output file name (Default GSTmatrice)
       --help

Input
-----

 --ancestor Ancestor file (Required)

.. literalinclude:: ancestor.txt
    :language: text

The first column correspond to the ancestor (ie : M, P, C, Mic)
The other columns are the names of pure breed individuals in the vcf files (ie : Chandler, KaoPan, Pink...)

 --vcf VCF file (Required)

:download:`data.vcf<data.vcf>`

Now, you can run the following command

.. code-block:: bash

   vcf2gst.pl --ancestor ancestor.txt --vcf data.vcf --output GSTMatrix.txt

Output
------

*The output is a CSV file containing GST (inter-population
differentiation parameter) information:*

.. literalinclude:: GSTMatrix.txt
    :language: text
    :lines: 1-5

*with :*

-  #CHROM = chromosome name
-  POS = position of DSNP
-  REF = Base of the reference allele of this DSNP
-  ALT = Base of the alternative allele of this DSNP
-  %Nref = Percentage of maximal missing data for this DSNP
-  GST = value of GST (inter-population differentiation parameter) (With
   1,2,3 the ancestors names)
-  F = Alternative allele frequency for each ancestor (With 1,2,3 the
   ancestors names)

prefilter.pl
============

.. _usage-prefilter:

Usage
-----

This script is used to define a matrix of ancestry informative markers
from the matrix gotten at the step 1.


.. code-block:: bash

   prefilter.pl --help
   Parameters :
       --input     reference matrice [Required]
       --gst       threshold for gst (Default : 0.9)
       --missing   threshold for missing data (Default 0.3)
       --output    output file name (Default Diagnosis_matrix)
       --help      display this help

Now, you can run the following command

.. code-block:: bash

   prefilter.pl --input GSTMatrix.txt --output Diagnosis_matrix.txt

.. _output-prefilter:

Output
------

A matrix containing all the ancestry informative markers for every
ancestors.

.. literalinclude:: Diagnosis_matrix.txt
    :language: text
    :lines: 1-5

*with:*

-  ancestor = Ancestor names
-  chromosome = Chromosome numbers
-  position = Position of the SNP marker
-  allele = Base of the ancestral allele

TraceAncestor.pl
================

.. _usage-traceancestor:

Usage
-----

.. code-block:: bash

   TraceAncestor.pl --help

   usage: TraceAncestor.pl [-t matrix file] [-v vcf file] [-p ploidy] [-w number of markers by window] [-s threshold for LOD] [-k window size in K-bases] [-i hybrid name to focus on]

    --input     reference matrice [Required]
    --vcf       vcf of the hybrid population
    --ploidy    ploidy of the hybrid population (Default 2)
    --window    number of markers by window (Default 10)
    --lod       LOD value to conclude for one hypothesis (Default 3)
    --freq      theoretical frequency used to calcul the LOD (Default 0.99)
    --cut       number of K bases in one window (Default 100)
    --hybrid    particular hybrid you want to focus on
    --outdir    Directory output (Default result)
    --help      display this help


Now, you can run the following command

.. code-block:: bash

   TraceAncestor.pl --input Diagnosis_matrix.txt --vcf data.vcf --hybrid Giant_key --ploidy 4


.. _ouputs-traceancestor:

Outputs
-------

-  Giant_key_ideo.txt : the painting data. An Ideogram output compatible with GeMo

.. literalinclude:: Giant_key_ideo.txt
    :language: text
    :lines: 1-5

-  Giant_key_chrom.txt : the chromosomes data.
-  Giant_key_ancestor.txt : frequency of ancestors alleles along chromosome for the particular hybrid focused.

.. literalinclude:: Giant_key_ancestor.txt
    :language: text
    :lines: 1-5

-  Giant_key_curve.txt : frequency of ancestors alleles along chromosome for the GeMo visualization tool.

.. literalinclude:: Giant_key_curve.txt
    :language: text
    :lines: 1-5

Reference
=========

-  `Ahmed,D. et al. (2019) Genotyping by sequencing can reveal the
   complex mosaic genomes in gene pools resulting from reticulate
   evolution: a case study in diploid and polyploid citrus. Annals of
   Botany, 123, 1231–1251. <https://doi.org/10.1093/aob/mcz029>`__