'use strict';
const { push, setBadge } = require('./prometheus')
const getORs = require('./sourcegraph')

function getCompletedORCount(or, orKey) {
  let counter = 0
  for (const key of Object.keys(or[orKey])) {
    if (or[orKey][key].completed === true) {
      ++counter
    }
  }
  return counter
}

//Get the completion percentage and multiply by four to introduce 4 levels of completion: none, bronze, silver, gold
//2 out of 3 ors completed: 0.66
//0.66 * 4 = 2.64
//Ceil 2.64 = 3
//3 = Silver Level
function getCompletionLevel(completedNoOrs, totalNoOrs) {
  return Math.ceil(completedNoOrs / totalNoOrs * 4) || 0;
}

async function hunt(token, opts) {

  const allORs = await getORs(token, opts)

  for (const orDetail of allORs) {
    const or = orDetail.or
    Object.keys(or).map(orKey => {
      const completedNoOrs = getCompletedORCount(or, orKey)
      const totalNoOrs = Object.keys(or[orKey]).length
      const completionLevel = getCompletionLevel(completedNoOrs, totalNoOrs)

      setBadge(orDetail.owner, orDetail.serviceName, orKey, completionLevel)
    })
  }
  push()
}


module.exports = hunt