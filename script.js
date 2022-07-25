import fs from "fs";
import * as path from "path";
import WebTorrent from 'webtorrent-hybrid';
import parseTorrent from 'parse-torrent';

const args = process.argv.slice(2);

let peerId = 'default';

if (args[0] === '--peer') {
  peerId = Math.floor(Math.random() * 10000);
}

const client = new WebTorrent();

function seedFile(path, fileName, webSeed) {
  const readable = fs.createReadStream(path);
  client.seed(readable, { name: fileName, announce: ['http://188.187.45.218:6969/'] }, (torrent) => {
    torrent.addWebSeed(webSeed);

    console.log(torrent.magnetURI);
  })
}

const targetName = 'video.mp4';
const targetFile = `./data/${peerId}`;
const targetPath = path.join(targetFile, targetName);
const targetMagnet = 'magnet:?xt=urn:btih:c2522b78cf8ee0f50efc99af0e3d6f6ac172b34b&dn=video.mp4&tr=http%3A%2F%2F188.187.45.218%3A6969%2F';

const parsedMagnet = parseTorrent(targetMagnet);
const announceList = parsedMagnet.announce;
const webSeed = parsedMagnet.urlList[0];

if (fs.existsSync(targetPath)) {
  console.log('File found, start seeding');

  seedFile(targetPath, targetName, webSeed);
} else {
  console.log('File not found, start downloading');

  client.add(targetMagnet, {
    path: targetFile,
    name: targetName,
    announce: announceList,
  },(torrent) => {
    torrent.on('done', () => {
      console.log('Download finished');
      torrent.destroy();

      const readable = fs.createReadStream(targetPath);

      client.seed(readable, {
        name: targetName,
        announce: announceList,
      }, (torrent) => {
        torrent.addWebSeed(webSeed);

        console.log('Start seeding', torrent.magnetURI);
      });
    });
  });
}


