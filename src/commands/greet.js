'use strict';

const greet = require('../modules/greet');

module.exports = (name, opts) => {
  console.log(greet(name, opts));
};
