var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/polls');

var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   //connected now!
// })

var pollSchema = mongoose.Schema({
  // pollName: String,
  id: Number,
  inputName: {
    type: String,
    unique: true
  },
  inputCount: Number
})

var Poll = mongoose.model('Poll', pollSchema);
// pollSchema.methods.increment = function(callback){
//   var count = this.inputCount
//   ? callback(count++)
// }

//need to save
var save = function(inputVariable){

  var currentPoll = new Poll(
    {
      inputName: inputVariable,
      inputCount: 1
    });


  currentPoll.save(function(error, input){
    if(error) {
      Poll.findOne({ inputName: inputVariable}, function(err, doc){
        console.log('found duplicate!');
        doc.inputCount++;
        // console.log('count incremented! Now is: ', doc.inputCount)
        // doc.inputCount.$inc();
        doc.save(function(error, input){
          if(error){
            console.log('error in incrementing');
          } else {
            console.log('saved new value', doc.inputCount);
          }
        });
      });
    } else {
      console.log('saved!')
    }
  });
}

var find = function(callback){
  Poll.find(function(err, people){
    if(err){
      console.log('error in find');
    } else {
      // console.log('people list: ', people);
      return callback(people);
    }
  })
  // var personInfo;
  // Poll.findOne({ inputName: inputVariable}, function(err, doc){
  //   console.log(person)
  //   personInfo = {
  //     name: doc.inputName,
  //     count: doc.inputCount
  //   }
  // });
  // console.log('personInfo: ', personInfo);
}

module.exports.save = save;
module.exports.find = find;