#!/usr/bin/env node

'use strict';

const program = require('commander');
const version = require('../package.json').version;
const hunt = require('./commands/hunt')

const sourcegraphOption = {
  flag: '-s, --sourcegraph <address>',
  description: 'Use the specifed SourceGraph address to scrape'
};

const configOption = {
  flag: '-c, --configfile <path>',
  description: 'Use the specifed config file path to be used for scraping'
};

const tokenOption = {
  flag: '-t, --token <token>',
  description: 'Use the specified token to be used for scraping'
}

program
  .version(version);

program
  .command('hunt')
  .description('Scouts repositories with the given SourceGraph [token]')
  .option(sourcegraphOption.flag, sourcegraphOption.description)
  .option(configOption.flag, configOption.description)
  .option(tokenOption.flag, tokenOption.description)
  .action(async (opts) => await hunt(opts));

program.parse(process.argv);
