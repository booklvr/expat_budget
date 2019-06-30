

var UIController = (function() {

    var DOMStrings = {
        dateLabel: '.budget__title--month',
    };

    return {
        displayMonth: function() {
            var now, day, month, year;

            now = new Date();

            day = now.getDay();

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            month = now.getMonth();
            year = now.getFullYear();

            document.querySelector(DOMStrings.dateLabel).textContent = `${months[month]} ${day}, ${year}`;
        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    };
})();

export{UIController};
