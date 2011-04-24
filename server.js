var http = require('http');
var googlesets = require('googlesets');
var express = require('express');
var app = express.createServer();
app.use(express.bodyParser());
app.use(app.router);

app.use(express.static('.'));

app.post('/gimme', function(req, res) {
  googlesets.large(req.body.words, function(items) {
    res.send(items);
  });
});

app.listen(9583);
