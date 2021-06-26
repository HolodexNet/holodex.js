import { CommentRaw } from './raw/comment-raw';

export class Comment {
  /**
   * The unique key associated with the comment.
   */
  public get key() {
    return this.raw.comment_key;
  }

  /**
   * The video ID the comment is linked to.
   */
  public get videoId() {
    return this.raw.video_id;
  }

  /**
   * The message content of the comment. Usually contains timestamps.
   */
  public get content() {
    return this.raw.message;
  }

  constructor(private raw: CommentRaw) {}
}
