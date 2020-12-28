const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', async () => {
  await Record.create({
    originalUrl: 'https://google.com',
    newUrl: '12345'
  })

  console.log('seed data written in db')
  db.close()
})