'use strict';

//Catch electron output in virtual screen
var Xvfb = require('xvfb')
var xvfb = new Xvfb()
xvfb.startSync()

//darn webtorrent-hybrid needs that window-less mode
const WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()
console.log('started the server, waiting for torrents')



var http = require('http')
var server = http.createServer(handleRequest);
server.listen(8081, (err) => {  if (err) console.log('Error: ' + err) })

function handleRequest(request, response){
  if (request.method === 'POST') {
    console.log(request.url)
    var infoHash = request.url.substring(1)
    console.log(infoHash)
    client.add(infoHash, { path: './storage/' + infoHash + '/', announce: ['ws://localhost:8080'] })
    client.on('torrent', function () {
      console.log('new torrent added')
    })
  }
}
