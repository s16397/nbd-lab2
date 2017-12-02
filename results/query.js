db.people.deleteMany({height: {$gt: "190"}})
.forEach(function(person){
  printjson(person);
});