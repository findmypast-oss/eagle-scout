const axios = require("axios")

let PROMETHEUS_ADDRESS = 'http://fh1-prom01.dun.fh:9091'

function managePrometheusAddress(opts) {
    if (!opts.prometheusAddress)
        return
    PROMETHEUS_ADDRESS = opts.prometheusAddress
}

async function push(jobName, labelName, labelValue, opts) {
    managePrometheusAddress(opts)

    try {
        const result = await axios(
            {
                method: 'post',
                url: `${PROMETHEUS_ADDRESS}/metrics/job/${jobName}`,
                headers: { 'Content-Type': 'application/octet-stream' },
                data: `${labelName} ${labelValue}`
            })
    } catch (ex) {
        console.log(JSON.stringify(ex))
    }
    console.log(result)
}

module.exports = push