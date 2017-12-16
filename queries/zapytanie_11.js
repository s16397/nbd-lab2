var cursor = db.people.aggregate([
					 { $group: {
						 _id: '$sex',
						 avgWeight: { $avg: '$weight_as_float'},
						 avgHeight: { $avg: '$height_as_float'}
					 }}
					]);

while(cursor.hasNext()){
	printjson(cursor.next());
}
