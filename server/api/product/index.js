'use strict';

import createProduct from './routes/createProduct';
import getProducts from './routes/getProducts';
import getProduct from './routes/getProduct';
import deleteProduct from './routes/deleteProduct';

exports.register = (server, options, next) => {

  server.route(createProduct);
  server.route(getProducts);
  server.route(getProduct);
  server.route(deleteProduct);
  next();
}

exports.register.attributes = {
  name: 'product',
}
