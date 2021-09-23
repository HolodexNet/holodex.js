#!/usr/bin/env node

import yargs from 'yargs';
import channel from './cli/commands/channel.js';
import live from './cli/commands/live.js';
import video from './cli/commands/video.js';
import config from './cli/commands/config.js';

export interface GlobalOptions {
  json: boolean;
  token?: string;
}

yargs(process.argv.slice(2))
  .scriptName('holodex')
  .help('help')
  .alias('help', 'h')
  .option('json', {
    alias: 'j',
    desc: 'Print JSON',
  })
  .option('token', {
    type: 'string',
    alias: 't',
    desc: 'API Token',
  })
  .command(live)
  .command(channel)
  .command(video)
  .command(config)
  .demandCommand().argv;
