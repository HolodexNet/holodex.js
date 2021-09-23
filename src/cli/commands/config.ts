import * as chalk from 'chalk';
import { CommandModule } from 'yargs';
import { Channel } from '../../types/channel';
import { channelLink, handlerFactory } from '../helpers';

const handler = handlerFactory({
  processor: async ({ argv, config }) => {
    const { key, value } = argv;
    if (!value) {
      return config.get(key);
    }
    config.set(key, value);
    return `Set: ${key} = ${value}`;
  },
});

const command: CommandModule = {
  command: 'config <key> [<value>]',
  describe: 'Get/set config value',
  builder: (yargs) =>
    yargs
      .positional('key', {
        type: 'string',
        required: true,
        desc: 'Config key',
      })
      .positional('value', {
        type: 'string',
        desc: 'Config value',
      }),
  handler,
};

export default command;
