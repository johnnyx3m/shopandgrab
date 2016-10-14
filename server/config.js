'use strict';

import Confidence from 'confidence';
// import randomstring from 'randomstring';

const criteria = {
    env: process.env.NODE_ENV
};

const config = {

  $meta: 'Our main Application config',

  pkg: require('../package.json'),

  server : {
    debug: {
      $filter: 'env',
      production: false,
      test: false,
      $default: {
        log: ['error'],
        request: ['error']
      }
    }
  },

  connection : {
    port : '8069',
    host : '0.0.0.0'
  },

  api: {
    swagger: {
      info: {
        title: 'shopandgrab',
        description: 'API Documentation',
      },
      securityDefinitions: [{
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }]
    }
  },

  security: {
    saltWorkFactor: 10,
    jwtSecret: 'T6^9v@q24c&WVhUv)3.Zu3'
  },

  logging : {
    opsInterval: 1000,
    reporters: {
      $filter: 'env',
      test: [],
      $default: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
      }]
    }
  },

  db: {
    mongodb: {
      url: "mongodb://localhost:27017/shopandgrab",
      settings: {
        db: {
          native_parser: false
        }
      }
    }
  },
  notp:{
    time: 300,
    characters: 4
  },
}

const store = new Confidence.Store(config);

export default {
  get(key) {
    return store.get(key, criteria);
  },
  meta(key) {
    return store.meta(key, criteria);
  }
}
