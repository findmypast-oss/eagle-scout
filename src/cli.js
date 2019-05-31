#!/usr/bin/env node

'use strict';

const program = require('commander');
const version = require('../package.json').version;
const greet = require('./commands/greet');

const shoutOption = {
  flag: '-s, --shout',
  description: 'SHOUT out the name of the person to greet'
};

const greetOption = {
  flag: '-g, --greeting <greeting>',
  description: 'Change the greeting from the default "Hello" greeting'
};

program
  .version(version);

program
  .command('greet <name>')
  .description('Displays a greeting message to <name>')
  .option(shoutOption.flag, shoutOption.description)
  .option(greetOption.flag, greetOption.description)
  .action(greet);

program.parse(process.argv);
