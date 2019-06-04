'use strict';
const {push, setBadge} = require('./prometheus')
const getORs = require('./sourcegraph')

async function hunt(token, opts) {

  const ors = await getORs(token, opts)

  for (const or of ors) {
    Object.keys(or.data).map(orKey => {

      const completedNoOrs = Object.keys(or.data[orKey]).filter(key => {
        return or.data[orKey][key].completed === true
      }).length

      const totalNoOrs = Object.keys(or.data[orKey]).length
      const completionLevel = Math.round(completedNoOrs / totalNoOrs * 4) || 0

      setBadge(or.serviceName, orKey, completionLevel)
    })
  }
  push()
}


module.exports = hunt