import { strict as assert } from 'assert';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import querystring from 'querystring';
import { Channel } from './types';
import { SortOrder } from './types/enums/sort-order';
import { ChannelsParam } from './types/params/channels-param';
import { Options } from './types/params/options';
import { ChannelRaw } from './types/raw/channel-raw';

export class HolodexApiClient {
  private httpClient: AxiosInstance;

  constructor(options: Partial<Options>) {
    options.url ??= 'https://holodex.net/api/v2';

    assert.ok(typeof options.apiKey === 'string', 'apiKey not provided.');

    this.httpClient = axios.create({
      baseURL: options.url,
      headers: {
        'X-APIKEY': options.apiKey,
      },
    });
    axiosRetry(this.httpClient, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.code === 'ECONNABORTED',
      shouldResetTimeout: true,
    });
  }

  async getChannels(params: ChannelsParam) {
    params.limit ??= 25;
    params.offset ??= 0;
    params.order ??= SortOrder.Ascending;
    params.sort ??= 'org';

    const q = querystring.stringify({
      ...params,
      limit: Math.min(Math.max(params.limit, 1), 50),
    });
    const { data } = await this.httpClient.get<ChannelRaw[]>(`/channels?${q}`);
    return data.map((channel) => new Channel(channel));
  }
}
