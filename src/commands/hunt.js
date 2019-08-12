'use strict';

const hunt = require('../modules/hunt');

function getSecretFromConfig(filePath){
  let result = require(filePath)
  return result.accessToken;
}

module.exports = async (opts) => {
  const token = opts.configfile ? getSecretFromConfig(opts.configfile) : opts.token;
  if(!token){
    throw new Error('No token specified!')
  }
  console.log(await hunt(token, opts));
  console.log('Collected or.json data')
};
