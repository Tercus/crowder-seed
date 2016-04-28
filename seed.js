'use strict';

//Catch electron output in virtual screen
var Xvfb = require('xvfb')
var xvfb = new Xvfb()
xvfb.startSync()

//darn webtorrent-hybrid needs that window-less mode
const WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()


var http = require('http')
var server = http.createServer(handleRequest);
server.listen(8081, (err) => {
  if (err) console.log('Error: ' + err)
  console.log('Seed has started, waiting for torrents')
})

function handleRequest(request, response){
  if (request.method === 'POST') {
    var infoHash = request.url.substring(1)
    client.add(infoHash, { path: './storage/' + infoHash + '/', announce: ['ws://localhost:8080'] })
    client.on('torrent', function () {
      console.log('new torrent added' + infoHash)
    })
  }
}
