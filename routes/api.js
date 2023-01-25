//―――――――――――――――――――――――――――――――――――――――――― ┏  Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

require('../settings')
const express = require('express')
const translate = require('translate-google')
const alip = require("../lib/listdl")
const textto = require('soundoftext-js')
const googleIt = require('google-it')
const { shortText } = require("limit-text-js")
const Canvas = require('canvas')
const TinyURL = require('tinyurl');
const emoji = require("emoji-api");
const isUrl = require("is-url")
const { ytMp4, ytMp3 } = require('../lib/y2mate')
const BitlyClient = require('bitly').BitlyClient
const canvasGif = require('canvas-gif')
const { convertStringToNumber } = require('convert-string-to-number');
const isImageURL = require('image-url-validator').default
const { fetchJson, getBuffer } = require('../lib/myfunc')
const Canvacord = require("canvacord");
const isNumber = require('is-number');
const User = require('../model/user');
const dataweb = require('../model/DataWeb');
const router = express.Router()
const scr = require('@bochilteam/scraper')

var axios = require('axios');
var qs = require('qs');
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

//―――――――――――――――――――――――――――――――――――――――――― ┏  Function ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

async function cekKey(req, res, next) {
  var apikey = req.query.apikey
  if (!apikey) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter apikey" })

  let db = await User.findOne({ apikey: apikey });
  if (db === null) {
    return res.json({ status: false, creator: `${creator}`, message: "[!] apikey tidak ada" })
  } else if (!db.isVerified) {
    return res.json({ status: false, creator: `${creator}`, message: "[!] harap verifikasi email terlebih dahulu sebelum menggunakan apikey" })
  } else if (db.limitApikey === 0) {
    return res.json({ status: false, creator: `${creator}`, message: "[!] apikey sudah habis" })
  } else {
    return next();
  }
}

async function limitapikey(apikey) {
  await dataweb.updateOne({}, { $inc: { RequestToday: 1 } })
  await User.findOneAndUpdate({ apikey: apikey }, { $inc: { limitApikey: -1 } }, { upsert: true, new: true })
}


