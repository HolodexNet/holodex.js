import { ExtraData } from '../enums/extra-data';

export interface ChannelVideosParam {
  /**
   * Comma separated list of extra info for video
   */
  include?: ExtraData[] | string;

  /**
   * A comma separated list of language codes to filter channels/clips, official streams do not follow this parameter
   */
  lang?: string | string[];

  /**
   * Results limit. Has a maximum of 50.
   */
  limit?: number;

  /**
   * Offset results
   */
  offset?: number;
}
