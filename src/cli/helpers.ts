import chalk from 'chalk';
import Conf from 'conf';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import terminalLink from 'terminal-link';
import { HolodexApiClient } from '..';
import { ORGS } from '../types/org';

dayjs.extend(relativeTime);

type ToRawable = { toRaw: () => any } | { toRaw: () => any }[];

type Context = {
  getClient: () => HolodexApiClient;
  argv: any;
  config: Conf<Config>;
};

type Processor<T> = (context: Context) => Promise<T> | T;

interface Config {
  token?: string;
}

export function handlerFactory<
  P extends Processor<T>,
  T extends ToRawable | string,
>({
  processor,
  printer = console.log,
}: {
  processor: P;
  printer?: (response: T) => void;
}) {
  return async (argv: any) => {
    const formatJSON = argv.json;
    const config = new Conf<Config>({
      projectName: 'holodex',
    });
    const getClient = getClientFactory(config);
    const context = { getClient, argv, config };

    const response = await Promise.resolve(processor(context));

    if (formatJSON) {
      if (typeof response === 'string') {
        console.log(response);
      } else if (Array.isArray(response)) {
        printAsJson(response.map((r) => r.toRaw()));
      } else {
        printAsJson(response.toRaw());
      }
      return;
    }

    printer(response);
  };
}

export function getClientFactory(config: Conf<Config>) {
  return () => {
    const apiKey = process.env.HOLODEX_APIKEY || config.get('token');
    if (!apiKey) {
      console.log(chalk.red(`$ holodex config token <apiKey>`));
      process.exit(1);
    }
    return new HolodexApiClient({ apiKey });
  };
}

export function resolveOrg(scope: string) {
  return ORGS[scope as keyof typeof ORGS] || ORGS['all'];
}

export function fromNow(date: Date | undefined) {
  return dayjs(date).fromNow();
}

export function printAsJson(obj: any) {
  console.log(JSON.stringify(obj, null, 2));
}

export function videoLink(videoId: string, title: string) {
  const ytURL = `https://www.youtube.com/watch?v=${videoId}`;
  return terminalLink(chalk.cyan.bold(title), ytURL);
}

export function channelLink(channelId: string, title: string) {
  const ytURL = `https://www.youtube.com/channel/${channelId}`;
  return terminalLink(chalk.cyan.bold(title), ytURL);
}
