import dotenv from 'dotenv';
import { HolodexApiClient } from '../client';
import { VideoSearchType } from '../types/enums/video-search-type';
import { VideoType } from '../types/enums/video-type';

describe('Videos', () => {
  let client: HolodexApiClient;

  beforeAll(async () => {
    dotenv.config();
    client = new HolodexApiClient({
      apiKey: process.env.APIKEY,
    });
  });

  describe('#getVideo()', () => {
    it('should work', () =>
      expect(client.getVideo('jdio7hLzy3w')).resolves.toMatchObject({
        videoId: 'jdio7hLzy3w',
      }));
  });

  describe('#getVideosByChannelId()', () => {
    it('query videos', () =>
      expect(
        client.getVideosByChannelId('UC-hM6YJuNYVAmUWxeIr9FeA'),
      ).resolves.toContainEqual(
        expect.objectContaining({
          channel: expect.objectContaining({
            channelId: expect.stringMatching('UC-hM6YJuNYVAmUWxeIr9FeA'),
          }),
          videoType: expect.stringMatching('stream'),
        }),
      ));

    it('query clips', () =>
      expect(
        client.getVideosByChannelId(
          'UC-hM6YJuNYVAmUWxeIr9FeA',
          VideoSearchType.Clips,
        ),
      ).resolves.toContainEqual(
        expect.objectContaining({
          channel: expect.objectContaining({
            channelType: expect.stringMatching('subber'),
          }),
          videoType: expect.stringMatching('clip'),
        }),
      ));
  });

  describe('#getVideos()', () => {
    it('should work', () =>
      expect(client.getVideos()).resolves.toHaveLength(25));

    it('query Hololive', () =>
      expect(
        client.getLiveVideos({
          org: 'Hololive',
          type: VideoType.Stream,
        }),
      ).resolves.toContainEqual(
        expect.objectContaining({
          channel: expect.objectContaining({
            organization: expect.stringMatching('Hololive'),
          }),
          videoType: expect.stringMatching('stream'),
        }),
      ));
  });
});
