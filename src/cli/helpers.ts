import { HolodexApiClient } from '..';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ORGS } from '../types/org';
import terminalLink from 'terminal-link';
import chalk from 'chalk';

dayjs.extend(relativeTime);

export function videoLink(videoId: string, title: string) {
  const ytURL = `https://www.youtube.com/watch?v=${videoId}`;
  return terminalLink(chalk.cyan.bold(title), ytURL);
}

export function channelLink(channelId: string, title: string) {
  const ytURL = `https://www.youtube.com/channel/${channelId}`;
  return terminalLink(chalk.cyan.bold(title), ytURL);
}

export function handlerFactory(
  processor: ({
    client,
    argv,
  }: {
    client: HolodexApiClient;
    argv: any;
  }) => any = (...args: any) => args,
  printer: any = console.log,
) {
  return async (argv: any) => {
    const formatJSON = argv.json;
    const token = argv.token;
    const client = getClient(token || process.env.HOLODEX_APIKEY);

    const response = await Promise.resolve(processor({ client, argv }));

    if (formatJSON) {
      if (Array.isArray(response)) {
        printAsJson(response.map((r) => r.toRaw()));
      } else {
        printAsJson(response.toRaw());
      }
      return;
    }

    printer(response);
  };
}

export function resolveOrg(scope: string) {
  return ORGS[scope as keyof typeof ORGS] || ORGS['all'];
}

export function getClient(apiKey?: string) {
  return new HolodexApiClient({ apiKey });
}

export function fromNow(date: Date | undefined) {
  return dayjs(date).fromNow();
}

export function printAsJson(obj: any) {
  console.log(JSON.stringify(obj, null, 2));
}
