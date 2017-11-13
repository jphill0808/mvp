var express = require('express')
var cors = require('cors')//Access-Control-Allow-Origin fix
var app = express()
var bodyParser = require('body-parser')
var mongodb = require('../db/db.js')

/*include ...use(express.static(__dirname + 'some location for html or other hosting file'))*/

app.use(express.static(__dirname + '/../public'));
app.use(cors())// use the cors

app.post('/', bodyParser(), function(req, res){
  // res.send('POST request to the homepage')
  var inputSubject = Object.keys(req.body).join('');
  // console.log("input: ", inputSubject);
  mongodb.save(inputSubject);
  mongodb.find(function(people){
    var person = {
      name: '',
     count: 0
    }
    var popularName = 'no-one';
    var popularCount = 0;
    people.forEach(function(element){
      if(element.inputCount > popularCount){
        popularCount = element.inputCount;
        popularName = element.inputName;
      }
    });
    person.name = popularName;
    person.count = popularCount;
    // console.log(person)
    res.send(person);
    console.log('sent!')
  })
})

app.get('/stored', function(req, res){
  // res.send('GET request to the homepage');
  console.log('we are in get!')
  var person = {
    name: '',
    count: 0
  }
  mongodb.find(function(people){
    var popularName = 'no-one';
    var popularCount = 0;
    people.forEach(function(element){
      if(element.inputCount > popularCount){
        popularCount = element.inputCount;
        popularName = element.inputName;
      }
    });
    person.name = popularName;
    person.count = popularCount;
    // console.log(person)
    res.send(person);
    console.log('sent!')
  })
})
app.listen(8888, function(){
  console.log('listening to port 8888!');
})