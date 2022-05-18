Local Install
=============

Prerequisites
^^^^^^^^^^^^^

To install GeMo on your computer you need a local server environment like `MAMP <https://www.mamp.info/en/downloads/>`_.

You will also need to install Python 3 and Node. We recommand to install `NVM <https://github.com/nvm-sh/nvm/>`_ to manage Node and NPM versions.

Clone the GeMo repository
^^^^^^^^^^^^^^^^^^^^^^^^^

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

Launch node server
^^^^^^^^^^^^^^^^^^

In GeMo directory :

::

    npm run server
    
Configure socket variable
^^^^^^^^^^^^^^^^^^^^^^^^^

In the GeMo directory, modify the index.php file to connect to your local node server :

::

    var socket = io('http://localhost:9070');
    

Configure MAMP 
^^^^^^^^^^^^^^

Start MAMP and click the “Start” button in the toolbar.
In ``MAMP > Preferences... > Web Server`` the Document root is set to ``/Applications/MAMP/htdocs``. 
You can change the path to point on the GeMo directorie.

Your local GeMo is now accessible in your web browser : http://localhost:8888/
    

