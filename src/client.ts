import { strict as assert } from 'assert';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import querystring from 'querystring';
import {
  Channel,
  ChannelRaw,
  ChannelsParam,
  ChannelVideosParam,
  Options,
  SortOrder,
  Video,
  VideoRaw,
  VideoSearchType,
  VideosParam,
} from './types';

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

  /**
   * Retrieves a list of channels that match the given parameters.
   * @param params See {@link ChannelsParam}
   */
  async getChannels(params: ChannelsParam = {}) {
    params.limit ??= 25;
    params.offset ??= 0;
    params.order ??= SortOrder.Ascending;
    params.sort ??= 'org';
    if (params.lang && Array.isArray(params.lang)) {
      params.lang = params.lang.join(',');
    }

    const q = querystring.stringify({
      ...params,
      limit: Math.min(Math.max(params.limit, 1), 50),
    });
    const { data } = await this.httpClient.get<ChannelRaw[]>(`/channels?${q}`);
    return data.map((channel) => new Channel(channel));
  }

  /**
   * Retrieves a single channel.
   * @param channelId ID of the Youtube Channel that is being queried
   */
  async getChannel(channelId: string) {
    const { data } = await this.httpClient.get<ChannelRaw>(
      `/channels/${channelId}`,
    );
    return new Channel(data);
  }

  /**
   * A simplified endpoint for access channel specific data.
   * @param channelId ID of the Youtube Channel that is being queried
   * @param searchType The type of video resource to fetch. `clips` finds clip videos of a vtuber channel, `videos` finds the channelId channel's uploads, and `collabs` finds videos uploaded by other channels that mention this channelId
   * @param params See {@link ChannelVideosParam}
   */
  async getVideosByChannelId(
    channelId: string,
    searchType = VideoSearchType.Videos,
    params: ChannelVideosParam = {},
  ) {
    params.lang ??= 'all';
    params.limit ??= 25;
    params.offset ??= 0;

    const q = querystring.stringify({
      ...params,
      include: Array.isArray(params.include)
        ? params.include.join(',')
        : params.include,
      lang: Array.isArray(params.lang) ? params.lang.join(',') : params.lang,
      limit: Math.min(Math.max(params.limit, 1), 50),
    });
    const { data } = await this.httpClient.get<VideoRaw[]>(
      `/channels/${channelId}/${searchType}?${q}`,
    );
    return data.map((video) => new Video(video));
  }

  /**
   * Retrieves a video object.
   * @param videoId ID of a Youtube Video
   * @param includeComments if true then will reply with timestamp comments for this video
   * @param languages A comma separated list of language codes to filter channels/clips, official streams do not follow this parameter
   */
  async getVideo(
    videoId: string,
    includeComments = false,
    languages?: string[] | string,
  ) {
    languages ??= 'all';

    const params: any = {
      lang: Array.isArray(languages) ? languages.join(',') : languages,
    };
    if (includeComments) {
      params.c = 1;
    }

    const q = querystring.stringify(params);
    const { data } = await this.httpClient.get<VideoRaw>(
      `/videos/${videoId}?${q}`,
    );
    return new Video(data);
  }

  /**
   * This endpoint is similar to the /live endpoint and usually replies much faster. It is more friendly in general. The cost to execute a lookup is significantly cheaper. It's unfortunately less customizable as a result.
   *
   * We recommends using this if you have a fixed set of channel IDs to look up status for.
   *
   * @param channelIds comma separated Youtube Channel IDs
   */
  async getLiveVideosByChannelId(channelIds: string | string[]) {
    const q = querystring.stringify({
      channels: Array.isArray(channelIds) ? channelIds.join(',') : channelIds,
    });
    const { data } = await this.httpClient.get<VideoRaw[]>(`/users/live?${q}`);
    return data.map((video) => new Video(video));
  }

  /**
   * Retrieve all live streams for the given paramaters.
   *
   * This is somewhat similar to calling `getVideos`, but this endpoint imposes default values on the query parameters.
   *
   * @param params See {@link VideosParam}
   */
  async getLiveVideos(params: VideosParam = {}) {
    params.lang ??= 'all';
    params.offset ??= 0;

    const q = querystring.stringify({
      ...params,
      include: Array.isArray(params.include)
        ? params.include.join(',')
        : params.include,
      lang: Array.isArray(params.lang) ? params.lang.join(',') : params.lang,
    });
    const { data } = await this.httpClient.get<VideoRaw[]>(`/live?${q}`);
    return data.map((video) => new Video(video));
  }

  /**
   * Retrieve videos matching the given parameters.
   *
   * @param params See {@link VideosParam}
   */
  async getVideos(params: VideosParam = {}) {
    params.lang ??= 'all';
    params.limit ??= 25;
    params.offset ??= 0;
    params.order ??= SortOrder.Descending;
    params.sort ??= 'available_at';

    const q = querystring.stringify({
      ...params,
      include: Array.isArray(params.include)
        ? params.include.join(',')
        : params.include,
      lang: Array.isArray(params.lang) ? params.lang.join(',') : params.lang,
      limit: Math.min(Math.max(params.limit, 1), 50),
    });
    const { data } = await this.httpClient.get<VideoRaw[]>(`/videos?${q}`);
    return data.map((video) => new Video(video));
  }
}
