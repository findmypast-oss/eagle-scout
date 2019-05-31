'use strict';
const axios = require('axios')
const SOURCEGRAPH_ADDRESS = 'http://fh1-srcgrph01.dun.fh'
const API_URL = '/.api/graphql'

function getSourceGraphAddress(opts) {
  if (!opts.address) return SOURCEGRAPH_ADDRESS;

  return opts.address;
}

async function hunt(token, opts) {
  const sourceGraphAddress = getSourceGraphAddress(token, opts);
  const {data: result} = await axios.post(`${sourceGraphAddress}${API_URL}`, { "query": "query {currentUser { username} }" }, {
    headers: {
      Authorization: 'token ' + token
    }
  });
  return result.data.currentUser.username
}


module.exports = hunt