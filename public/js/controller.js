// import { budgetController } from './budgetController.js';
import { UIController as UI } from './UIController.js';
import { budgetController as budget } from './budgetController.js';


// budget();
// UI();

var controller = (function(budget, UI) {
    // UI();
    // budget();

    var setupEventListeners = function() {
        var DOM = UI.getDOMStrings();

        document.querySelector(DOM.showForm).addEventListener('click', UI.showUpdateForm);
    };

    var  alertRefresh = function() {
        document.querySelector(DOM.toggle)
    }

    return {
        init: function () {
            console.log("Application has started");
            UI.displayMonth();
            setupEventListeners();
        }
    };

})(budget, UI);


controller.init();
