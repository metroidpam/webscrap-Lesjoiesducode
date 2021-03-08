const link = "https://lesjoiesducode.fr/random"
const { http, https } = require('follow-redirects');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ memes: []}).write()

start(link);

function start(link) {
  let c = https.request(link, response => {
    resCour = response.responseUrl
    require('https').get(response.responseUrl, (res) => {
      res.setEncoding('utf8');
      let text = ""
      res.on('data', function (body) {
          text += body;
      });
      res.on('end', () => {
        let l = getLink(text);
        if(l.includes("https"))
          db.get('memes').push({title:getTitle(text), link:l, sent:false}).write()
        start(link)
      })
    });
  });
  c.end();
}

function getTitle(x) {
  return x.substring(x.search(/<title>/,x)+7, x.search(/ [|].*<\/title>/ig,x)).replace('&rsquo;', '\'').replace(/\n/g, "");
}

function getLink(x) {
  return x.substring(x.search(/<object\ndata=/, x)+13, x.search(/ type=image\/gif>/,x));
}