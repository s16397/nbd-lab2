var cursor = db.people.aggregate([
    { $match: { sex: "Female",  nationality: "Poland" } },
    { $unwind: "$credit" },
    { $group:
            {
                _id: "$credit.currency",
                totalAmount: { $sum: "$credit.balance_as_float" },
                avgAMount: { $avg: "$credit.balance_as_float" }
            }
    } ]);

while(cursor.hasNext()){
    printjson(cursor.next());
}