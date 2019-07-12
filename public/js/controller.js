// import { budgetController } from './budgetController.js';
import { UIController as UI } from './UIController.js';
import { budgetController as budget } from './budgetController.js';




var controller = (function(budget, UI) {


    var setupEventListeners = function() {
        var DOM = UI.getDOMStrings();


        // show the update form
        document.querySelector(DOM.container).addEventListener('click', UI.showUpdateForm);
    };


    return {
        init: function () {
            console.log("Application has started");
            UI.displayMonth();
            setupEventListeners();
        }
    };

})(budget, UI);


controller.init();
