import express from 'express'
import auth from './routes/auth.js'
import project from './routes/project.js'
import user from './routes/user.js'
import ticket from './routes/ticket.js'

const app = express()
const { __PORT__ } = process.env

app.use(express.json())

app.use('/auth', auth)
app.use('/project', project)
app.use('/user', user)
app.use('/ticket', ticket)

app.listen(__PORT__, onListen)
function onListen (err) {
  if (err) return console.log(err)
  console.log('server OK on port:', __PORT__)
}
