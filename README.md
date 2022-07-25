# webtorrent-example
This application is used for learning means and as prototype.

### Start seeding
This is an initial seeder. After there is already one started, only peers are needed to support the system. It can be stopped after one peer already downloaded the video.

```
npm run start:server
```

The seeder starts to seed *data/default/video.js*. The magnet link is everytime the same:

```
magnet:?xt=urn:btih:c2522b78cf8ee0f50efc99af0e3d6f6ac172b34b&dn=video.mp4&tr=http%3A%2F%2F188.187.45.218%3A6969%2F
```

To test that it works fine with any torrent client, developer can use any of available in the internet, e.g. µTorrent, Bittorent. To watch the video while it is downloading, I personally recommend to use https://ferrolho.github.io/magnet-player/. For this prototype it is more than enough.

### Init new peer
Peer is automatically converted to seeder after download finished. Magnet links remains the same, so if initial seeder disappears, the video will be still available for download via the same one.

```
npm run start:peer
```

### Keep in mind
1. Each local peer downloads the video and puts it in their PEER_ID folder, so the consumed size will grow with each peer launched. After tests are finished, don't forgot to rimraf.
2. I used my own Bittorent tracker for my purposes. Replace it in the source on next lines:
https://github.com/shpingalet007/webtorrent-example/blob/2d14709fab9f1ca7075b4f4e82538d0e3e581dc0/script.js#L18
https://github.com/shpingalet007/webtorrent-example/blob/2d14709fab9f1ca7075b4f4e82538d0e3e581dc0/script.js#L28
