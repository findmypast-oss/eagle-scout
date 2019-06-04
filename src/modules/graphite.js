var MetricsServer = require('node-statsd');

var metricsConfig = {
    prefix: 'badges.',
    interval: 1000,
    verbose: true,
    host: 'graphite.dun.fh', // graphite server host or ip
    port: 8125, // graphite server udp port
}

const metrics = new MetricsServer(metricsConfig)

function push(serviceName, badgeName, badgeValue) {
    metrics.gauge(`${serviceName}.${badgeName}`, badgeValue);
}

module.exports = push