import { ChannelType } from '../enums/channel-type';

export interface ChannelRaw {
  id: string;
  name: string;
  english_name?: string;
  type: ChannelType;
  org?: string;
  suborg?: string;
  group?: string;
  photo?: string;
  banner?: string;
  twitter?: string;
  video_count?: string;
  subscriber_count?: string;
  view_count?: string;
  clip_count?: number;
  lang?: string;
  published_at?: string;
  inactive: boolean;
  description: string;
}
