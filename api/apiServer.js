const http = require('http')
const cors = require('cors')
const Express = require('express')

const { apiRequest, processRequest } = require('./utils/helpers.js')

const app = new Express()
const server = new http.Server(app)
const port = (process.env.PORT || 3001)

const api = 'http://www.peka.poznan.pl/vm/method.vm?ts='

app.use(cors())
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url} from ${req.headers['user-agent']}`)
  next()
})

app.get('/stopPoints/:query', (req, res) => {
  apiRequest(api + new Date().getTime(), 'getStopPoints', { pattern: decodeURIComponent(req.params.query) }, (err, httpResponse, body) => {
    processRequest(err, body, res)
  })
})

app.get('/streets/:query', (req, res) => {
  apiRequest(api + new Date().getTime(), 'getStreets', { pattern: decodeURIComponent(req.params.query) }, (err, httpResponse, body) => {
    processRequest(err, body, res)
  })
})

app.get('/bollardsByStopPoint/:name', (req, res) => {
  apiRequest(api + new Date().getTime(), 'getBollardsByStopPoint', { name: decodeURIComponent(req.params.name)}, (err, httpResponse, body) => {
    processRequest(err, body, res)
  })
})

app.get('/bollardsByStreet/:name', (req, res) => {
  apiRequest(api + new Date().getTime(), 'getBollardsByStreet', { name: decodeURIComponent(req.params.name) }, (err, httpResponse, body) => {
    processRequest(err, body, res)
  })
})

app.get('/times/:bollard', (req, res) => {
  apiRequest(api + new Date().getTime(), 'getTimes', { symbol: req.params.bollard }, (err, httpResponse, body) => {
    processRequest(err, body, res)
  })
})

app.get('/bollardsByLine/:line', (req, res) => {
  apiRequest(api + new Date().getTime(), 'getBollardsByLine', { name: req.params.line }, (err, httpResponse, body) => {
    processRequest(err, body, res)
  })
})

server.listen(port, (err) => {
  if (err) return console.error(err)
  console.info(`API Server running on http://localhost:${port}`)
})
