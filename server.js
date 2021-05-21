require('dotenv').config()
const fs = require('fs')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { projectManagement } = require('firebase-admin')


// app
const app = express()

// db
mongoose.connect(process.env.MONGO_URI_LOCAL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true
}).then(() => console.log('db connected'))
    .catch(err => { console.log(err); process.exit(1) })


// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// routes
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

// listen
const port = process.env.PORT || 8000
app.listen(port, () => console.log('app is running on port 8000'))
