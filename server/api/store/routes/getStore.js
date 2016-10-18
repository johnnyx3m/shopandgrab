'use strict';

import Joi from 'joi';
import Boom from 'boom';

export default {
  method: 'GET',
  path: '/stores/{id}',
  config: {
    tags: ['api', 'stores'],
    description: 'Get single store',
    notes: 'Takes a user and pass and returns a token for an authenticated user',
    auth:{
      strategies: ['jwt']
    },
    cors: true,
    validate: {
      headers: Joi.object({
       'authorization': Joi.string().required()
      }).unknown(),
      params: {
        id: Joi.string().required()
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

      if(ObjectID.isValid(request.params.id)){
        db.collection('stores').findOne({_id: new ObjectID(request.params.id) },function(err, result) {
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            if(!result){
              return reply(Boom.notFound('No store found.'));
            }

            reply(result);
        });
      }
      else{
        return reply(Boom.badData('Your id is invalid.'))
      }

    }
  }
}
