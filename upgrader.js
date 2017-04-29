module.exports = {
    upgrade: function(creep) {
        //if (creep.carry.energy > creep.carryCapacity) {
        //     var sources = creep.room.find(FIND_SOURCES);
        //     if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //      creep.moveTo(sources[0]);
        //  }
        // }
        // else {
            if(creep.room.controller) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        // }
    },
    createUpgrader: function() {
        var upgraders = 1;
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'upgrader') {
                upgraders++;
            }
        }
        return Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], 'Upgrader' + upgraders, {role: 'upgrader'});
    }
}
