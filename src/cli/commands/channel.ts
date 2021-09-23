import chalk from 'chalk';
import { CommandModule } from 'yargs';
import { Channel } from '../../types/channel';
import { channelLink, handlerFactory } from '../helpers';

const handler = handlerFactory({
  processor: async ({ client, argv }) => {
    const id = argv.id;
    const channel = await client.getChannel(id);
    return channel;
  },
  printer: (channel: Channel) => {
    console.log(channelLink(channel.channelId, channel.name));
    console.log(chalk.gray(channel.description?.slice(0, 120), '...'));
  },
});

const command: CommandModule = {
  command: 'channel <id>',
  describe: 'Get channel info',
  builder: (yargs) =>
    yargs.positional('id', {
      type: 'string',
      required: true,
      desc: 'Channel id',
    }),
  handler,
};

export default command;
