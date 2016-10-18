'use strict';

import Joi from 'joi';
import Boom from 'boom';
import jwt from 'jsonwebtoken';
import AppConfig from '../../../config';

export default {
  method: 'POST',
  path: '/sessions/login',
  config: {
    tags: ['api', 'sessions'],
    description: 'Authenticate a user',
    notes: 'Takes a user and pass and returns a token for an authenticated user',
    auth: false,
    cors: true,
    validate: {
      payload: {
        userName: Joi.string().required(),
        password: Joi.string().required()
      }
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          '401': {'description': 'Invalid credentials'},
          '500': {'description': 'Internal Server Error'}
        }
      }
    },
    handler(request, reply) {
      const db = request.server.plugins['hapi-mongodb'].db;
      const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
      const { password } = request.server.plugins.common;


      db.collection('users').findOne({userName: request.payload.username}, function(err, result) {
          if (err) return reply(Boom.internal('Internal MongoDB error', err));
          if(!result){
            return reply(Boom.notFound());
          }

          console.log(request.payload.password);
          console.log(result.password);

          if(password.comparePassword(request.payload.password, result.password)){
            result.token = jwt.sign(result, AppConfig.get('/security/jwtSecret'), { expiresIn: 3600 });
            return reply(result);
          }
          else{
            return reply(Boom.unauthorized());
          }

      });

    }
  }
}
