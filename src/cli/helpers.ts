import { HolodexApiClient } from '..';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function fromNow(date: Date | undefined) {
  return dayjs(date).fromNow();
}

export function printAsJson(obj: any) {
  console.log(JSON.stringify(obj, null, 2));
}

export function getClient() {
  const client = new HolodexApiClient({
    apiKey: process.env.HOLODEX_APIKEY,
  });
  return client;
}
