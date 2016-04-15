'use strict';
module.exports = {
  load: function (request, reply) {
    const WebTorrent = require('webtorrent-hybrid')
    var client = new WebTorrent()
    
//TODO:
// - add check if torrent has already been added by another user
    if(request.method === 'get') return reply ('Wrong request method')
    if(request.params.torrent != request.payload) return reply ('Wrong request method')
    var opts = {
      path: './storage/' + request.payload + '/',
      announce: ['ws://localhost:8080']
    }
    client.add(request.payload, opts)
    client.on('error', function (err) { handleerror(err) })
    client.on('warning', function (err) { handleerror(err) })
    client.on('torrent', function(torrent){
      console.log('Added torrent: ' + torrent.infoHash)
      torrent.on('download', function (chunkSize) {
        console.log('progress: ' + (torrent.progress * 100).toFixed(2) + '%')
      })
      torrent.on('done', function () {
        reply('done')
      })
    })

    function handleerror (err) {
      if(err) {
        console.log(err)
        return reply (err)
      }
    }

  }
}
