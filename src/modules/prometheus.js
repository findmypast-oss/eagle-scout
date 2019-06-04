const client = require('prom-client');

let gateway = new client.Pushgateway('http://fh1-prom01.dun.fh:9091');

const gauge = new client.Gauge({
    name: 'badges',
    labelNames: ['service', 'badge'],
    help: 'turn to the wall for help'
})

function push() {
    gateway.pushAdd({ jobName: "badges" }, (err, resp, body) => {
        console.log(err)
    })
}

function setBadge(serviceName, badgeName, badgeLevel) {
    gauge.set({ service: serviceName, badge: badgeName }, badgeLevel)
}

module.exports = { push, setBadge }