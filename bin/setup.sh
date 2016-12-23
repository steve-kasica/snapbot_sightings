#!/bin/bash
# setup.sh
# Stephen Kasica
# Setup virtual environment for local development
#

virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
