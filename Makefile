# 
# Makefile
# See https://github.com/joestump/python-gas-cli for more details
# on "deploying" to Google Apps Script

PROJ=$(shell pwd)

# Directory with .gs files, mirrors GAS project in browser editor.
BUILD_DIR=${PROJ}/src

# Client secret obtained from Google Developer's Console.
CLIENT_SECRET=${PROJ}/../client_secret.json

# generated from `make authorize`.
CRED=${PROJ}/../credentials.json

# OAuth flow for authorization
authorize:
	gas authorize -s ${CLIENT_SECRET} -c ${CRED}

# "deploy" code to Google Apps Script. SCRIPT_ID is 
# set in the environment.
deploy:
	gas deploy \
		-s ${CLIENT_SECRET} \
		-c ${CRED} \
		-f ${SCRIPT_ID} \
		-b ${BUILD_DIR}
