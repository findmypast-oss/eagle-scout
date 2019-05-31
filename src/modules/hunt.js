'use strict';
const push = require('./prometheus')
const getORs = require('./sourcegraph')

async function hunt(token, opts) {

  const ors = await getORs(token, opts)
  
  for await (const or of ors) {
    await push('badges', or.serviceName, or.blob, opts)
  }
}


module.exports = hunt