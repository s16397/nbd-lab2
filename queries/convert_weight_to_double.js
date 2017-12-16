db.people.find({}).forEach(function(doc){
	doc.weight_as_float = parseFloat(doc.weight) || 60.0
	db.people.save(doc)
})