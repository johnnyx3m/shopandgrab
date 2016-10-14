'use strict';

import AppConfig from '../../config';
import validateJWT from './strategies/jwt';

import authLogin from './routes/authLogin';

exports.register = (server, options, next) => {

  server.auth.strategy('jwt', 'jwt', false, {
    key: AppConfig.get('/security/jwtSecret'),
    validateFunc: validateJWT,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });

  server.route(authLogin);
  next();
}

exports.register.attributes = {
  name: 'auth',
}
