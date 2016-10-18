'use strict';

import createStore from './routes/createStore';
import getStores from './routes/getStores';
import getStore from './routes/getStore';

exports.register = (server, options, next) => {

  server.route(createStore);
  server.route(getStores);
  server.route(getStore);
  next();
}

exports.register.attributes = {
  name: 'store',
}
