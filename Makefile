# A general Makefile for GAS projects
# All variables are environmental

deploy:
	gas deploy -s ${GAS_CLIENT_SECRET} -c ${GAS_CRED} -b ${GAS_BUILD_DIR} -f ${GAS_SCRIPT_ID}

authorize:
	rm -f ${GAS_CRED}
	gas authorize -s ${GAS_CLIENT_SECRET} -c ${GAS_PROJ_DIR}credentials.json
