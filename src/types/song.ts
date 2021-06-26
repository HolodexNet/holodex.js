import { SongRaw } from './raw/song-raw';

export class Song {
  /**
   * The URL of the cover art.
   */
  public get artUrl() {
    return this.raw.art;
  }

  /**
   * The name of the song.
   */
  public get name() {
    return this.raw.name;
  }

  /**
   * The time in the associated {@link Video} where the song began.
   */
  public get startTime() {
    return this.raw.start;
  }

  /**
   * The time in the associated {@link Video} where the song ended.
   */
  public get endTime() {
    return this.raw.end;
  }

  /**
   * The unique ID of the song on iTunes, if it is on iTunes.
   */
  public get iTunesId() {
    return this.raw.itunesid;
  }

  /**
   * The original artist who created/sang the song.
   */
  public get artist() {
    return this.raw.original_artist;
  }

  constructor(private raw: SongRaw) {}
}
