#!/bin/bash
# deploy.sh
# Stephen Kasica
# Deploy local files to Google Apps Script. All variables are environmental.
#

gas deploy -s $CLIENT_SECRET -c $CRED -b $BUILD_DIR -f $SCRIPT_ID
