'use strict';
module.exports = {
  init: function (server, client) {
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply(client.torrents)
      }
    })
    server.route({
      method: 'POST',
      path: '/{torrent}',
      handler: require('./download.js').load
    })
  }
}
