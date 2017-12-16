var mapFunction = function() {
		var heightValue = parseFloat(this.height);
		var weightValue = parseFloat(this.weight);
		if (!isNaN(heightValue) && !isNaN(weightValue)) {
		  	var value = {
						 count: 1,
						 height: heightValue,
						 weight: weightValue
						};
			emit(this.sex, value);
		}

};

var reduceFunction = function(key, valuesWithCount) {
	var counter = 0;
	var heightSum = 0.0;
	var weightSum = 0.0;
	for (var idx = 0; idx < valuesWithCount.length; idx++) {
		counter += valuesWithCount[idx].count
		heightSum += valuesWithCount[idx].height;
		weightSum += valuesWithCount[idx].weight;
	}
	var reducedVal = {
						count: counter, 
						height: heightSum, 
						weight: weightSum 
					 }; 
	
	return reducedVal;
};

var finalizeFunction = function(key, reducedVal) {
	var avgHeightVal = reducedVal.height / reducedVal.count;
	var avgWeightVal = reducedVal.weight / reducedVal.count;
	var avgVal = { 
					avgHeight: avgHeightVal, 
					avgWeight: avgWeightVal 
				 };
	return avgVal;
}


db.people.mapReduce( mapFunction,
					 reduceFunction, 
					 {
						 out: { replace: "avgHeightWeight" },
						 finalize: finalizeFunction
					 }
					);

var cursor = db.getCollection("avgHeightWeight").find({});
while(cursor.hasNext()){
    printjson(cursor.next());
}

								