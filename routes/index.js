const express = require('express')
const router = express.Router()

const box = require('../utils/boxData') // array storing A~Z, a~z, 0~9
const Record = require('../models/record')

const generateRandom = require('../utils/generateRandom') // function to generate random string 

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const urlInput = req.body.url
  const urlStartIndex = urlInput.indexOf('/') + 2
  let shortUrl = '12345'
  // url.slice(0, urlStartIndex) + 'heroku.com/' + generateRandom(box, 5)
  try {
    // check if the shortUrl exists in database, if yes, regenrate
    const findShortUrl = await Record.findOne({ newUrl: shortUrl })
    if (findShortUrl) {
      while (findShortUrl.newUrl === shortUrl) {
        shortUrl = generateRandom(box, 5)
      }
    }
    // check if originalUrl exists in database, if yes, return the existed short url, if not, create
    const findOriginalUrl = await Record.findOne({ originalUrl: urlInput })
    if (findOriginalUrl) {
      return res.render('index', { newUrl: findOriginalUrl.newUrl })
    }

    const create = await Record.create({ originalUrl: urlInput, newUrl: shortUrl })
    return res.render('index', { newUrl: create.newUrl })

  } catch (err) {
    console.log(err)
  }


})

router.get('/:shortUrl', async (req, res) => {
  const find = await Record.findOne({ newUrl: req.params.shortUrl })
  const originalUrl = find.originalUrl
  res.redirect(originalUrl)
})

module.exports = router