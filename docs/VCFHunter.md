Tutorial for VcfHunter chromosome painting and data visualization with GEMO
===========================================================================

**This tutorial point to tools that are not yet available but that will come soon**

This tutorial aimed at showing how data should be processed to be then 
visualized with the [GEMO tool](https://github.com/SouthGreenPlatform/GeMo).

**Go to the VcfHunter/TestTools/ folder** (Scripts can be run from any
folder but the command lines in this tutorial assume you are in this
folder and that you have python 3 version).


Chromosome painting using non admixed ancestral accessions
----------------------------------------------------------------

### Available data:

*../data/config/Origin.tab* is a file which contained two column: a first
column containing ancestral accession names and a second column containing
their ancestral origin (this program can work until 8 distinct origins).

*../data/config/Vcf.conf* is a file which contained path to vcf files which
will be used for e-chromosome painting.

*../data/vcf/* is a folder containing the vcf for 5 chromosomes on 15 accessions
which will be used in this tutorial.

*../data/config/Intogression.tab* is a 8 column file that locate regions in some 
accessions that should not be used to detect ancestral origin in specific 
accessions (because these regions are introgressed in these accessions). 
Column 4,5,6 are not used in this program but should be present. Any text 
without space will work with these columns. In other column here are the 
information that should be passed: col1 -> accession_name, col2 -> chromosome, 
col3 -> ancestral_origin_of_the_accession, col7 -> start_position_of_introgressed_region, 
col8 -> end_position_of_introgressed_region

### Principle:

The principle of this analysis is to (1) identify specific allele of distinct 
genetic pools, (2) calculate the expected allelic ratio of these alleles in these 
genetic pools, (3) calculate the observed allelic ratio a/several given accessions 
and (4) normalize these observed ratios using expected ratio to infer the number 
of haplotypes of each genetic pools that are present on a given windows of the 
studied accession.

Files obtained at the end of the process can be given to GEMO tools to visualize 
data and optimize parameters.

### Running analysis

#### 1 - Identification of private alleles and formating output for more analysis

Go to the TestTools folder and run the following command line:

```
../bin/IdentPrivateAllele.py -c ../data/config/Vcf.conf -g ../data/config/Origin.tab -o step1 -a y -i ../data/config/Intogression.tab -m y -t 2
```

In this first step, the program use genotyping information provided in vcf files 
passed in *Vcf.conf* file and the file *Origin.tab* containing the corresponding 
genetic pools of some accessions of the vcf to identify alleles specific of each 
pools. The file passed to -i option identify introgressed regions in some 
accessions used as representative of genetic pools and allow exclusion of these 
regions in these accessions for identification of specific alleles. The *-t 2* 
option assume that two processors are available for the program. You can adapt 
this value to your computer capacity. Outputs can be found in directory passed 
in *-o* option. For each accessions identified as belonging to a genetic pool 
a directory is created. This directory contained png and tab files equivalent 
to those described in *tutorial_ChromosomePainting.md*. Several options allow 
to adapt the way by which specific alleles are identified (-a, -p, -m). Enter the 
following command to have a description of options:

```{bash}
../bin/IdentPrivateAllele.py -h
```

#### 2 - Determination of expected read ratio for each ancestral position based on ancestral accessions merged together

```
../bin/allele_ratio_group.py -g ../data/config/Origin.tab -p _ratio.tab.gz -e ../data/config/Intogression.tab -o step2 -i step1
```

In this second step the program take the input of specific allele identified in 
each accessions used to define genetic pools (ratio.tab.gz files of *step1* folder) 
and calculate an average expected allele ratio (globally a proxy of the fixation 
level of the allele) in the genetic pool the allele belongs. Outputs are created 
in folder *step2* passed in *-o* option. A file is generated per genetic pool. This 
file contained on column 1: the chromosome, column 2: the position, column 3 the 
allele, column 4: the genetic pool that as been attributed, column 4 the average 
allelic ratio observed and column 5: the number of ancestral accessions used to 
calculate this observed ratio.


#### 3 - Calculation of observed ratio in other accessions

The third step is to calculate, for each position in which an allele specific of 
a genetic pool was identified, the observed allelic ratio in a studied accession. 
In this example we calculate this ratio on the Kunnan accession. You can look at 
the expected ancestral composition of these accession in *tutorial_ChromosomePainting.md*. 

```
../bin/allele_ratio_per_acc.py -c ../data/config/Vcf.conf -g ../data/config/Origin.tab -i step2 -o step3 -a Kunnan
```

The output can be found in the *step3* folder passed in *-o* option. This file 
contained 6 columns: column 1 corresponded to the chromosome, column 2 is the 
position of the allele, column 3 is the allele, column 4 corresponded to the 
observed allele frequency in the accession, column 5 is the expected allele 
frequency calculated at step 2 and column 6 is the genetic group to which the 
allele has been attributed.


#### 4 - Calculation on sliding of the normalized observed ratio and ancestral blocs

In this step, in a given sliding windows, the observed average allelic ratio is 
calculated for each genetic pool and normalized by the expected allelic ratio. 
The resulting value is used to infer the number of haplotypes from the studied 
genetic pool present in the studied accession. Outpout are of two types: a *tab.gz* 
file containing normalized values for each genetic pools in the given windows. 
This file contained 4 + X columns, X being the number of genetic pools tested. 
The column 1 contained the chromosome name, column 2 contained the position of 
the central allele in the windows, column 3 contained the start position of the 
windows and column 4 contained the end position of the windows. Columns 5 to end 
contained the normalized ratio calculated for the accessions. A columns per genetic 
pool.
The second type of files generated are named *Accession_chromosome_haplotype.tab* 
and contained the hypothesized haplotypes from this accession given results from 
*tab.gz* file. Haplotype are hypothetic ones that tries to minimize recombinations 
events between distinct genetic pools. These files are formatted as follows: column 
1 contained accession name, column 2 contained chromosome ID, column 3, 4 and 5 
contained start, end, and origin of a region.

```
mkdir step4
../bin/PaintArp.py -a Kunnan -r step3/Kunnan_ratio.tab.gz -c ../data/config/color.conf -o step4/Kunnan -w 12 -O 0 -s ../data/reference/chromosome.tab
```

#### 5 - File formating for GEMO visualization

This steps aims at reformatting the files so that they are compatible with GEMO 
tool. GEMO tool performs two tasks, the first one consists in drawing ancestral 
block identified at step 4. The second one also draw these blocks but allowed 
refinement of these block using custom and adjustable parameters. For block 
drawing of step 4 we will reformat block files so that they match expectation 
with GEMO. For this run the following command line:

```{bash}
mkdir step5
python ../bin/convertForIdeo.py --name Kunnan --dir step4 --col ../data/config/color.conf --size ../data/reference/chromosome.tab --prefix step5/Kunnan
```

This command generate several files. A file named **Kunnan_ideo.tab** that 
contained block that could be drawn with GEMO (data section), a file named 
**Kunnan_chrom.tab** that contained information required to draw chromosomes.
A third file named **Kunnan_color.tab** contained color information that 
could be used to draw blocks with custom color. 



For blocks refinement using custom and adjustable parameters. The file of 
normalized ratio should be reformatted with this simple command line to 
obtain a file named **Kunnan_win_ratio.tab**: 

```{bash}
zcat step4/Kunnan_win_ratio.tab.gz | awk '{$2=""; print $0}' | sed 's/CHR/chr/' | sed 's/Start/start/' | sed 's/End/end/' | sed 's/  / /g' | sed 's/ /\t/g' | sort -k1,1 -k2n,2 | sed 's/chr09/chr05/' > step5/Kunnan_win_ratio.tab
```


#### 6 - Visualization and block refinement with GEMO

To visualize the blocks, go to GEMO tool and select **Block positions** 
by clicking on **(1)** as in the Figure 1. Then load the block by choosing 
**Kunnan_ideo.tab** file in **(2)**. Load the chromosome information file 
by choosing the **Kunnan_chrom.tab** in **(3)**. You can optionally load 
a color file by choosing the **Kunnan_color.tab** in **(4)**. Then click
on **Submit** to draw the picture **(5)**.

![](/images/GEMO1.png)


To refine blocks, go to GEMO tool and select **Normalized curves** 
by clicking on **(1)** as in the Figure 2. Then load the curves by choosing 
**Kunnan_win_ratio.tab** file in **(2)**. Load the chromosome information file 
by choosing the **Kunnan_chrom.tab** in **(3)**. You can optionally load 
a color file by choosing the **Kunnan_color.tab** in **(4)**. Then click
on **Submit** to draw the picture **(5)**.

![](/images/GEMO2.png)

