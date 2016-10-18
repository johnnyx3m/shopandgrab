'use strict';

import bcrypt from 'bcrypt';
import AppConfig from '../../config';

export default {
  hash: function(unhashedPassword){
    const salt = bcrypt.genSaltSync(AppConfig.get("/security/saltWorkFactor"));
    const hash = bcrypt.hashSync(unhashedPassword, salt);
    return hash;
  },
  comparePassword: function(password,dbPassword){
    return bcrypt.compareSync(password, dbPassword);
  }
}
