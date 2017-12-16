db.people.find({}).forEach(function(doc){
	doc.height_as_float = parseFloat(doc.height) || 170.0
	db.people.save(doc)
})