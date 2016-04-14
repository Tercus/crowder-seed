'use strict';
const hapi = require('hapi')
const hserver = new hapi.Server()
const fs = require('fs')

//Catch electron output in virtual screen
var Xvfb = require('xvfb')
var xvfb = new Xvfb()
xvfb.startSync()

//darn webtorrent-hybrid needs that window-less mode
const WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()

//Initialize hapi-server and set port
hserver.connection({ port: 81 })

//Initialize routes
hserver.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
      reply(client.torrents)
    }
})

hserver.route({
  method: 'POST',
  path: '/download/{torrent}',
  handler: function (request, reply) {
      //Start downloading the file
      reply('Hello!' + encodeURIComponent(request.params.torrent))
    }
})

//Start hapi-server or throw error on failure
hserver.start((err) => {
    if (err) throw err
    console.log('Server running at:', hserver.info.uri)
})
 /* Future code to start seeding files. Maybe it is enough to just run through all the folders instead of also checking the DB
var file = "test.db"
var db = new sqlite3.Database(file)
db.serialize(function() {
  db.run("CREATE TABLE if not exists videos (infoHash TEXT, UID INT, title TEXT, desc TEXT, date INT)")
  db.each("SELECT infoHash FROM videos", function (err, row) {
    fs.readdir('./storage/' + row.infoHash + '/', function(err, files){
      //TODO:
      // - Fix this. Right now the CPU usage jumps to 100%
      // - This will be fixed with an update of webtorrent
      //client.seed('./storage/' + row.infoHash + '/' + files[0], { announceList: [['ws://localhost:8080']] })
    })
  })
})
db.close()
*/
