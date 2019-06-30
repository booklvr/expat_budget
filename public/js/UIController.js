var UIController = (function() {

    var DOMStrings = {
        dateLabel: '.budget__title--month',
        showForm: '.show__form',
        toggleForm: '.toggle__form'
    };

    return {
        displayMonth: function() {
            var now, day, month, year;

            now = new Date();

            day = now.getUTCDate();

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            month = now.getMonth();
            year = now.getFullYear();

            document.querySelector(DOMStrings.dateLabel).textContent = `${months[month]} ${day}, ${year}`;
        },

        showUpdateForm: function() {
            console.log('you made it to the update form');
            var x = document.querySelector(DOMStrings.toggleForm);
            console.log(x.style.display);
            if (x.style.display === 'none') {
                x.style.display = 'flex';
            } else {
                x.style.display = 'none';
            }
        },



        getDOMStrings: function() {
            return DOMStrings;
        }
    };
})();

export{UIController};
