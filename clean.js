const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ memes: []}).write()

console.log(db.get('memes').size().value());

const newPlaylist = db.get('memes').uniqBy('link').value()

db.set('clean', newPlaylist).write()

console.log(db.get('clean').size().value());