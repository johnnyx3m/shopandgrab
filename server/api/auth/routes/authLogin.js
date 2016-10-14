'use strict';

import Joi from 'joi';
import Boom from 'boom';

export default {
  method: 'POST',
  path: '/auth',
  config: {
    tags: ['api', 'auth'],
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
      var db = request.server.plugins['hapi-mongodb'].db;
      var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

      db.collection('users').findOne(request.payload, function(err, result) {
          if (err) return reply(Boom.internal('Internal MongoDB error', err));
          if(!result){
            return reply(Boom.notFound('Not found'));
          }
          reply(result);
      });

    }
  }
}