//―――――――――――――――――――――――――――――――――――――――――― ┏  Cecan  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/cecan/china', cekKey, async (req, res, next) => {
  limitapikey(req.query.apikey)
  fetch(encodeURI(`https://github.com/zeroonecraft/data-gabut/raw/main/cecan/china.json`))
    .then(response => response.json())
    .then(data => {
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/cecan/vietnam', cekKey, async (req, res, next) => {
  limitapikey(req.query.apikey)
  fetch(encodeURI(`https://github.com/zeroonecraft/data-gabut/raw/main/cecan/vietnam.json`))
    .then(response => response.json())
    .then(data => {
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/cecan/thailand', cekKey, async (req, res, next) => {
  limitapikey(req.query.apikey)
  fetch(encodeURI(`https://github.com/zeroonecraft/data-gabut/raw/main/cecan/thailand.json`))
    .then(response => response.json())
    .then(data => {
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/cecan/indonesia', cekKey, async (req, res, next) => {
  limitapikey(req.query.apikey)
  var data = ["https://i.postimg.cc/sgYy39Yy/1.jpg", "https://i.postimg.cc/k5wmbJYp/10.jpg", "https://i.postimg.cc/XJJ0KRT7/11.jpg", "https://i.postimg.cc/PfCCT9Pj/12.jpg", "https://i.postimg.cc/GpbRt8KD/13.jpg", "https://i.postimg.cc/gkRr6hVt/14.jpg", "https://i.postimg.cc/rsRX3SVB/15.jpg", "https://i.postimg.cc/52S0sMkw/16.jpg", "https://i.postimg.cc/tTY4RnR5/17.jpg", "https://i.postimg.cc/4d7XRCw2/18.jpg", "https://i.postimg.cc/k55nwRSm/19.jpg", "https://i.postimg.cc/QCcsVp2p/2.jpg", "https://i.postimg.cc/zGz5XH0g/20.jpg", "https://i.postimg.cc/y8LKJ6br/21.jpg", "https://i.postimg.cc/WbjcXJRH/22.jpg", "https://i.postimg.cc/m2wfq2B2/23.jpg", "https://i.postimg.cc/MGghRnbt/24.jpg", "https://i.postimg.cc/1t6bKyvS/25.jpg", "https://i.postimg.cc/fyNp21P9/26.jpg", "https://i.postimg.cc/J05g9Pwd/27.jpg", "https://i.postimg.cc/m2TKQfCx/28.jpg", "https://i.postimg.cc/MKtN5Pmn/29.jpg", "https://i.postimg.cc/PxGRJBTR/3.jpg", "https://i.postimg.cc/cHQ5nXJ4/30.jpg", "https://i.postimg.cc/bY9BYCMm/31.jpg", "https://i.postimg.cc/QdH4bXMz/32.jpg", "https://i.postimg.cc/Rhgd78x9/33.jpg", "https://i.postimg.cc/sD2wjV52/34.jpg", "https://i.postimg.cc/pXV1mQMR/35.jpg", "https://i.postimg.cc/sfmTCBQ8/36.jpg", "https://i.postimg.cc/ZRcxmgR3/37.jpg", "https://i.postimg.cc/mkgNgwzn/38.jpg", "https://i.postimg.cc/pXyJNsth/4.jpg", "https://i.postimg.cc/13q0X4Xy/5.jpg", "https://i.postimg.cc/DZBLHXjP/7.jpg", "https://i.postimg.cc/RhYfVzz3/8.jpg", "https://i.postimg.cc/TYZmzG9F/9.jpg"]
  var result = data[Math.floor(Math.random() * data.length)];
  var requestSettings = {
    url: result,
    method: 'GET',
    encoding: null
  };
  request(requestSettings, function(error, response, body) {
    res.set('Content-Type', 'image/jpg');
    res.send(body);
  });
})

router.get('/api/cecan/korea', cekKey, async (req, res, next) => {
  limitapikey(req.query.apikey)
  var data = ["https://i.postimg.cc/K87Z4CkB/p-19620motq1.jpg", "https://i.postimg.cc/wvgR7hjT/p-19623vybj1.jpg", "https://i.postimg.cc/QtJ5bfyT/p-19623z95r1.jpg", "https://i.postimg.cc/XJbddRQW/p-19624y1on1.jpg", "https://i.postimg.cc/dVG0rLX7/p-19625anrs1.jpg", "https://i.postimg.cc/9fWc91ZS/p-19625lzea1.jpg", "https://i.postimg.cc/SKWzSZqv/p-19626rftx1.jpg", "https://i.postimg.cc/hPjxLbbX/p-196298pkr1.jpg", "https://i.postimg.cc/hvGJ0cmk/p-1962alh5c1.jpg", "https://i.postimg.cc/ZqcKsXJ4/p-1962asjl31.jpg", "https://i.postimg.cc/pX6jqhqq/p-1962enqpe1.jpg", "https://i.postimg.cc/T1SPqmfb/p-1962gl6nf1.jpg", "https://i.postimg.cc/mZVC16Mx/p-1962koqm41.jpg", "https://i.postimg.cc/d3zqTYjm/p-1962pvq221.jpg", "https://i.postimg.cc/3xQ883R3/p-1962spcdo1.jpg", "https://i.postimg.cc/BbZFw2rw/p-1962u3qhb1.jpg", "https://i.postimg.cc/nVwMJ8BL/p-1962umwai1.jpg", "https://i.postimg.cc/76hDs6Bn/p-1962y8lij1.jpg", "https://i.postimg.cc/ydp6s9JG/p-1962yt9ph1.jpg"]
  var result = data[Math.floor(Math.random() * data.length)];
  var requestSettings = {
    url: result,
    method: 'GET',
    encoding: null
  };
  request(requestSettings, function(error, response, body) {
    res.set('Content-Type', 'image/jpg');
    res.send(body);
  });
})

router.get('/api/cecan/japan', cekKey, async (req, res, next) => {
  limitapikey(req.query.apikey)
  var data = ["https://i.postimg.cc/RCcjLvF6/p-196252lk91.jpg", "https://i.postimg.cc/7hMdHncM/p-19625eppj1.jpg", "https://i.postimg.cc/CLpwwvZD/p-19629cg431.jpg", "https://i.postimg.cc/pVwLpWSm/p-19629eev81.jpg", "https://i.postimg.cc/ydxwTRD7/p-1962cau3w1.jpg", "https://i.postimg.cc/D0LFqGN8/p-1962ck87p1.jpg", "https://i.postimg.cc/76zjcknR/p-1962fyik51.jpg", "https://i.postimg.cc/bYtzcXvp/p-1962i85aq1.jpg", "https://i.postimg.cc/nLWtgTbX/p-1962nvj4g1.jpg", "https://i.postimg.cc/rFGMsSWH/p-1962o5sp41.jpg", "https://i.postimg.cc/wTgnWnyW/p-1962p9nlk1.jpg", "https://i.postimg.cc/T1XBv4k3/p-1962q7ura1.jpg", "https://i.postimg.cc/nz6pj20y/p-1962qiubc1.jpg", "https://i.postimg.cc/13CxVMzv/p-1962tt38s1.jpg", "https://i.postimg.cc/ZYBqbBwk/p-1962ufc7p1.jpg", "https://i.postimg.cc/52x1C6S2/p-1962vn5rc1.jpg", "https://i.postimg.cc/GpHWFY8d/p-1962vpyp71.jpg", "https://i.postimg.cc/tTc8vg6W/p-1962w2hyp1.jpg"]
  var result = data[Math.floor(Math.random() * data.length)];
  var requestSettings = {
    url: result,
    method: 'GET',
    encoding: null
  };
  request(requestSettings, function(error, response, body) {
    res.set('Content-Type', 'image/jpg');
    res.send(body);
  });
})

router.get('/api/cecan/malaysia', cekKey, async (req, res, next) => {
  limitapikey(req.query.apikey)
  var data = ["https://i.postimg.cc/L8BFTfV1/p-1962mt0wq1.jpg", "https://i.postimg.cc/SKgF0h3Q/p-1962p3bmk1.jpg", "https://i.postimg.cc/25tYbYwc/p-1962pac7k1.jpg", "https://i.postimg.cc/fRXRhJfz/p-1962qpsvb1.jpg", "https://i.postimg.cc/Yq7Hmb6H/p-1962rcc7k1.jpg", "https://i.postimg.cc/G3QDZSh7/p-1962v04461.jpg", "https://i.postimg.cc/6QttJzQc/p-1962va89q1.jpg", "https://i.postimg.cc/t4HHWDFb/p-1962y8nl71.jpg", "https://i.postimg.cc/02VB2fZZ/p-1962y8oif1.jpg", "https://i.postimg.cc/CMqh8R9j/p-1962yyuuh1.jpg", "https://i.postimg.cc/Hn7f77xj/p-19622gld51.jpg", "https://i.postimg.cc/Hnpyrb39/p-196240q3o1.jpg", "https://i.postimg.cc/wMGj9Nrv/p-19624pvv61.jpg", "https://i.postimg.cc/hPXGpCJ7/p-19625n89w1.jpg", "https://i.postimg.cc/TwQPHFqn/p-19627bm3c1.jpg", "https://i.postimg.cc/zG08NKR1/p-1962c7n2o1.jpg", "https://i.postimg.cc/j2XkfQTx/p-1962caiz61.jpg", "https://i.postimg.cc/59TJNf06/p-1962csdwa1.jpg", "https://i.postimg.cc/6pwptBjC/p-1962d0xml1.jpg", "https://i.postimg.cc/PqyhtZpj/p-1962d4cuh1.jpg", "https://i.postimg.cc/DZYTGTPp/p-1962grit21.jpg", "https://i.postimg.cc/T1LXq4kd/p-1962zgkj21.jpg"]
  var result = data[Math.floor(Math.random() * data.length)];
  var requestSettings = {
    url: result,
    method: 'GET',
    encoding: null
  };
  request(requestSettings, function(error, response, body) {
    res.set('Content-Type', 'image/jpg');
    res.send(body);
  });
})

router.get('/api/cecan/random', cekKey, async (req, res, next) => {
  limitapikey(req.query.apikey)
  fetch(encodeURI(`https://github.com/zeroonecraft/data-gabut/raw/main/cecan/random.json`))
    .then(response => response.json())
    .then(data => {
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Dowloader  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/download/facebook', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  const result = await scr.savefrom(url)
  limitapikey(req.query.apikey)
  res.json({
    result
  })
})
router.get('/api/download/instagram', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter username" })
  let iglu = await scr.instagramdl(url).catch(async _ => await scr.instagramdlv2(url)).catch(async _ => await scr.instagramdlv3(url)).catch(async _ => await scr.instagramdlv4(url))
  var result = iglu;
  limitapikey(req.query.apikey)
  res.json({
    result
  })
})

router.get('/api/download/tiktok', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  let ttlu = await scr.tiktokdl(url).catch(async _ => await scr.tiktokdlv2(url))
  var result = ttlu;
  limitapikey(req.query.apikey)
  res.json({
    result
  })
})

router.get('/api/download/ytmp3', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  const { id, thumbnail, audio: _audio, title } = await scr.youtubedlv2(url)
  try {
    for (let i in _audio) {
      audio = _audio[i]
      let kin = await audio.download()
      limitapikey(req.query.apikey)
      res.json({
        id: id,
        thumbnail: thumbnail,
        title: title,
        size: audio.fileSize,
        download: kin
      })
    }
  } catch {
    console.log(e);
    res.json(loghandler.error)
  }
})

router.get('/api/download/ytmp4', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  const { id, thumbnail, video: _video, title } = await scr.youtubedlv2(url)
  try {
    for (let i in _video) {
      video = _video[i]
      let kin = await video.download()
      limitapikey(req.query.apikey)
      res.json({
        id: id,
        thumbnail: thumbnail,
        title: title,
        size: video.fileSize,
        download: kin
      })
    }
  } catch {
    console.log(e);
    res.json(loghandler.error)
  }
})

router.get('/api/dowloader/telesticker', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) return res.json(loghandler.noturl)

  alip.telesticker(url).then(data => {
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  })
})

