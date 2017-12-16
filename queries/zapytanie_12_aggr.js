var cursor = db.people.aggregate([
    { $unwind: "$credit" },
    { $group:
            {
                _id: "$credit.currency",
                totalAmount: { $sum: "$credit.balance_as_float" }
            }
    } ]);

while(cursor.hasNext()){
    printjson(cursor.next());
}