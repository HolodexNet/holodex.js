# holodex.js

[![NPM](https://nodeico.herokuapp.com/holodex.js.svg)](https://npmjs.com/package/holodex.js)

A Javascript library for [Holodex API](https://holodex.stoplight.io/).

## Install

Using npm:

```bash
npm install holodex.js
```

## Usage

### API

```js
import { HolodexApiClient } from 'holodex.js';

const client = new HolodexApiClient({
  apiKey: '', // Provide your personal API KEY. You can acquire a API KEY via the Account Settings page.
});

// Get Usada Pekora's channel info
client.getChannel('UC1DCedRgGHBdm81E1llLhOQ').then(function (channel) {
  // handle result
  console.log(channel.name); // Pekora Ch. 兎田ぺこら
  console.log(channel.englishName); // Usada Pekora
  console.log(channel.subscriberCount); // 1540000
});

// Get Hololive's stream
client.getLiveVideos({ org: 'Hololive' }).then(function (videos) {
  // handle result
  console.log(videos);
});
```

### CLI

```bash
holodex live # => get live streams of all vtubers
holodex live hololive # => get live streams from hololive talents
holodex live hololive --json # => get hololive streams in JSON format
holodex live nijisanji --json | jq -r '[.[] | {title: .title, url: ("https://www.youtube.com/watch?v="+.id)}]' # => get a list of nijisanji streams as {title: string, url: string} object in JSON format
```

## Documentation

Documentation can be found [here](https://holodexnet.github.io/holodex.js/).

## License

[MIT](./LICENSE)
