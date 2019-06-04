const axios = require("axios")
const client = require('prom-client');

let gateway = new client.Pushgateway('http://fh1-prom01.dun.fh:9091');

async function push(jobName, labelName, labelValue, opts) {

    try {

        gateway.pushAdd({ jobName: jobName, groupings: { service: labelName, value: "true" } }, (err, resp, body) => {
        })
    } catch (ex) {
        console.log(JSON.stringify(ex))
    }
}

module.exports = push