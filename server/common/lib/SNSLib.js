import AppConfig from '../../config';
import Promise from 'bluebird';
import SNS from 'sns-mobile';
import _ from 'lodash';

const iosDev         = new SNS(_.merge(AppConfig.get('/aws/config'), AppConfig.get('/aws/snsIOS')));
const androidDev     = new SNS(_.merge(AppConfig.get('/aws/config'), AppConfig.get('/aws/snsAndroid')));

export default {
  registerEndpointToSNS(deviceId, device) {
    return new Promise(function(resolve, reject){

      const callback = function(err, endpointArn){
        if (err) reject(err)
        else resolve(endpointArn)
      }

      if(device === 'ios') {
        iosDev.addUser(deviceId, null, callback);
      }
      else {
        androidDev.addUser(deviceId, null, callback);
      }

    });

  },

  pushSNStoEndpoint(params) {
    return new Promise(function(resolve, reject){
      const datetime = Math.floor(Date.now() / 1000);
      let msg;

      var callback = function(err, endpointArn){
        if (err) reject(err)
        else resolve(endpointArn)
      }

      params.data = params.data || {};
      params.data = typeof params.data === 'string' ? JSON.parse(params.data) : params.data;

      if(params.device === 'ios') {
        params.data.aps = {
          "id": "",
          "type": params.type,
          "badge": params.badge,
          "alert": params.message,
          "sentTime": datetime,
          "title": params.title,
          "sound": params.sound,
          "icon": params.icon,
          "color": params.color,
          "data": {},
          "content-available": "1"
        }

        if (process.env.NODE_ENV === 'production') {
          msg = { APNS: JSON.stringify(params.data) };
        }
        else {
          msg = { APNS_SANDBOX: JSON.stringify(params.data) };
        }
      }
      //ANDROID
      else {
        const value = {
        	"notification": {
            "id": "",
            "type": params.type,
            "badge": params.badge,
        		"body": params.message,
            "sentTime": datetime,
        		"title": params.title,
            "sound": params.sound,
        		"icon": params.icon,
        		"color": params.color,
        	},
        	"data": {}
        }
        msg = { GCM: JSON.stringify(value) }
      }

      console.log(msg)

      if(params.device === 'ios') {
        iosDev.sendMessage(params.endpointArn, msg, callback);
      }
      else {
        androidDev .sendMessage(params.endpointArn, msg, callback);
      }
    });
  },
}
