'use strict';

import convertValidationErrors from './lib/convertValidationErrors';
import processOperationalErrors from './lib/processOperationalErrors';
import consoleLogGeneralErrors from './lib/consoleLogGeneralErrors';
import generateVerifyOTP from './lib/generateVerifyOTP';
import password from './lib/password';

exports.register = (server, options, next) => {

  // Expose some shared functions for use throughout the server
  server.expose({
    processOperationalErrors: processOperationalErrors(server),
    convertValidationErrors,
    consoleLogGeneralErrors,
    generateVerifyOTP,
    password
  })

  next();

}

exports.register.attributes = {
  name: 'common',
  version: '1.0.0'
}
