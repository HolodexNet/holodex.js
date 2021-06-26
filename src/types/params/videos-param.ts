import { ExtraData } from "../enums/extra-data";
import { SortOrder } from "../enums/sort-order";
import { VideoStatus } from "../enums/video-status";
import { VideoType } from "../enums/video-type";
import { VideoRaw } from "../raw";

export interface VideosParam {
  /**
   * Filter by video uploader channel id
   */
  channel_id?: string;

  /**
   * A single Youtube Video ID. If Specified, only this video can be returned (may be filtered out by other conditions though)
   */
  id?: string;

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
   * Number of maximum hours upcoming to get upcoming videos by (for rejecting waiting rooms that are two years out)
   */
  max_upcoming_hours?: number;

  /**
   * Filter by mentioned channel id, excludes itself. Generally used to find collabs/clips that include the requested channel
   */
  mentioned_channel_id?: string;

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
   * Sort by any returned video field
   */
  sort?: keyof VideoRaw & string;

  /**
   * Filter by video status
   */
  status?: VideoStatus;

  /**
   * Filter by video topic id
   */
  topic?: string;

  /**
   * Filter by type of video
   */
  type?: VideoType;
}
