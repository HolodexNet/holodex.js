import { VideoStatus } from '../enums/video-status';
import { VideoType } from '../enums/video-type';
import { ChannelRaw } from './channel-raw';
import { CommentRaw } from './comment-raw';
import { SongRaw } from './song-raw';

export interface VideoRaw {
  id: string;
  title: string;
  type: VideoType;
  /**
   * corresponds to a Topic ID, Videos of type `clip` cannot not have topic.
   * Streams may or may not have topic.
   * @example "minecraft"
   */
  topic_id?: string;
  published_at?: string;
  /**
   * Takes on the first non-null value of end_actual, start_actual, start_scheduled, or published_at
   */
  available_at: string;
  /**
   * Duration of the video in seconds
   */
  duration: number;
  status: VideoStatus;
  /**
   * Included when includes contains 'live_info'
   */
  start_scheduled?: string;
  /**
   * Included when includes contains 'live_info'
   */
  start_actual?: string;
  /**
   * Included when includes contains 'live_info'
   */
  end_actual?: string;
  /**
   * Included when includes contains 'live_info'
   */
  live_viewers?: number;
  /**
   * Included when includes contains 'description'
   */
  description?: string;
  /**
   * Number of tagged songs for this video
   */
  songcount?: number;
  channel_id?: string;

  channel: ChannelRaw;

  /**
   * Included when 'includes' contains 'clips'
   */
  clips?: VideoRaw[];

  /**
   * Included when 'includes' contains 'sources'
   */
  sources?: VideoRaw[];

  /**
   * Included when 'includes' contains 'refers'
   */
  refers?: VideoRaw[];

  /**
   * Included when 'includes' contains 'simulcasts'
   */
  simulcasts?: VideoRaw[];

  /**
   * VTubers mentioned by this video, Included when 'includes' contains 'mentions'
   */
  mentions?: ChannelRaw[];

  comments?: CommentRaw[];
  songs?: SongRaw[];
}
