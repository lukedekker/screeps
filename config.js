var _ = require('lodash');

module.exports = {
    creepManagement: function() {
        var config = this.configuration();

        if (typeof Memory.spawnStage == 'undefined') {
            Memory.spawnStage = {stage: 0, quantity: 0};
        }
        var spawnStage = Memory.spawnStage.stage;

        var role = config.creeps[spawnStage].role;
        var roleCap = this.titleCase(role);
        var createFunc = 'create' + roleCap;

        if (typeof config.creeps[spawnStage].options != 'undefined') {
            var response = require(role)[createFunc](config.creeps[spawnStage].options);
        }
        else {
            var response = require(role)[createFunc]();
        }

        if(_.isString(response)) {
            console.log('Creep Created\n  Type: ' + roleCap + '\n  Name: ' + response);
            Memory.spawnStage.quantity++;
            if (Memory.spawnStage.quantity == config.creeps[spawnStage].quantity) {
                Memory.spawnStage.stage++;
                Memory.spawnStage.quantity = 0;
                if (typeof config.creeps[Memory.spawnStage.stage] == 'undefined') {
                    Memory.spawnStage.stage = 0;
                }
            }
        }
        else if (response !== -6 && response !== -4) {
            console.log('Spawn error: '+ response);
        }
    },
    configuration: function() {
        return {
            creeps: [
                {quantity: 2, role: 'harvester', options: {drop: false}},
                {quantity: 1, role: 'guard', stats: [3, 2, 1]},
                {quantity: 1, role: 'harvester', options: {drop: true}},
                {quantity: 3, role: 'guard', stats: [4, 2, 2]},
                {quantity: 1, role: 'upgrader'},
                //{quantity: 1, role: 'builder'}
            ]
        };
    },
    titleCase: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
