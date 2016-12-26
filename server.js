
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var dbuser = process.env.DB_USERNAME;
var dbpassword = process.env.DB_PASS;
var db;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect("mongodb://" + dbuser + ":" + dbpassword + "@ds141368.mlab.com:41368/retrospectives", function (err, database) {
  db = database;
  app.listen(3000, function () {
    console.log("listening on port 3000");
  });
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  var retrosData = db.collection('retros').find().toArray(function (err, results) {
    if (err) return console.log(err);
    res.render('index.ejs', { retros: results });
  });
});

app.post('/retros', function (req, res) {
  db.collection('retros').save(req.body, function (err, result) {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});
