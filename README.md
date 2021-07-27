# Holodex API client
[![NPM](https://nodeico.herokuapp.com/holodex.js.svg)](https://npmjs.com/package/holodex.js)

A Javascript library for the [Holodex API](https://holodex.stoplight.io/).

## Installing

Using npm:

```
$ npm install holodex.js
```

## Getting Started

```js
import { HolodexApiClient } from 'holodex.js';

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

Documentation can be found [here](https://holodexnet.github.io/holodex.js/).

## License

[MIT](./LICENSE)
