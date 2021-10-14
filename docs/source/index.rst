.. GeMo documentation master file, created by
   sphinx-quickstart on Thu Oct 14 10:29:17 2021.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to GeMo's documentation!
================================

.. image:: _images/GeMo.png
   :target: _images/GeMo.png
   :align: center
   :alt: GeMo Logo

Today, assembly a genome using long reads from Oxford Nanopore Technologies is really interesting in particular to solve repeats and structural variants in prokaryotic as well as in eukaryotic genomes. Assemblies are increasing contiguity and accuracy.

The daily increase of data sequences obtained and the fact that more and more tools are being released or updated every week,
many species are having their genomes assembled and that’s is great ...

"\ *But which assembly tool could give the best results for your favorite organism?*\ "

**CulebrONT can help you!** CulebrONT is an open-source, scalable, modular and traceable Snakemake pipeline, able to launch multiple assembly tools in parallel, giving you the possibility of circularise, polish, and correct assemblies, checking quality. CulebrONT can help to choose the best assembly between all possibilities.

.. toctree::
   :caption: About GeMo
   :name: about_gemo
   :maxdepth: 2

   README.rst

.. toctree::
   :caption: Chromosome painting using VCFHunter
   :name: vcfhunter
   :maxdepth: 2

   VCFHunter.rst

.. toctree::
   :caption: Chromosome painting using TraceAncestor
   :name: traceancestor
   :maxdepth: 2

   TraceAncestor.rst

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
