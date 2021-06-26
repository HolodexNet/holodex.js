import dotenv from 'dotenv';
import { HolodexApiClient } from '../client';

describe('Lives', () => {
  let client: HolodexApiClient;

  beforeAll(async () => {
    dotenv.config();
    client = new HolodexApiClient({
      apiKey: process.env.APIKEY,
    });
  });

  describe('#getLiveVideosByChannelId()', () => {
    it('should work', () => expect(client.getLiveVideosByChannelId('UC-hM6YJuNYVAmUWxeIr9FeA')).resolves.toContainEqual(
      expect.objectContaining({
        channel: expect.objectContaining({
          channelId: expect.stringMatching('UC-hM6YJuNYVAmUWxeIr9FeA'),
        }),
        videoType: expect.stringMatching('stream'),
      })
    ));
  });

  describe('#getLiveVideos()', () => {
    it('should work', () => expect(client.getLiveVideos()).resolves.toContainEqual(
      expect.objectContaining({
        videoType: expect.stringMatching('stream'),
      })
    ));

    it('query Hololive', () => expect(client.getLiveVideos({
      org: 'Hololive',
    })).resolves.toContainEqual(
      expect.objectContaining({
        channel: expect.objectContaining({
          organization: expect.stringMatching('Hololive'),
        }),
        videoType: expect.stringMatching('stream'),
      })
    ));
  });
});
