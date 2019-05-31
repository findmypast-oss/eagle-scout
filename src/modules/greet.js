'use strict';

function manageShoutFlag(name, opts) {
  if (!opts.shout) return name;

  return name.toUpperCase();
}

function manageGreetFlag(opts) {
  return opts.greeting || 'Hello';
}

module.exports = (name, opts) => {
  const greeting = manageGreetFlag(opts);
  const greetName = manageShoutFlag(name, opts);

  return `${greeting} ${greetName}`;
};
