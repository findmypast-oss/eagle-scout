const client = require('prom-client');

let gateway = new client.Pushgateway('http://fh1-prom01.dun.fh:9091');

const gauge = new client.Gauge({
    name: 'badges',
    labelNames: ['team', 'service', 'badge'],
    help: 'Badge completion level for FMP service operational requirements'
})

function push() {
    gateway.pushAdd({ jobName: "badges" }, (err) => {
        err ? console.error(`An error happened when trying to push badges to Prometheus: ${err}`) : null
    })
}

function setBadge(team, service, badge, badgeLevel) {
    console.log(team, service, badge, badgeLevel)
    gauge.set({ team, service, badge }, badgeLevel)
}

module.exports = { push, setBadge }