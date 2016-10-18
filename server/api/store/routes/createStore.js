'use strict';

import Joi from 'joi';
import Boom from 'boom';

export default {
  method: 'POST',
  path: '/stores',
  config: {
    tags: ['api', 'stores'],
    description: 'Create a store',
    notes: 'Takes a user and pass and returns a token for an authenticated user',
    auth: false,
    cors: true,
    validate: {
      payload: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        address1: Joi.string().required(),
        address2: Joi.string().required(),
        contactPerson: Joi.string().required(),
        phone1: Joi.string().required(),
        phone2: Joi.string().required()
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

      request.payload._id = new ObjectID();
      request.payload.status = 'Pending';

      db.collection('stores').save(request.payload, function(err, result) {
          if (err) return reply(Boom.internal('Internal MongoDB error', err));
          if(!result){
            return reply(Boom.notFound('Not found'));
          }

          reply(request.payload);
      });

    }
  }
}
