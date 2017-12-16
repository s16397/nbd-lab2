var mapFunction = function() {
	if (this.credit) {
		for (var idx = 0; idx < this.credit.length; idx++) {
			var key = this.credit[idx].currency;
			var balanceValue = parseFloat(this.credit[idx].balance);
			if (!isNaN(balanceValue) && key) {
				var value = { 
							 count: 1,
							 totalAmountInCurrency: balanceValue 
							};
				emit(key, value);
			}
		}
	}
};

var reduceFunction = function(keyCurr, amountValues) {
	var sum = 0.0;
	var counter = 0;
	for (var idx = 0; idx < amountValues.length; idx++) {
		sum += amountValues[idx].totalAmountInCurrency;
		counter += amountValues[idx].count;
	}
	var reducedValue = {
						count: counter,
						totalAmountInCurrency: sum
					   };
	return reducedValue;
};

var finalizeFunction = function(keyCurrency, reducedValue) {
	var count = reducedValue.count > 0 ? reducedValue.count : 1;
	var totalAndAvgAmount = {
							 avgAmount: reducedValue.totalAmountInCurrency / reducedValue.count,
							 totalAmount: reducedValue.totalAmountInCurrency
						 };
	return totalAndAvgAmount;
};

db.people.mapReduce(mapFunction, 
					reduceFunction, 
					{
						out: { replace: "totalAmountsByCurrenciesWomenPL" },
						query: { sex: "Female", nationality: "Poland" },
						finalize: finalizeFunction
					} );

var cursor = db.getCollection("totalAmountsByCurrenciesWomenPL").find({});
while(cursor.hasNext()){
    printjson(cursor.next());
}

