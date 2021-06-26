/**
 * A enum that provides different search types when retrieving videos.
 */
export const enum VideoSearchType {
  /**
   * Retrieve clips including a VTuber
   */
  Clips = "clips",

  /**
   * Retrieve videos uploaded by a Channel
   */
  Videos = "videos",

  /**
   * Retrieve videos that mention a Channel
   */
  Collabs = "collabs",
}
