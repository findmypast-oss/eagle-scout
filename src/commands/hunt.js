'use strict';

const hunt = require('../modules/hunt');

module.exports = async (token, opts) => {
  console.log(await hunt(token, opts));
};
