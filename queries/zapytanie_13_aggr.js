var cursor = db.people.aggregate([
    { $group: {
            _id: null,
            uniqueJobs: { $addToSet: '$job'}
        }}
]);

while(cursor.hasNext()){
    printjson(cursor.next());
}
