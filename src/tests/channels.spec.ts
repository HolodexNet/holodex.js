import dotenv from 'dotenv';
import { HolodexApiClient } from '../client';

describe('Channels', () => {
  let client: HolodexApiClient;

  beforeAll(async () => {
    dotenv.config();
    client = new HolodexApiClient({
      apiKey: process.env.APIKEY,
    });
  });

  describe('#getChannels()', () => {
    it('should work', () =>
      expect(client.getChannels()).resolves.toHaveLength(25));

    it('query Hololive', () =>
      expect(
        client.getChannels({
          org: 'Hololive',
        }),
      ).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            organization: expect.stringMatching('Hololive'),
          }),
        ]),
      ));
  });

  describe('#getChannel()', () => {
    it('should work', () =>
      expect(
        client.getChannel('UC-hM6YJuNYVAmUWxeIr9FeA'),
      ).resolves.toMatchObject({
        channelId: 'UC-hM6YJuNYVAmUWxeIr9FeA',
      }));
  });
});
