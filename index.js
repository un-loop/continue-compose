const merge = require('./src/merge-action');
const reducer = require('./src/promise-reducer');
const select = require('./src/select-action');
const shortcircuit = require('./src/shortcircuit-action');
const falseyShort = shortcircuit((input) => !input);

module.exports = function(actions) {
    const workingActions = [...actions];
    for(let i = 0; i < workingActions.length; i++) { //turn objects to actions
        if (typeof workingActions[i] === "function") continue;

        let action = workingActions[i].action;
        if (!action) {
            throw new Error("Action is required");
        }

        if (typeof action !== "function") {
            throw new Error("Action must be a function")
        }

        if (workingActions[i].select) {
            if (typeof workingActions[i].select !== "function") {
                throw new Error("Select must be a function");
            }

            action = select(workingActions[i].select)(action);
        }

        if (workingActions[i].merge) {
            action = merge(action);
        }

        if (workingActions[i].shortcircut) {
            if (typeof workingActions[i].shortcircuit !== "function") {
                throw new Error("Shortcircut must be a function");
            }

            action = shortcircuit(workingActions[i].shortcircuit)(action);
        }

        if (workingActions[i].shortOnFalse) {
            action = falseyShort(action);
        }

        workingActions[i] = action;
    }

    this.reduce = (initial) => workingActions.reduce(reducer, initial);
}


module.exports.merge = merge;
module.exports.reducer = reducer;
module.exports.select = select;
module.exports.shortcircuit = shortcircuit;
module.exports.falseyShort = falseyShort;
