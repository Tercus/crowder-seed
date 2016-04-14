'use strict';
module.exports = {
  load: function (request, reply) {
    reply('Will do: ' + encodeURIComponent(request.params.torrent))
    //TODO:
    // - download the torrent
    // - return meaningful reply
  }
}
