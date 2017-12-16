var mapFunction = function() {
	function calculateBmi(heightAsString, weightAsString) {
		var height = parseFloat(heightAsString);
		var weight = parseFloat(weightAsString);
		var result = null;
		if (!isNaN(height) && !isNaN(height)) {
			if ( height > 0 && weight > 0) {
				result = weight / (height * height);
			}
		}
		return result;
	}
	var bmi = calculateBmi(this.height, this.weight);
	if (!isNaN(bmi) && this.nationality ) {
		var value = { 
						count: 1,
						maxBmi: bmi,
						minBmi: bmi,
						sumBmi: bmi
					};
		emit(this.nationality, value);
	}
};

var reduceFunction = function(keyNationality, bmiObjectValues) {
	var highestBmi = 0.0;
	var lowestBmi = 1000.0
	var sumOfBmis = 0.0;
	var counter = 0;
	
	for (var idx = 0; idx < bmiObjectValues.length; idx++) {
		var currentMaxBmi = bmiObjectValues[idx].maxBmi;
		if (currentMaxBmi > highestBmi) {
			highestBmi = currentMaxBmi;
		}
		var currentMinBmi = bmiObjectValues[idx].minBmi;
		if (currentMinBmi < lowestBmi) {
			lowestBmi = currentMinBmi;
		}
		sumOfBmis += bmiObjectValues[idx].sumBmi;
		counter += bmiObjectValues[idx].count;
	}
	var reducedValue = {
						count: counter,
						maxBmi: highestBmi,
						minBmi: lowestBmi,
						sumBmi: sumOfBmis
					   };
	return reducedValue;
};

var finalizeFunction = function(keyNationality, reducedValue) {
	var count = reducedValue.count > 0 ? reducedValue.count : 1;
	var bmiObjectValue = {
							maxBmi: reducedValue.maxBmi,
							minBmi: reducedValue.minBmi,
							avgBmi: reducedValue.sumBmi / count
						 };
	return bmiObjectValue;
};

db.people.mapReduce( mapFunction, 
					 reduceFunction, 
					 {
						 out: { replace: "maxMinAvgBmiByNationality" },
						 finalize: finalizeFunction
					 } );

var cursor = db.getCollection("maxMinAvgBmiByNationality").find({});
while(cursor.hasNext()){
    printjson(cursor.next());
}

