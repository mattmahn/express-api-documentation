import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'

import api from './api'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send(`You're probably looking for ${req.protocol}://${req.get('Host')}/api`)
})

app.use('/api', api)

app.use((req, res) => {
  res.sendStatus(404)
})

app.listen(3000, () => {
  console.log(`Listening at http://localhost:3000`)
})
