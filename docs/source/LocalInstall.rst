Local Install
=============

Clone the GeMo repository

::

    git clone https://github.com/SouthGreenPlatform/GeMo.git
    cd GeMo

Install Node dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^

::

    npm install
    npm ci

Create required directories
^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

    mkdir tmp
    mkdir tmp/gemo_run
    mkdir tmp/gemo_saved


Change path in the server script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

    //const progPath = '/opt/projects/VisuSNP/htdocs/gemo/python/';
    //const workingPath = '/opt/projects/VisuSNP/htdocs/gemo/tmp/gemo_run/';
    const progPath = '/Applications/MAMP/htdocs/GeMo-master/python/';
    const workingPath = '/Applications/MAMP/htdocs/GeMo-master/tmp/gemo_run/';

    //const savedDir = '/opt/projects/VisuSNP/htdocs/gemo/tmp/gemo_saved/gemo_' + id +'/';
    const savedDir = '/Applications/MAMP/htdocs/GeMo-master/tmp/gemo_saved/gemo_' + id +'/';


dans le main : virer les gemo/ dans les path


Launch node server
^^^^^^^^^^^^^^^^^^

::

    npm run server
    
Create your json data file
^^^^^^^^^^^^^^^^^^^^^^^^^^
example:

::

    
    

