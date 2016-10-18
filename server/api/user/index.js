'use strict';

import createUser from './routes/createUser';
// import getUsers from './routes/getUsers';
// import getUser from './routes/getUser';

exports.register = (server, options, next) => {

  server.route(createUser);
  // server.route(getUsers);
  // server.route(getUser);
  next();
}

exports.register.attributes = {
  name: 'user',
}
