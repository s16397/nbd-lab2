var mapFunction = function() {
	var value = { jobList: [this.job] };
	emit("uniqueJobs", value)
};

var reduceFunction = function(key, jobListLists) {
	var uniqueJobs = new Set();
	for (var i = 0; i < jobListLists.length; i++) {
		if (jobListLists[i].jobList) {
			for (var j = 0; j < jobListLists[i].jobList.length; j++) {
				uniqueJobs.add(jobListLists[i].jobList[j]);
			}
		}
	}
	var reducedValue = { jobList: Array.from(uniqueJobs) };
	return reducedValue;
};

db.people.mapReduce(mapFunction, 
					reduceFunction, 
					{
						out: { replace: "uniqueJobs" } 
					} );

var cursor = db.getCollection("uniqueJobs").find({});
while(cursor.hasNext()){
    printjson(cursor.next());
}