router.get('/api/dowloader/twitter', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })

  alip.twitter(url).then(data => {
    if (!data.thumb) res.json(loghandler.noturl)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  })
    .catch(e => {
      res.json(loghandler.error)
    })
})

router.get('/api/dowloader/soundcloud', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })

  alip.soundcloud(url).then(data => {
    if (!data.download) return res.json(loghandler.noturl)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch(e => {
    res.json(loghandler.error)
  })
})

router.get('/api/dowloader/mediafire', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })

  alip.mediafiredl(url).then(async (data) => {
    if (!data) return res.json(loghandler.noturl)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

router.get('/api/dowloader/sfilemobi', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })

  alip.sfilemobi(url).then(async (data) => {
    if (!data) return res.json(loghandler.noturl)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

router.get('/api/dowloader/zippyshare', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })

  alip.zippyshare(url).then(async (data) => {
    if (!data) return res.json(loghandler.noturl)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

router.get('/api/download/pinterest', cekKey, async (req, res, next) => {
  var url = req.query.q
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter q" })
  scr.pinterest(url)
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        result
      })
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Text Pro  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/textpro/pencil', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/textpro/glitch', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/textpro/blackpink', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/textpro/berry', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/textpro/neon', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/neon-light-text-effect-online-882.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})



router.get('/api/textpro/logobear', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/textpro/3dchristmas', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/3d-christmas-text-effect-by-name-1055.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/textpro/thunder', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/textpro/3dboxtext', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/3d-box-text-effect-online-880.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/textpro/glitch2', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text2" })
  alip.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [text1, text2])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/glitchtiktok', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text2" })
  alip.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [text1, text2])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/video-game-classic', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text2" })
  alip.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [text1, text2])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/marvel-studios', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text2" })
  alip.textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [text1, text2])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/ninja-logo', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text2" })
  alip.textpro("https://textpro.me/create-ninja-logo-online-935.html", [text1, text2])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/green-horror', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/magma', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/3d-neon-light', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/3d-orange-juice', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/chocolate-cake', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/chocolate-cake-text-effect-890.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/textpro/strawberry', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.textpro("https://textpro.me/strawberry-text-effect-online-889.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Cek ID Game  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/cekidgame/ff1', cekKey, async (req, res, next) => {
  var uid = req.query.id
  if (!uid) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter id" })
  fetch(encodeURI(`https://api.gifan.id/trueID/freeFire/?id=${uid}`))
    .then(response => response.text())
    .then(data => {
      limitapikey(req.query.apikey)
      var nickname = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result: {
          nickname
        }
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/cekidgame/ff2', cekKey, async (req, res, next) => {
  var id = req.query.id
  if (!id) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter id" })
  scr.nameFreeFire(id)
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/cekidgame/ml', cekKey, async (req, res, next) => {
  var uid = req.query.id
  if (!uid) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter id", format: "userID.zoneID" })
  fetch(encodeURI(`https://api.gifan.id/trueID/mobileLegends/?id=${uid}`))
    .then(response => response.text())
    .then(data => {
      limitapikey(req.query.apikey)
      var nickname = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result: {
          nickname
        }
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/cekidgame/aov', cekKey, async (req, res, next) => {
  var uid = req.query.id
  if (!uid) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter id" })
  fetch(encodeURI(`https://api.gifan.id/trueID/aov/?id=${uid}`))
    .then(response => response.text())
    .then(data => {
      limitapikey(req.query.apikey)
      var nickname = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result: {
          nickname
        }
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/cekidgame/hd', cekKey, async (req, res, next) => {
  var uid = req.query.id
  if (!uid) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter id" })
  fetch(encodeURI(`https://api.gifan.id/trueID/higgsDomino/?id=${uid}`))
    .then(response => response.text())
    .then(data => {
      limitapikey(req.query.apikey)
      var nickname = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result: {
          nickname
        }
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/cekidgame/rgn-x', cekKey, async (req, res, next) => {
  var uid = req.query.id
  if (!uid) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter id" })
  fetch(encodeURI(`https://api.gifan.id/trueID/ragnarok-x/?id=${uid}`))
    .then(response => response.text())
    .then(data => {
      limitapikey(req.query.apikey)
      var nickname = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result: {
          nickname
        }
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  News  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/news/cnn', cekKey, async (req, res, next) => {
  var url = req.query.type
  fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/cnn-news`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/news/cnbc', cekKey, async (req, res, next) => {
  var url = req.query.type
  fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/cnbc-news`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/news/republika', cekKey, async (req, res, next) => {
  var url = req.query.type
  fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/republika-news`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/news/tempo', cekKey, async (req, res, next) => {
  var url = req.query.type
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter type", list_type: "nasional - bisnis - metro - dunia - bola - sport - cantik - tekno - otomotif - nusantara" })
  fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/tempo-news/${url}`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/news/antara', cekKey, async (req, res, next) => {
  var url = req.query.type
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter type", list_type: "terkini - top-news - politik - hukum - ekonomi - metro - sepakbola - olahraga - humaniora - lifestyle - hiburan - dunia - infografik - tekno - otomotif - warta-bumi - rilis-pers" })
  fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/antara-news/${url}`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/news/kumparan', cekKey, async (req, res, next) => {
  var url = req.query.type
  fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/kumparan-news`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Kata  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/kata/bucin', cekKey, async (req, res, next) => {
  const result = await scr.bucin()
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

router.get('/api/kata/dare', cekKey, async (req, res, next) => {
  const result = await scr.dare()
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

router.get('/api/kata/truth', cekKey, async (req, res, next) => {
  const result = await scr.truth()
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Gambar  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/gambar/cyberspace', cekKey, async (req, res, next) => {
  var text = req.query.page
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/gambar/cyberspace.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/gambar/game', cekKey, async (req, res, next) => {
  var text = req.query.page
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/gambar/game.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/gambar/islamic', cekKey, async (req, res, next) => {
  var text = req.query.page
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/gambar/islamic.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/gambar/mountain', cekKey, async (req, res, next) => {
  var text = req.query.page
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/gambar/mountain.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/gambar/programming', cekKey, async (req, res, next) => {
  var text = req.query.page
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/gambar/programming.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/gambar/technology', cekKey, async (req, res, next) => {
  var text = req.query.page
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/gambar/technology.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Phootoxy  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


router.get('/api/photooxy/flaming', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/photooxy/shadow-sky', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/photooxy/metallic', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/photooxy/naruto', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/photooxy/pubg', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  var text2 = req.query.text2
  if (!text2) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text2" })
  alip.photooxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text1, text2])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/photooxy/under-grass', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/photooxy/harry-potter', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/photooxy/flower-typography', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/art-effects/flower-typography-text-effect-164.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/photooxy/picture-of-love', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/photooxy/coffee-cup', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/photooxy/butterfly', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/photooxy/night-sky', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/photooxy/carved-wood', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/api/photooxy/illuminated-metallic', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/api/photooxy/sweet-candy', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html", [text1])
    .then((data) => {
      limitapikey(req.query.apikey)
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Information  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/information/github-stalk', cekKey, async (req, res, next) => {
  var text = req.query.username
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter username" })
  fetch(encodeURI(`https://api.github.com/users/${text}`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/information/jadwalsholat', cekKey, async (req, res, next) => {
  var kota = req.query.kota
  if (!kota) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter kota" })
  const result = await scr.jadwalsholat(kota)
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

router.get('/api/information/jadwaltv', cekKey, async (req, res, next) => {
  var channel = req.query.channel
  if (!channel) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter channel" })
  const result = await scr.jadwalTV(channel)
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

router.get('/api/information/kodepos', cekKey, async (req, res, next) => {
  var text = req.query.kota
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter kota" })
  fetch(encodeURI(`https://kodepos-api-zhirrr.vercel.app/?q=${text}`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/information/covid-world', cekKey, async (req, res, next) => {
  var text = req.query.kata
  fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/world`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/information/gempa', cekKey, async (req, res, next) => {
  const result = await scr.gempa()
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

router.get('/api/information/gempanow', cekKey, async (req, res, next) => {
  const result = await scr.gempaNow()
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

router.get('/api/information/tsunami', cekKey, async (req, res, next) => {
  const result = await scr.tsunami()
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏ Maker ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/maker/circle', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })
  const hasil = await Canvacord.Canvas.circle(text);
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/beautiful', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })
  const hasil = await Canvacord.Canvas.beautiful(text);
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)
})

router.get('/api/maker/blur', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })
  const hasil = await Canvacord.Canvas.blur(text)
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/darkness', cekKey, async (req, res) => {
  var text = req.query.url
  var no = req.query.no
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  if (!no) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter no" })

  var img = await isImageURL(text)
  var n = isNumber(no)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })
  if (!n) return res.json({ status: false, creator: `${creator}`, message: "[!] parameter nomor saja" })

  const hasil = await Canvacord.Canvas.darkness(text, shortText(no, 3))
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)
})

router.get('/api/maker/facepalm', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })

  const hasil = await Canvacord.Canvas.facepalm(text)
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/invert', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })

  const hasil = await Canvacord.Canvas.invert(text)
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/pixelate', cekKey, async (req, res) => {
  var text = req.query.url
  var no = req.query.no
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  if (!no) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter no" })

  var img = await isImageURL(text)
  var n = isNumber(no)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })
  if (!n) return res.json({ status: false, creator: `${creator}`, message: "[!] parameter nomor saja" })

  const hasil = await Canvacord.Canvas.pixelate(text, convertStringToNumber(no))
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/rainbow', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })

  const hasil = await Canvacord.Canvas.rainbow(text)
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/resize', cekKey, async (req, res) => {
  var text = req.query.url
  var width = req.query.width
  var height = req.query.height

  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  if (!width) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter width" })
  if (!height) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter height" })

  let w = width
  let h = height
  if (w > 1000) { w = "1000" }
  if (h > 1000) { h = "1000" }

  var img = await isImageURL(text)
  var wid = isNumber(width)
  var hei = isNumber(height)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })
  if (!wid) return res.json({ status: false, creator: `${creator}`, message: "[!] parameter width nomor saja" })
  if (!hei) return res.json({ status: false, creator: `${creator}`, message: "[!] parameter height nomor saja" })

  const hasil = await Canvacord.Canvas.resize(text, convertStringToNumber(w), convertStringToNumber(h))
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/trigger', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })

  const hasil = await Canvacord.Canvas.trigger(text)
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'gif' })
  res.send(hasil)

})

router.get('/api/maker/wanted', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })

  const hasil = await Canvacord.Canvas.wanted(text)
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/wasted', cekKey, async (req, res) => {
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image" })

  const hasil = await Canvacord.Canvas.wasted(text)
  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})

router.get('/api/maker/attp', cekKey, async (req, res) => {
  var text = req.query.text
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })

  const file = "./asset/image/attp.gif"

  let length = text.length

  var font = 90

  if (length > 12) { font = 68 }
  if (length > 15) { font = 58 }
  if (length > 18) { font = 55 }
  if (length > 19) { font = 50 }
  if (length > 22) { font = 48 }
  if (length > 24) { font = 38 }
  if (length > 27) { font = 35 }
  if (length > 30) { font = 30 }
  if (length > 35) { font = 26 }
  if (length > 39) { font = 25 }
  if (length > 40) { font = 20 }
  if (length > 49) { font = 10 }
  Canvas.registerFont('./asset/font/SF-Pro.ttf', { family: 'SF-Pro' })
  await canvasGif(
    file, (ctx) => {
      var couler = ["#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff"]
      let jadi = couler[Math.floor(Math.random() * couler.length)]

      function drawStroked(text, x, y) {
        ctx.lineWidth = 5
        ctx.font = `${font}px SF-Pro`
        ctx.fillStyle = jadi
        ctx.strokeStyle = 'black'
        ctx.textAlign = 'center'
        ctx.strokeText(text, x, y)
        ctx.fillText(text, x, y)
      }

      drawStroked(text, 290, 300)

    },
    {
      coalesce: false, // whether the gif should be coalesced first (requires graphicsmagick), default: false
      delay: 0, // the delay between each frame in ms, default: 0
      repeat: 0, // how many times the GIF should repeat, default: 0 (runs forever)
      algorithm: 'octree', // the algorithm the encoder should use, default: 'neuquant',
      optimiser: false, // whether the encoder should use the in-built optimiser, default: false,
      fps: 7, // the amount of frames to render per second, default: 60
      quality: 100, // the quality of the gif, a value between 1 and 100, default: 100
    }
  ).then((buffer) => {
    limitapikey(req.query.apikey)
    res.set({ 'Content-Type': 'gif' })
    res.send(buffer)

  })

  router.get('/api/maker/ttp', cekKey, async (req, res) => {
    var text = req.query.text
    if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })

    Canvas.registerFont('./asset/font/SF-Pro.ttf', { family: 'SF-Pro' })
    let length = text.length

    var font = 90
    if (length > 12) { font = 68 }
    if (length > 15) { font = 58 }
    if (length > 18) { font = 55 }
    if (length > 19) { font = 50 }
    if (length > 22) { font = 48 }
    if (length > 24) { font = 38 }
    if (length > 27) { font = 35 }
    if (length > 30) { font = 30 }
    if (length > 35) { font = 26 }
    if (length > 39) { font = 25 }
    if (length > 40) { font = 20 }
    if (length > 49) { font = 10 }

    var ttp = {}
    ttp.create = Canvas.createCanvas(576, 576)
    ttp.context = ttp.create.getContext('2d')
    ttp.context.font = `${font}px SF-Pro`
    ttp.context.strokeStyle = 'black'
    ttp.context.lineWidth = 3
    ttp.context.textAlign = 'center'
    ttp.context.strokeText(text, 290, 300)
    ttp.context.fillStyle = 'white'
    ttp.context.fillText(text, 290, 300)
    limitapikey(req.query.apikey)
    res.set({ 'Content-Type': 'image/png' })
    res.send(ttp.create.toBuffer())

  })
})

router.get('/api/maker/emojimix', cekKey, async (req, res, next) => {
  var emoji1 = req.query.emoji1
  var emoji2 = req.query.emoji2
  if (!emoji1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter emoji1" })
  if (!emoji2) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter emoji2" })

  let data = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
  let jadi = data.results[Math.floor(Math.random() * data.results.length)]
  if (!jadi) return res.json(loghandler.notfound)
  for (let ress of data.results) {
    resul = await getBuffer(ress.url)
    limitapikey(req.query.apikey)
    res.set({ 'Content-Type': 'image/png' })
    res.send(resul)
  }
})

router.get('/api/maker/welcome1', cekKey, async (req, res, next) => {
  var name = req.query.name
  var grup = req.query.gpname
  var member = req.query.member
  var pp = req.query.pp
  var bg = req.query.bg

  var imgpp = await isImageURL(pp)
  var bgimg = await isImageURL(bg)

  if (!name) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter name" })
  if (!grup) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter gpname" })
  if (!member) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter member" })
  if (!pp) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter pp" })
  if (!bg) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter bg" })

  if (!imgpp) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image pp" })
  if (!bgimg) return res.json({ status: false, creator: `${creator}`, message: "[!] cek kembali url image bg" })

  Canvas.registerFont('./asset/font/Creme.ttf', { family: 'creme' })

  var welcomeCanvas = {}
  welcomeCanvas.create = Canvas.createCanvas(1024, 500)
  welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
  welcomeCanvas.context.font = '72px creme'
  welcomeCanvas.context.fillStyle = '#ffffff'

  await Canvas.loadImage("./asset/image/wbg1.jpg").then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)

  })

  let can = welcomeCanvas

  await Canvas.loadImage(bg)
    .then(bg => {
      can.context.drawImage(bg, 320, 0, 709, 360)
    })

  let canvas = welcomeCanvas
  canvas.context.beginPath()
  canvas.context.arc(174, 279, 115, 0, Math.PI * 2, true)
  canvas.context.stroke()
  canvas.context.fill()
  canvas.context.font = '100px creme',
    canvas.context.textAlign = 'center'
  canvas.context.fillText("Welcome", 670, 140)
  canvas.context.font = '100px Helvetica'
  canvas.context.fillText("____   ____", 670, 160)
  canvas.context.fillText("✩", 670, 215)
  canvas.context.font = '100px creme'
  canvas.context.fillText(shortText(grup, 17), 670, 300)
  canvas.context.font = '40px creme'
  canvas.context.textAlign = 'start'
  canvas.context.fillText(shortText(name, 40), 420, 420)
  canvas.context.font = '35px creme'
  canvas.context.fillText(`${shortText(member, 10)} th member`, 430, 490)
  canvas.context.beginPath()
  canvas.context.arc(174, 279, 110, 0, Math.PI * 2, true)
  canvas.context.closePath()
  canvas.context.clip()
  await Canvas.loadImage(pp)
    .then(pp => {
      canvas.context.drawImage(pp, 1, 150, 300, 300)
    })

  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(canvas.create.toBuffer())
})


router.get('/api/maker/goodbye1', cekKey, async (req, res, next) => {
  var name = req.query.name
  var grup = req.query.gpname
  var pp = req.query.pp
  var member = req.query.member
  var bg = req.query.bg

  var imgpp = await isImageURL(pp)
  var bgimg = await isImageURL(bg)

  if (!name) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter name" })
  if (!grup) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter gpname" })
  if (!member) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter member" })
  if (!bg) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter bg" })
  if (!pp) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter pp" })

  if (!imgpp) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter pp Link pp dengan betul" })
  if (!bgimg) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter pp Link bg dengan betul" })

  Canvas.registerFont('./asset/font/Creme.ttf', { family: 'creme' })

  var goobyeCanvas = {}
  goobyeCanvas.create = Canvas.createCanvas(1024, 500)
  goobyeCanvas.context = goobyeCanvas.create.getContext('2d')
  goobyeCanvas.context.font = '72px creme'
  goobyeCanvas.context.fillStyle = '#ffffff'

  await Canvas.loadImage("./asset/image/wbg1.jpg").then(async (img) => {
    goobyeCanvas.context.drawImage(img, 0, 0, 1024, 500)

  })

  let can = goobyeCanvas

  await Canvas.loadImage(bg)
    .then(bg => {
      can.context.drawImage(bg, 320, 0, 709, 360)
    })

  let canvas = goobyeCanvas
  canvas.context.beginPath()
  canvas.context.arc(174, 279, 115, 0, Math.PI * 2, true)
  canvas.context.stroke()
  canvas.context.fill()
  canvas.context.font = '100px creme',
    canvas.context.textAlign = 'center'
  canvas.context.fillText("GoodBye", 670, 140)
  canvas.context.font = '100px Helvetica'
  canvas.context.fillText("____   ____", 670, 160)
  canvas.context.fillText("✩", 670, 215)
  canvas.context.font = '100px creme'
  canvas.context.fillText(shortText(grup, 17), 670, 300)
  canvas.context.font = '40px creme'
  canvas.context.textAlign = 'start'
  canvas.context.fillText(shortText(name, 40), 420, 420)
  canvas.context.font = '35px creme'
  canvas.context.fillText(`${shortText(member, 10)} th member`, 430, 490)
  canvas.context.beginPath()
  canvas.context.arc(174, 279, 110, 0, Math.PI * 2, true)
  canvas.context.closePath()
  canvas.context.clip()
  await Canvas.loadImage(pp)
    .then(pp => {
      canvas.context.drawImage(pp, 1, 150, 300, 300)
    })

  limitapikey(req.query.apikey)
  res.set({ 'Content-Type': 'image/png' })
  res.send(canvas.create.toBuffer())
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Shortlink  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/shortlink/tinyurl', cekKey, async (req, res, next) => {
  var link = req.query.link
  if (!link) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter link" })

  var islink = isUrl(link)
  if (!islink) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url saja" })


  TinyURL.shorten(link, function(link, err) {
    if (err) return res.json(loghandler.error)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: link
    })
  });

})

router.get('/api/shortlink/tinyurlwithalias', cekKey, async (req, res, next) => {
  var link = req.query.link
  var alias = req.query.alias
  if (!link) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter link" })
  if (!alias) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter alias" })

  var islink = isUrl(link)
  if (!islink) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url saja" })

  const data = { 'url': link, 'alias': shortText(alias, 30) }

  TinyURL.shortenWithAlias(data).then(function(link) {
    if (link == "Error") return res.json(loghandler.redy)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: link
    })
  })
})

router.get('/api/shortlink/cuttly', cekKey, async (req, res, next) => {
  var link = req.query.link
  if (!link) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter link" })
  var islink = isUrl(link)
  if (!islink) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url saja" })

  let randomapicuttly = apicuttly[Math.floor(Math.random() * apicuttly.length)]
  var hasil = await fetchJson(`https://cutt.ly/api/api.php?key=${randomapicuttly}&short=${link}`)
  if (!hasil.url) return res.json(loghandler.noturl)
  limitapikey(req.query.apikey)
  res.json({
    status: true,
    creator: `${creator}`,
    result: hasil.url
  })
});


router.get('/api/shortlink/bitly', cekKey, async (req, res, next) => {
  var link = req.query.link
  if (!link) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter link" })

  var islink = isUrl(link)
  if (!islink) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url saja" })

  let randomapibitly = apibitly[Math.floor(Math.random() * apibitly.length)]
  const bitly = new BitlyClient(randomapibitly)
  bitly
    .shorten(link)
    .then(function(result) {
      limitapikey(req.query.apikey)
      res.json({
        status: true,
        creator: `${creator}`,
        result: result.link
      })

    })
    .catch(function(error) {
      res.json(loghandler.error)
    });
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Tools ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/tools/ebase64', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (text1.length > 2048) return res.json({ status: false, creator: `${creator}`, message: "[!] Maximal 2.048 String!" })
  limitapikey(req.query.apikey)

  res.json({
    status: true,
    creator: `${creator}`,
    result: Buffer.from(text1).toString('base64')
  })

})

router.get('/api/tools/debase64', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (text1.length > 2048) return res.json({ status: false, creator: `${creator}`, message: "[!] Maximal 2.048 String!" })
  limitapikey(req.query.apikey)

  res.json({
    status: true,
    creator: `${creator}`,
    result: Buffer.from(text1, 'base64').toString('ascii')
  })

})

router.get('/api/tools/ebinary', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (text1.length > 2048) return res.json({ status: false, creator: `${creator}`, message: "[!] Maximal 2.048 String!" })

  function encodeBinary(char) {
    return char.split("").map(str => {
      const converted = str.charCodeAt(0).toString(2);
      return converted.padStart(8, "0");
    }).join(" ")
  }
  limitapikey(req.query.apikey)

  res.json({
    status: true,
    creator: `${creator}`,
    result: encodeBinary(text1)
  })
})

router.get('/api/tools/debinary', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (text1.length > 2048) return res.json({ status: false, creator: `${creator}`, message: "[!] Maximal 2.048 String!" })

  function decodeBinary(char) {
    return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
  }
  limitapikey(req.query.apikey)

  res.json({
    status: true,
    creator: `${creator}`,
    result: decodeBinary(text1)
  })

})

router.get('/api/tools/ssweb', cekKey, async (req, res, next) => {
  var link = req.query.link
  if (!link) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter link" })

  var islink = isUrl(link)
  if (!islink) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url saja" })


  alip.ssweb(link).then((data) => {
    limitapikey(req.query.apikey)
    if (!data) return res.json(loghandler.notfound)
    res.set({ 'Content-Type': 'image/png' })
    res.send(data)
  }).catch((err) => {
    res.json(loghandler.notfound)

  })

})

router.get('/api/tools/styletext', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text " })
  var text = shortText(text1, 10000)
  alip.styletext(text)
    .then((data) => {
      if (!data) return res.json(loghandler.error)
      limitapikey(req.query.apikey)

      res.json({
        status: true,
        creator: `${creator}`,
        result: data
      })
    })
    .catch((err) => {
      res.json(loghandler.error)

    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Search  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/search/linkgroupwa', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.linkwa(text1).then((data) => {
    if (!data[0]) return res.json(loghandler.notfound)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})

router.get('/api/search/google-image', cekKey, async (req, res, next) => {
  var text = req.query.query
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter query" })
  scr.googleImage(text).then(data => {
    var data = data;
    limitapikey(req.query.apikey)
    res.json({
      status: 200,
      data,
    })
  })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/search/pinterest', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.pinterest(text1).then((data) => {
    if (!data[0]) return res.json(loghandler.notfound)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})


router.get('/api/search/ringtone', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.ringtone(text1).then((data) => {
    if (!data) return res.json(loghandler.notfound)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})


router.get('/api/search/wikimedia', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.wikimedia(text1).then((data) => {
    if (!data[0]) return res.json(loghandler.notfound)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})


router.get('/api/search/wallpaper', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.wallpaper(text1).then((data) => {
    if (!data[0]) return res.json(loghandler.notfound)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})

router.get('/api/search/google', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })

  googleIt({ 'query': text1 }).then(results => {
    if (!results[0]) return res.json(loghandler.notfound)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: results
    })
  }).catch(e => {
    res.json(loghandler.notfound)
  })
})

router.get('/api/search/googleimage', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })

  var gis = require('g-i-s')
  gis(text1, logResults)

  function logResults(error, results) {
    if (error) {
      res.json(loghandler.notfound)
    }
    else {
      if (!results[0]) return res.json(loghandler.notfound)
      limitapikey(req.query.apikey)
      res.json({
        status: true,
        creator: `${creator}`,
        result: results
      })
    }
  }
})


router.get('/api/search/ytplay', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })

  let yts = require("yt-search")
  let search = await yts(text1)
  let url = search.all[Math.floor(Math.random() * search.all.length)]
  var mp3 = await ytMp3(url.url)
  var mp4 = await ytMp4(url.url)
  if (!mp4 || !mp3) return res.json(loghandler.noturl)
  limitapikey(req.query.apikey)
  res.json({
    status: true,
    creator: `${creator}`,
    result: {
      title: mp4.title,
      desc: mp4.desc,
      thum: mp4.thumb,
      view: mp4.views,
      channel: mp4.channel,
      ago: url.ago,
      timestamp: url.timestamp,
      uploadDate: mp4.uploadDate,
      creator: url.creator,
      mp4: {
        result: mp4.result,
        size: mp4.size,
        quality: mp4.quality
      },
      mp3: {
        result: mp3.result,
        size: mp3.size
      }
    }
  })

})

router.get('/api/search/sticker', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.stickersearch(text1).then(data => {
    if (!data) return res.json(loghandler.notfound)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch(e => {
    res.json(loghandler.error)
  })
})

router.get('/api/search/sfilemobi', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.sfilemobiSearch(text1).then(data => {
    if (!data) return res.json(loghandler.notfound)
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch(e => {
    res.json(loghandler.error)
  })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Nefw  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/nsfw/ahegao', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/ahegao.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/ass', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/ass.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/bdsm', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/bdsm.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/blowjob', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/blowjob.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/cuckold', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/cuckold.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/cum', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/cum.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/eba', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/eba.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/ero', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/ero.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/femdom', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/femdom.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/foot', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/foot.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/gangbang', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/gangbang.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/gifs', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/gifs.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/glasses', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/glasses.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/hentai', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/hentai.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/hentaivid', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/hentaivid.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'video/mp4');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/jahy', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/jahy.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/manga', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/manga.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/masturbation', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/masturbation.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/neko', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/neko.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/neko2', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/neko2.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/nsfwloli', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/nsfwloli.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/orgy', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/orgy.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/panties', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/panties.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/pussy', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/pussy.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/tentacles', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/tentacles.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/thighs', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/thighs.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/yuri', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/yuri.json`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

router.get('/api/nsfw/zettai', cekKey, async (req, res, next) => {
  fetch(encodeURI(`https://raw.githubusercontent.com/zeroonecraft/data-gabut/main/nsfw/zettai.json`))
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      var result = data[Math.floor(Math.random() * data.length)];
      var requestSettings = {
        url: result.url,
        method: 'GET',
        encoding: null
      };
      request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/jpg');
        res.send(body);
      });
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Primbon  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/primbon/artimimpi', cekKey, async (req, res, next) => {
  var mimpi = req.query.mimpi
  if (!mimpi) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter mimpi" })
  const result = await scr.artimimpi(mimpi)
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})
router.get('/api/primbon/nomorhphoki', cekKey, async (req, res, next) => {
  var number = req.query.number
  if (!number) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter nomer hp" })
  const result = await scr.nomorhoki(number)
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})
router.get('/api/primbon/zodiac', cekKey, async (req, res, next) => {
  var dates = req.query.dates
  var months = req.query.months
  if (!dates) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter tanggal" })
  if (!months) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter bulan" })
  const result = await scr.getZodiac(months, dates)
  limitapikey(req.query.apikey)
  res.json(
    result
  )
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Game  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/game/asahotak', cekKey, async (req, res, next) => {
  scr.asahotak()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/caklontong', cekKey, async (req, res, next) => {
  scr.caklontong()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/family100', cekKey, async (req, res, next) => {
  scr.family100()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})
router.get('/api/game/siapakahaku', cekKey, async (req, res, next) => {
  scr.siapakahaku()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/susunkata', cekKey, async (req, res, next) => {
  scr.susunkata()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/tebakbendera', cekKey, async (req, res, next) => {
  scr.tebakbendera()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/tebakgambar', cekKey, async (req, res, next) => {
  scr.tebakgambar()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/tebakkabupaten', cekKey, async (req, res, next) => {
  scr.tebakkabupaten()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/tebakkata', cekKey, async (req, res, next) => {
  scr.tebakkata()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/tebakkimia', cekKey, async (req, res, next) => {
  scr.tebakkimia()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/tebaklirik', cekKey, async (req, res, next) => {
  scr.tebaklirik()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/tebaktebakan', cekKey, async (req, res, next) => {
  scr.tebaktebakan()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/game/tekateki', cekKey, async (req, res, next) => {
  scr.tekateki()
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Other  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/api/other/linkvertise', cekKey, async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  fetch(encodeURI(`https://bypass.cx/api.php?url=${url}`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        status: 'true',
        creator: `${creator}`,
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/other/kbbi', cekKey, async (req, res, next) => {
  var text = req.query.kata
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter kata" })
  fetch(encodeURI(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${text}`))
    .then(response => response.json())
    .then(data => {
      limitapikey(req.query.apikey)
      var result = data;
      res.json({
        result
      })
    })
    .catch(e => {
      console.log(e);
      res.json(loghandler.error)
    })
})

router.get('/api/other/translate', cekKey, async (req, res, next) => {
  var text = req.query.text
  var lang = req.query.lang

  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (!lang) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter lang, list semua lang: https://cloud.google.com/translate/docs/languages" })

  translate(text, { to: lang }).then(data => {
    limitapikey(req.query.apikey)
    res.json({
      status: true,
      creator: `${creator}`,
      result: data
    })
  }).catch(err => {
    res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter lang, list semua lang: https://cloud.google.com/translate/docs/languages" })
  })

})

router.get('/api/other/emoji', cekKey, async (req, res, next) => {
  var emoji1 = req.query.emoji
  if (!emoji1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter emoji" })
  var hasil = emoji.get(emoji1)
  if (hasil == null) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter emoji dengan 1 emoji saja" })
  limitapikey(req.query.apikey)
  res.json({
    status: true,
    creator: `${creator}`,
    result: hasil
  })
})

router.get('/api/other/soundoftext', cekKey, async (req, res, next) => {
  var text1 = req.query.text
  var lan = req.query.lang
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  if (!lan) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter lang, list semua lang: https://soundoftext.com/docs" })

  textto.sounds.create({ text: text1, voice: lan })
    .then(soundUrl => {
      limitapikey(req.query.apikey)
      res.json({
        status: true,
        creator: `${creator}`,
        result: soundUrl
      })
    }).catch(e => {
      res.json(loghandler.error)
    })
})

router.get('/api/other/lyrics', cekKey, async (req, res, next) => {
  var query = req.query.query
  if (!query) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter nama lagu" })
  const result = await scr.lyrics(query)
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

router.get('/api/other/chord', cekKey, async (req, res, next) => {
  var query = req.query.query
  if (!query) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter nama lagu" })
  const result = await scr.chord(query)
  limitapikey(req.query.apikey)
  res.json({
    status: 'true',
    creator: `${creator}`,
    result
  })
})

module.exports = router