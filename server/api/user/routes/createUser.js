'use strict';

import Joi from 'joi';
import Boom from 'boom';
import AppConfig from '../../../config';

export default {
  method: 'POST',
  path: '/users',
  config: {
    tags: ['api', 'users'],
    description: 'Create a user',
    notes: 'Takes a user and pass and returns a token for an authenticated user',
    auth: false,
    cors: true,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().regex(/^[+0-9]+( +[0-9]+)*$/).min(1).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9._^%$#!~@,-]+( +[a-zA-Z0-9._^%$#!~@,-]+)*$/)
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

      request.payload._id = new ObjectID();
      request.payload.status = 'ACTIVE';
      const test = password.hash(request.payload.password);
      request.payload.password = test;

      reply(request.payload);


      db.collection('users').save(request.payload, function(err, result) {
          if (err) return reply(Boom.internal('Internal MongoDB error', err));
          reply(request.payload);
      });

    }
  }
}
