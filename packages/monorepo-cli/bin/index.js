#!/usr/bin/env node

const yargs = require('yargs');
const { flow } = require('lodash');
const { hoistLocal } = require('../src/package');

async function main() {
  await yargs
    .command('package', 'Package', (packageYargs) => {
      return flow([addHoistLocal])(packageYargs).demandCommand();
    })
    .demandCommand()
    .strict()
    .help().argv;
}

/**
 *
 * @param {yargs.Argv<{}>} packageYargs
 * @returns {yargs.Argv<{}>}
 */
function addHoistLocal(packageYargs) {
  return packageYargs.command(
    'hoist-local',
    'Hoist local packages',
    {},
    hoistLocal
  );
}

/* eslint-disable-next-line @typescript-eslint/no-floating-promises */
main();
