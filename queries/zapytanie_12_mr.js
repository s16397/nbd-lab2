var mapFunction = function() {
	if (this.credit) {
		for (var idx = 0; idx < this.credit.length; idx++) {
			var key = this.credit[idx].currency;
			var balanceValue = parseFloat(this.credit[idx].balance);
			if (!isNaN(balanceValue) && key) {
				var value = { totalAmountInCurrency: balanceValue };
				emit(key, value);
			}
		}
	}
};

var reduceFunction = function(keyCurr, amountValues) {
	var sum = 0.0;
	for (var idx = 0; idx < amountValues.length; idx++) {
		sum += amountValues[idx].totalAmountInCurrency;
	}
	var reducedValue = { totalAmountInCurrency: sum };
	return reducedValue;
};

db.people.mapReduce(mapFunction, 
					reduceFunction, 
					{
						out: { replace: "totalAmountsByCurrencies" } 
					} );

var cursor = db.getCollection("totalAmountsByCurrencies").find({});
while(cursor.hasNext()){
    printjson(cursor.next());
}