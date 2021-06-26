import { SortOrder } from '../enums/sort-order';
import { ChannelRaw } from '../raw/channel-raw';

export interface ChannelsParam {
  /**
   * Comma separated list of languages. Language is a property of Channel, so only Channels satisfying the language will be returned. Leave empty to search for Vtubers and/or all clippers.
   */
  lang?: string;

  /**
   * Results limit. Has a maximum of 50.
   */
  limit?: number;

  /**
   * Offset results
   */
  offset?: number;

  /**
   * ASC or DESC order, default asc.
   */
  order?: SortOrder;

  /**
   * If set, filter for Vtuber belonging to a specific org
   */
  org?: string;

  /**
   * Column to sort on, leave default to use 'org' as sort. Any first level property of channel should work here.
   */
  sort?: keyof ChannelRaw & string;

  /**
   * Type of Channel, whether it's a vtuber or a subber. Leave unset to query all.
   */
  type?: string;
}
