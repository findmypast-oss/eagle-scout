#!/usr/bin/env node

'use strict';

const program = require('commander');
const version = require('../package.json').version;
const greet = require('./commands/greet');
const hunt = require('./commands/hunt')

const shoutOption = {
  flag: '-s, --shout',
  description: 'SHOUT out the name of the person to greet'
};

const greetOption = {
  flag: '-g, --greeting <greeting>',
  description: 'Change the greeting from the default "Hello" greeting'
};

const sourcegraphOption = {
  flag: '-s, --sourcegraph <address>',
  description: 'Use the specifed SourceGraph address to scrape'
};

program
  .version(version);

program
  .command('greet <name>')
  .description('Displays a greeting message to <name>')
  .option(shoutOption.flag, shoutOption.description)
  .option(greetOption.flag, greetOption.description)
  .action(greet);

program
  .command('hunt')
  .arguments('<token>')
  .description('Scouts repositories with the given SourceGraph <token>')
  .option(sourcegraphOption.flag, sourcegraphOption.description)
  .action(async (token, opts) => await hunt(token, opts));

program.parse(process.argv);
