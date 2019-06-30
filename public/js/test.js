
    const item = "car"
    const price = "500"
    // const inc_or_exp = req.body.inc_or_exp;


    const newBudgetItem = {
        item: item,
        price: price,
    };

    var obj = {};
    obj["expense"] = newBudgetItem;

    console.log(obj);

