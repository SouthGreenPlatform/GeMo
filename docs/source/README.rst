GeMo is a WebApp to represent Genome Mosaics with current focus on plants. However, GeMo is developed in a generic way it can be also applied to other organisms.


Main features
=============

1. Dynamic chromosome painting visualisation

2. Online Data curation of mosaic prediction

3. Markers or Genes Plots on mosaic karyotypes

4. Data and high quality image export


Data inputs
===========

GeMo requires two types of datasets to generate the ideogram visualization

.. image:: _images/menu.png
   :target: _images/menu.png
   :width: 250
   :alt: Menu

1. Input files

The position of the mosaic blocks along the chromosomes. It accepts two types of files:

**Genomic blocks**

.. list-table::
   :header-rows: 1

   * - chr
     - haplotype
     - start
     - end
     - ancestral_group
   * - chr01
     - 0
     - 1
     - 29070452
     - g4
   * - chr01
     - 1
     - 1
     - 29070452
     - g4
   * - chr02
     - 0
     - 1
     - 29511734
     - g4
   * - chr02
     - 1
     - 1
     - 29511734
     - g4


**Normalized curves**

.. list-table::
   :header-rows: 1

   * - chr
     - start
     - end
     - V
     - T
     - S
   * - chr01
     - 1145
     - 189582
     - 0.001671988
     - 0.014082301
     - 0.001638686
   * - chr01
     - 189593
     - 356965
     - 0.001244196
     - 0.012867256
     - 0.001810139
   * - chr01
     - 356968
     - 488069
     - 0.001117959
     - 0.010035172
     - 0.000759437
   * - chr01
     - 488097
     - 633373
     - 0.002678213
     - 0.010470727
     - 0.003896031

2. Chromosomes sizes and labels

Chromosome data format, each column tab separated
chr, len, centromereInf (optional), centromereSup (optional), label (optional)

.. list-table::
   :widths: 25 25 25
   :header-rows: 1


   * - chr
     - len
     - label
   * - chr01
     - 37945898
     - AB
   * - chr02
     - 34728925
     - AB
   * - chr03
     - 40528553
     - AB
   * - chr04
     - 34728925
     - AB
   * - chr05
     - 44598304
     - AB
   * - chr06
     - 46248384
     - AB
   * - chr07
     - 42818424
     - AB
   * - chr08
     - 38870123
     - AB

Optional file

**Color**

.. list-table::
   :header-rows: 1

   * - group
     - name
     - hex
   * - g1
     - group1
     - #000000
   * - g2
     - group2
     - #ffc000
   * - g3
     - group3
     - #1440cd
   * - g4
     - group4
     - #00b009

**Annotations**
 
.. list-table::

   * - chr01
     - 5287838
     - 5289224
     - gene
     - 0
     - -
   * - chr01
     - 15485703
     - 15486813
     - gene
     - 0
     - +
   * - chr02
     - 2276353
     - 2277821
     - gene
     - 0
     - +
     
Data outputs
===========

Once data is provided the chromosome diagram is generated on the fly. Chromosomes display colored blocks usually corresponding to their ancestral/parental origin. An interactive legend is present to label each group with a corresponding color. The user can modify the color of a group directly in the legend.

1. Blocks 

.. image:: _images/bloc.png
   :target: _images/bloc.png
   :width: 500
   :alt: blocks
   
2. Curves

In this mode, the graph represent the proportion of haplotypes of each ancestral origin along chromosomes. They are the results of a normalisation of the number of reads supporting each origin on a given window.

.. image:: _images/curve.png
   :target: _images/curve.png
   :width: 700
   :alt: curves



Live demo
=========

GeMo is currently running at the `Banana Genome Hub <https://banana-tools-genome-hub.southgreen.fr/gemo/>`__ where
anyone can upload its own data or test with pre-loaded mosaics/datasets.

Citation
========

Summo M, Comte A, Martin G, Weitz E, Perelle P, Droc G and Rouard M. GeMo: A mosaic genome painting tool for plant genomes. (in prep)

Acknowledgements
================

GeMo has been developed in the framework of the `Genome Harvest project <https://www.genomeharvest.fr>`__ supported by the Agropolis
fondation.

Troubleshooting and web browser compatibility
=============================================


The web interfaces were tested with the following platforms and web browsers:

.. list-table::
   :header-rows: 1

   * - OS
     - Version
     - Chrome
     - Firefox
     - Edge
     - Safari
   * - Windows 10
     - 10
     - 88.0.4324.150
     - 94.0.1
     - 96.0.1054.29
     - n/a
   * - Linux
     - 
     - 
     -
     -
     -
   * - Mac OS
     - 
     - 
     -
     -
     -


