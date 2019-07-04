var UIController = (function() {

    var DOMStrings = {
        dateLabel: '.budget__title--month',
        container: '.container',
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

            var showItem = event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling;

            // if show form if hidden
            if (showItem && showItem.classList.contains("update__form")) {
                if (showItem.classList.contains('hide__form')) {
                    showItem.classList.remove("hide__form");
                    showItem.firstElementChild.firstElementChild.focus();
                    // console.log(showItem.className);
                } else {
                    showItem.classList.add("class", "hide__form");
                }
            };


           // showItem.setAttribute("class", "toggle__form");
           // console.log(itemID.className);



            // console.log(typeof itemID);
            // console.log(itemID.style);
            // console.log(itemID.class);

            // if (itemID.style.display === 'none') {
            //     itemID.style.display = 'flex';
            // } else {
            //     itemID.style.display = 'none';
            // }

            // itemID.style.display = "flex";

            // var x = document.querySelector(DOMStrings.toggleForm);
            // console.log(x.style.display);
            // if (x.style.display === 'none') {
            //     x.style.display = 'flex';
            // } else {
            //     x.style.display = 'none';
            // }
        },



        getDOMStrings: function() {
            return DOMStrings;
        }
    };
})();

export{UIController};
