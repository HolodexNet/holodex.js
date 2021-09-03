import chalk from 'chalk';
import { CommandModule } from 'yargs';
import { ORGS } from '../../types/org';
import { Video } from '../../types/video';
import { fromNow, handlerFactory, resolveOrg, videoLink } from '../helpers';

const handler = handlerFactory(
  async ({ client, argv }) => {
    const org = resolveOrg(argv.scope);
    const videos = await client.getLiveVideos({ org });
    return videos;
  },
  (videos: Video[]) => {
    for (const video of videos) {
      console.log(videoLink(video.videoId, video.title));
      console.log(chalk.gray(fromNow(video.scheduledStart)));
    }
  },
);

const command: CommandModule = {
  command: 'live [scope]',
  describe: 'Get live streams',
  builder: (yargs) =>
    yargs.positional('scope', {
      type: 'string',
      default: 'all',
      desc: 'Search scope',
      choices: Object.keys(ORGS),
    }),
  handler,
};

export default command;
