import { ORGS } from '../../types/org';
import { fromNow, getClient, printAsJson } from '../helpers';
import chalk from 'chalk';
import terminalLink from 'terminal-link';

export default async function live(argv: any) {
  const jsonOutput = argv.json;
  const scope = argv.scope as keyof typeof ORGS;

  const org = ORGS[scope] || ORGS['all'];

  const client = getClient();

  let videos = await client.getLiveVideos({ org });

  if (jsonOutput) {
    return printAsJson(videos.map((video) => video.toRaw()));
  }

  for (const video of videos) {
    console.log(
      terminalLink(
        chalk.cyan.bold(video.title),
        `https://www.youtube.com/watch?v=${video.videoId}`,
      ),
    );
    console.log(chalk.gray(fromNow(video.scheduledStart)));
  }
}
