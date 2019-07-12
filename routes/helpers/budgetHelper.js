// Fixer API Key  = b3cd14e3ec2f46e642f946f1c6a67b9d


var budgetHelper = (function() {

    var Expense = function(data) {
        this.id = data._id;
        this.item = data.item;
        this.value = data.price;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    var Income = function (data) {
        this.id = data._id;
        this.item = data.item;
        this.value = data.price;
        this.percentage = -1;
    };

    var calculateTotal = (data) => {
        var sum = 0;
        data.forEach((el) => {
            sum += parseInt(el.price);
        });
        return sum;
    };

    var populateAllItems = (input, data, type) => {
        let itemNew;
        // create new item based on 'inc' or 'exp' type
        if (type === 'exp') {
            input.expenses.forEach((el) => {
                //create new expense item
                newItem = new Expense(el);

                //calculate percentage
                newItem.calcPercentage(data.totals.exp);

                //push new item in data object
                data.allItems[type].indexOf(newItem) === -1 ? data.allItems[type].push(newItem) : console.log('already exists');
            });
        }
        else if (type === 'inc') {

            //create new item based on 'inc' or 'exp' type
            input.income.forEach((el) => {
                newItem = new Expense(el);
                // borrow calPercentage from exp prototype
                Expense.prototype.calcPercentage.call(newItem, data.totals.inc);

                // push new item into the data array if it doesn't exist
                data.allItems[type].indexOf(newItem) === -1 ? data.allItems[type].push(newItem) : console.log('already exists');
            });
        }
    };

    var calculateBudgetPercentage = (dataTotals) => {
        return Math.round((dataTotals.exp / dataTotals.inc) * 100);
    };

    return {

        populateData (input) {

            var data = {
                allItems: {
                    exp: [],
                    inc: [],
                },
                totals: {
                    exp: 0,
                    inc: 0
                },
                budget: 0,
                percentage: -1
            };

            //calculate totals
            data.totals.inc = calculateTotal(input.income);
            data.totals.exp = calculateTotal(input.expenses);
            data.budget = data.totals.inc - data.totals.exp;

            //populate income and expense arrays
            populateAllItems(input, data, 'exp');
            populateAllItems(input, data, 'inc');

            //calculate budget Percentage
            data.percentage = calculateBudgetPercentage(data.totals);

            console.log(data);
            return data;
        },

    };
})();

module.exports = budgetHelper;


// export function budgetController() {
//     alert("This is the budget Controller");
// }
