// import { budgetController } from './budgetController.js';
import { UIController as UI } from './UIController.js';
import { budgetController as budget } from './budgetController.js';


// budget();
// UI();

var controller = (function(budget, UI) {
    // UI();
    // budget();

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMStrings();
    };

    return {
        init: function () {
            console.log("Application has started");
            UI.displayMonth();
        }
    };

})(budget, UI);


controller.init();
