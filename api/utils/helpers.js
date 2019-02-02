const request = require('request')

function apiRequest(url, method, object, callback) {
  request
    .post({
      url: url,
      form: {
        method: method,
        p0: JSON.stringify(object)
      },
    }, callback)
    .setHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
}

function processRequest(err, body, res) {
  if (err) {
    return console.error('Błąd:', err)
  }
  data = JSON.parse(body)
  res.json(data.success)  
}

exports.apiRequest = apiRequest
exports.processRequest = processRequest