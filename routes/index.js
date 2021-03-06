const express = require('express')
const router = express.Router()

const box = require('../utils/boxData.json') // array storing A~Z, a~z, 0~9
const Record = require('../models/record')

const generateRandom = require('../utils/generateRandom') // function to generate random string 
const baseUrl = 'https://powerful-cliffs-44685.herokuapp.com/'

router.get('/', (req, res) => {
  res.render('index')
  console.log(box)
})

router.post('/', async (req, res) => {
  const urlInput = req.body.url

  try {
    // check if originalUrl exists in database, if yes, return the existed short url, if not, create one
    const findOriginalUrl = await Record.findOne({ originalUrl: urlInput })
    if (findOriginalUrl) {
      return res.render('index', { newUrl: baseUrl + findOriginalUrl.newUrl })
    }

    let shortUrl = generateRandom(box, 5)
    // check if the shortUrl exists in database, if yes, regenrate
    const findShortUrl = await Record.findOne({ newUrl: shortUrl })
    if (findShortUrl) {
      while (findShortUrl.newUrl === shortUrl) {
        shortUrl = generateRandom(box, 5)
      }
    }
    // create a record
    const create = await Record.create({ originalUrl: urlInput, newUrl: shortUrl })
    return res.render('index', { newUrl: baseUrl + create.newUrl })

  } catch (err) {
    console.log(err)
    return res.render('error', { errorMessage: err })
  }


})

router.get('/:shortUrl', async (req, res) => {
  try {
    const findRecord = await Record.findOne({ newUrl: req.params.shortUrl })
    if (findRecord) {
      const originalUrl = findRecord.originalUrl
      res.redirect(originalUrl)
    } else {
      const alert = baseUrl + req.params.shortUrl
      res.render('index', { alert }) // show alert if user enters wrong url
    }
  } catch (err) {
    console.log(err)
  }

})

module.exports = router