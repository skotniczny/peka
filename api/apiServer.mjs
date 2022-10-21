import cors from 'cors'
import express from 'express'

import { apiRequest } from './utils/helpers.mjs'

const app = express()
const port = (process.env.PORT || 3001)

const api = 'http://www.peka.poznan.pl/vm/method.vm?ts='

app.use(cors())
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url} from ${req.headers['user-agent']}`)
  next()
})

app.get('/stopPoints/:query', async (req, res) => {
  const data = await apiRequest(api + new Date().getTime(), 'getStopPoints', { pattern: decodeURIComponent(req.params.query) })
  res.json(data.success)
})

app.get('/streets/:query', async (req, res) => {
  const data = await apiRequest(api + new Date().getTime(), 'getStreets', { pattern: decodeURIComponent(req.params.query) })
  res.json(data.success)
})

app.get('/bollardsByStopPoint/:name', async (req, res) => {
  const data = await apiRequest(api + new Date().getTime(), 'getBollardsByStopPoint', { name: decodeURIComponent(req.params.name) })
  res.json(data.success)
})

app.get('/bollardsByStreet/:name', async (req, res) => {
  const data = await apiRequest(api + new Date().getTime(), 'getBollardsByStreet', { name: decodeURIComponent(req.params.name) })
  res.json(data.success)
})

app.get('/times/:bollard', async (req, res) => {
  const data = await apiRequest(api + new Date().getTime(), 'getTimes', { symbol: req.params.bollard })
  res.json(data.success)
})

app.get('/bollardsByLine/:line', async (req, res) => {
  const data = await apiRequest(api + new Date().getTime(), 'getBollardsByLine', { name: req.params.line })
  res.json(data.success)
})

app.listen(port, (err) => {
  if (err) return console.error(err)
  console.info(`API Server running on http://localhost:${port}`)
})
