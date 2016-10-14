'use strict';

import convertValidationErrors from './lib/convertValidationErrors';
import processOperationalErrors from './lib/processOperationalErrors';
import consoleLogGeneralErrors from './lib/consoleLogGeneralErrors';
import generateVerifyOTP from './lib/generateVerifyOTP';
import metaList from './lib/metaList';

exports.register = (server, options, next) => {

  // Expose some shared functions for use throughout the server
  server.expose({
    processOperationalErrors: processOperationalErrors(server),
    convertValidationErrors,
    consoleLogGeneralErrors,
    generateVerifyOTP,
    metaList,
  })

  next();

}

exports.register.attributes = {
  name: 'common',
  version: '1.0.0'
}
