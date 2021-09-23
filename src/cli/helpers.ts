import { HolodexApiClient } from '..';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ORGS } from '../types/org';
import terminalLink from 'terminal-link';
import Conf from 'conf';
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

type ToRawable = { toRaw: () => any } | { toRaw: () => any }[];

type Processor<T> = ({
  client,
  argv,
  config,
}: {
  client: HolodexApiClient;
  argv: any;
  config: Conf<Config>;
}) => Promise<T> | T;

interface Config {
  token?: string;
}

export function handlerFactory<P extends Processor<T>, T extends ToRawable>({
  processor,
  printer = console.log,
}: {
  processor: P;
  printer?: (response: T) => void;
}) {
  return async (argv: any) => {
    const formatJSON = argv.json;
    const config = new Conf<Config>();
    const client = getClient(process.env.HOLODEX_APIKEY || config.get('token'));

    const response = await Promise.resolve(processor({ client, argv, config }));

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
