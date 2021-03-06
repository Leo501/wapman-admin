const COS = require('cos-nodejs-sdk-v5');
const { AppId, SecretId, SecretKey, Bucket, Region } = require('../common/config/cos')
const logger = require('./logger');
const date = require('../utils/date');
const utils = require('../utils/index');

class Cos {
  constructor(AppId, SecretId, SecretKey, Bucket, Region) {
    this.Bucket = Bucket;
    this.Region = Region;

    this.cos = new COS({ AppId, SecretId, SecretKey });
  }

  async uploadImg(stream) {
    const prefix = '/avatar';
    const name = date.nowToName() + utils.randomString(8);
    return new Promise((resolve, reject) => {
      this.cos.putObject({
        Bucket : this.Bucket,
        Region : this.Region,
        Key : `${prefix}/${name}.png`,
        Body: stream
      }, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = new Cos(AppId, SecretId, SecretKey, Bucket, Region);
