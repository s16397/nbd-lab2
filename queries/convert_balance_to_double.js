db.people.find({}).forEach(function(doc){
    if (doc.credit.length) {
        if (doc.credit.length) {
            for (var i = 0; i < doc.credit.length; i++) {
                var balanceValue = doc.credit[i].balance;
                doc.credit[i].balance_as_float = parseFloat(balanceValue) || 0;
                db.people.save(doc);
            }
        }
    }
});