'use strict';

import Joi from 'joi';
import Boom from 'boom';

export default {
  method: 'GET',
  path: '/products',
  config: {
    tags: ['api', 'products'],
    description: 'Get all products',
    notes: 'Takes a user and pass and returns a token for an authenticated user',
    auth:{
      strategies: ['jwt']
    },
    cors: true,
    validate: {
      headers: Joi.object({
       'authorization': Joi.string().required()
      }).unknown(),
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

      db.collection('products').find({}).toArray(function(err, result) {
          if (err) return reply(Boom.internal('Internal MongoDB error', err));
          if(!result){
            return reply(Boom.notFound('No product found.'));
          }
          reply(result);
      });

    }
  }
}
