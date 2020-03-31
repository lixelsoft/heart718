const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const logger = require('morgan');
const backendConfig = require('./config').backend;

app.use(logger(function (tokens, req, res) {
  var body = req.body;
  delete body.password;
  delete body.verify;
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms /',
    new Date().toLocaleString(), ' / ',
    JSON.stringify(body)
  ].join(' ')
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

require('./route')(app);

// IDEA: WebServer Listen From Port.
app.listen(backendConfig.port, function(){
  console.log(`Connected , ${backendConfig.port} port !!!`);
});




