'use strict';

import Boom from 'boom';
import Graph from 'fbgraph';
import Promise from 'bluebird';

Promise.promisifyAll(Graph);

export default function(access_token) {
  return Graph.getAsync('/me?fields=id,first_name,last_name,gender,email,birthday,picture{url},cover,friends.limit(50){name,picture{url}}&access_token=' + access_token)
    .catch(function(err) {
      throw Boom.unauthorized(err.message);
    })
    .then(function(res) {
      if(!res.email) {
        throw Boom.unauthorized('invalid access token: no email found, please set extended permissions for email');
      }

      res.picture = 'https://graph.facebook.com/' + res.id + '/picture?type=large&redirect=true&width=600&height=600'; //hi-def image
      return res;
    });
}
