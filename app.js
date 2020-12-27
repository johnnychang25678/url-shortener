const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')

const app = express()
const port = process.env.PORT || 3000

// connect to db
require('./config/mongoose')

// view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// middleware
app.use(express.urlencoded({ extended: true }))

// routes
app.use(routes)

app.listen(port, console.log(`Server running on port: ${port}`))

