'use strict';
const hapi = require('hapi')
const server = new hapi.Server()
const fs = require('fs')
const routes = require('./routes.js')

//Catch electron output in virtual screen
var Xvfb = require('xvfb')
var xvfb = new Xvfb()
xvfb.startSync()

//darn webtorrent-hybrid needs that window-less mode
const WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()

//Initialize hapi-server and set port
server.connection({ port: 81 })

//Initialize routes
routes.init(server, client)

//Start hapi-server or throw error on failure
server.start((err) => {
    if (err) throw err
    console.log('Server running at:', server.info.uri)
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
