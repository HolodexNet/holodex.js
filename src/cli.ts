#!/usr/bin/env node

import yargs from 'yargs';
import live from './cli/commands/live.js';
import { ORGS } from './types/org.js';

export interface GlobalOptions {
  json: boolean;
}

yargs(process.argv.slice(2))
  .scriptName('holodex')
  .help('help')
  .alias('help', 'h')
  .option('json', {
    alias: 'j',
    desc: 'Print JSON',
  })
  .command(
    'live [scope]',
    'Get live streams',
    (yargs) =>
      yargs.positional('scope', {
        type: 'string',
        default: 'all',
        desc: 'Search scope',
        choices: Object.keys(ORGS),
      }),
    live,
  )
  .demandCommand().argv;
