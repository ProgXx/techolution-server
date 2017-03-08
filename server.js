const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//configuration
mongoose.connect('mongodb://anurag:mongo@ds123370.mlab.com:23370/techolution');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Database

var Car = mongoose.model('Car',{
  make: String,
  model: String,
  description: String,
  image: String
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/cars',function (req,res) {
  Car.find(function (err,cars) {
    if(err) return res.send(err);
    res.json(cars);
  })
})

app.post('/api/cars',function(req,res){
  Car.create({
    make : req.body.make,
    model : req.body.model,
    description : req.body.description,
    image : req.body.image
  },function (err,car) {
    if(err) res.send(err);
    Car.find(function (err,cars) {
      if(err) res.send(err);
      res.json(cars);
    })
  })
})

app.delete('/api/cars/:id',function (req,res) {
  Car.remove({
    _id : req.params.id
  },function (err,todo) {
    if(err) res.send(err);
    Car.find(function (err,cars) {
      if(err) res.send(err);
      res.json(cars);
    })
  })
})

app.listen(8080);
