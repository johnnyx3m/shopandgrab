'use strict';

import Joi from 'joi';
import Boom from 'boom';

export default {
  method: 'POST',
  path: '/products',
  config: {
    tags: ['api', 'products'],
    description: 'Create a product.',
    notes: 'Takes a user and pass and returns a token for an authenticated user',
    auth: false,
    cors: true,
    validate: {
      headers: Joi.object({
       'authorization': Joi.string().required()
      }).unknown(),
      payload: {
        name: Joi.string().required(),
        description: Joi.string().required()
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

      db.collection('products').save(request.payload, function(err, result) {
          if (err) return reply(Boom.internal('Internal MongoDB error', err));
          if(!result){
            return reply(Boom.notFound('Not found'));
          }

          reply(request.payload);
      });

    }
  }
}
