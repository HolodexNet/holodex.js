# Holodex API client
[![NPM](https://nodeico.herokuapp.com/@stu43005/holodex-api.svg)](https://npmjs.com/package/@stu43005/holodex-api)

A Javascript library for the [Holodex API](https://holodex.stoplight.io/).

## Installing

Using npm:

```
$ npm install @stu43005/holodex-api
```

## Getting Started

```js
import { HolodexApiClient } from '@stu43005/holodex-api';

const client = new HolodexApiClient({
  apiKey: '' // Provide your personal API KEY. You can acquire a API KEY via the Account Settings page.
});

// Get Usada Pekora's channel info
client.getChannel('UC1DCedRgGHBdm81E1llLhOQ')
  .then(function (channel) {
    // handle result
    console.log(channel.name); // Pekora Ch. 兎田ぺこら
    console.log(channel.englishName); // Usada Pekora
    console.log(channel.subscriberCount); // 1540000
  });

// Get Hololive's stream
client.getLiveVideos({ org: 'Hololive' })
  .then(function (videos) {
    // handle result
    console.log(videos);
  });
```

## Documentation

Documentation can be found [here](https://stu43005.github.io/holodex-api/index.html).

## License

[MIT](./LICENSE)
