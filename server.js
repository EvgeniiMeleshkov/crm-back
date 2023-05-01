import express from 'express'
import auth from './routes/authRoute.js'

const app = express()
const { __PORT__ } = process.env

app.use(express.json())

app.use('/auth', auth)

app.listen(__PORT__, onListen)
function onListen (err) {
  if (err) return console.log(err)
  console.log('server OK on port:', __PORT__)
}
