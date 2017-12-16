var cursor = db.people.aggregate([ {
        $project: {
                nationality: 1,
                bmi: {
                        $let: {
                            vars: {
                                heightSquare: { $multiply: [ '$height_as_float', '$height_as_float' ] }
                            },
                            in: { $divide: [ '$weight_as_float', "$$heightSquare" ] }

                        }
                }
        }
    }, {
        $group: {
            _id: '$nationality',
            minBmi: { $min: '$bmi' },
            avgBmi: { $avg: '$bmi' },
            maxBmi: { $max: '$bmi' }
        }
    }
]);

while(cursor.hasNext()){
    printjson(cursor.next());
}
