/**
 * A enum which contains strings that allow extra data to be returned when requesting videos.
 */
export const enum ExtraData {
  /**
   * Include clips using the videos.
   */
  Clips = 'clips',

  /**
   * Include videos that refer to other videos.
   */
  Refers = 'refers',

  /**
   * Include sources for videos created by Subbers.
   */
  Sources = 'sources',

  /**
   * Include simulcast videos alongside the videos.
   */
  Simulcasts = 'simulcasts',

  /**
   * Include channels that are mentioned.
   */
  Mentions = 'mentions',

  /**
   * Include video descriptions.
   */
  Description = 'description',

  /**
   * Include live streams.
   */
  LiveInfo = 'live_info',

  /**
   * Include channel stats.
   */
  ChannelStats = 'channel_stats',

  /**
   * Include any songs used in the videos.
   */
  Songs = 'songs',
}
