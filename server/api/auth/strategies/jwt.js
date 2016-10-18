'use strict';

export default (decoded, request, callback) => {
  var db = request.server.plugins['hapi-mongodb'].db;
  var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;


  if(decoded._id){
    db.collection('users').findOne({"_id": new ObjectID(decoded._id)},function(err,result){
      //if(err) return reply(Boom.internal('Database error'))
      console.log(result);
      return callback(err,true, result);
      //return [false];
    })
  }
  //return callback(null, false);
}
