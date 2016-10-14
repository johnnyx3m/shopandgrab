import AWS from 'aws-sdk';
import AppConfig from '../../config';
import Promise from 'bluebird';

const { S3 } = AWS;

AWS.config.update(AppConfig.get('/aws/config'));

export default function(prefix, filename, contenttype, readStream) {
  return new Promise((resolve, reject) => {
    const s3 = new S3();

    if (prefix.charAt(prefix.length - 1) !== '/') {
      prefix = prefix + '/';
    }

    const key = prefix + filename;

    const params = {
      Bucket: AppConfig.get('/media/bucket'),
      Key: key,
      Body: readStream,
      ContentType: contenttype
    }

    s3.upload(params)
      .send((err, data) => {
        if (err) {
          console.log("An error occurred", err);
          return reject(err);
        }
        console.log(data);
        return resolve({
          key: params.Key,
          filename: filename,
          url: data.Location
        });

    })
  })
}
