import { Channel } from './channel';
import { Comment } from './comment';
import { VideoRaw } from './raw/video-raw';
import { Song } from './song';

export class Video {
  /**
   * The unique ID of the video.
   */
  public get videoId() {
    return this.raw.id;
  }

  /**
   * The video's title.
   */
  public get title() {
    return this.raw.title;
  }

  /**
   * The type of video, whether it is a stream or a clip.
   */
  public get videoType() {
    return this.raw.type;
  }

  /**
   * The internal topic ID of the video. Some videos, mostly clips, may not have a topic.
   */
  public get topic() {
    return this.raw.topic_id;
  }

  /**
   * The date the video was published at.
   */
  public get publishedAt() {
    return typeof this.raw.published_at === 'string'
      ? new Date(this.raw.published_at)
      : undefined;
  }

  /**
   * The date the video was made available. This takes on the first non-null value of {@link Video.publishedAt},
   * {@link Video.actualStart}, {@link Video.scheduledStart}, or {@link Video.actualEnd}.
   */
  public get availableAt() {
    return typeof this.raw.available_at === 'string'
      ? new Date(this.raw.available_at)
      : undefined;
  }

  /**
   * The duration of the video.
   */
  public get duration() {
    return this.raw.duration;
  }

  /**
   * The current status of the video on YouTube.
   */
  public get status() {
    return this.raw.status;
  }

  /**
   * The date when the stream started. Used with {@link ExtraData.LiveInfo}
   */
  public get scheduledStart() {
    return typeof this.raw.start_scheduled === 'string'
      ? new Date(this.raw.start_scheduled)
      : undefined;
  }

  /**
   * The date when the stream actually started. Used with {@link ExtraData.LiveInfo}
   */
  public get actualStart() {
    return typeof this.raw.start_actual === 'string'
      ? new Date(this.raw.start_actual)
      : undefined;
  }

  /**
   * The date when the stream ended. Used with {@link ExtraData.LiveInfo}
   */
  public get actualEnd() {
    return typeof this.raw.end_actual === 'string'
      ? new Date(this.raw.end_actual)
      : undefined;
  }

  /**
   * The number of people currently watching the stream. Used with {@link ExtraData.LiveInfo}
   */
  public get liveViewers() {
    return this.raw.live_viewers;
  }

  /**
   * The description of the video. Used with {@link ExtraData.Description}
   */
  public get description() {
    return this.raw.description;
  }

  /**
   * The number of tagged songs related to this video.
   */
  public get songCount() {
    return this.raw.songcount;
  }

  /**
   * The channel ID the video creator.
   */
  public get channelId() {
    return this.raw.channel_id ?? this.channel.channelId;
  }

  /**
   * The {@link Channel} object of the video creator.
   */
  public get channel() {
    return this.#channel;
  }

  /**
   * A list of comments on this video, usually with timestamps. Used when searching for a specific video.
   */
  public get comments(): Readonly<Comment[]> {
    return this.#comments;
  }

  /**
   * A list of clips related to this video. Used with {@link ExtraData.Clips}
   */
  public get clips(): Readonly<Video[]> {
    return this.#clips;
  }

  /**
   * A list of sources for videos uploaded by Subbers. Used with {@link ExtraData.Sources}. Has no effect on VTubers.
   */
  public get sources(): Readonly<Video[]> {
    return this.#sources;
  }

  /**
   * A list of videos that are referred by this video. Used with {@link ExtraData.Refers}
   */
  public get refers(): Readonly<Video[]> {
    return this.#refers;
  }

  /**
   * A list of videos that are simulcast on another channel. Used with {@link ExtraData.Simulcasts}
   */
  public get simulcasts(): Readonly<Video[]> {
    return this.#simulcasts;
  }

  /**
   * A list of channels that are mentioned by this video. Used with {@link ExtraData.Mentions}
   */
  public get mentions(): Readonly<Channel[]> {
    return this.#mentions;
  }

  /**
   * A list of songs used in this video. Used with {@link ExtraData.Songs}
   */
  public get songs(): Readonly<Song[]> {
    return this.#songs;
  }

  #channel: Channel;
  #comments: Comment[];
  #clips: Video[];
  #sources: Video[];
  #refers: Video[];
  #simulcasts: Video[];
  #mentions: Channel[];
  #songs: Song[];

  constructor(private raw: VideoRaw) {
    this.#channel = new Channel(this.raw.channel);
    this.#comments =
      this.raw.comments?.map((comment) => new Comment(comment)) ?? [];
    this.#clips = this.raw.clips?.map((video) => new Video(video)) ?? [];
    this.#sources = this.raw.sources?.map((video) => new Video(video)) ?? [];
    this.#refers = this.raw.refers?.map((video) => new Video(video)) ?? [];
    this.#simulcasts =
      this.raw.simulcasts?.map((video) => new Video(video)) ?? [];
    this.#mentions =
      this.raw.mentions?.map((channel) => new Channel(channel)) ?? [];
    this.#songs = this.raw.songs?.map((song) => new Song(song)) ?? [];
  }
}
