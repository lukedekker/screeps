module.exports = {
    harvest: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0]);
          }
        }
        else {
            if (!creep.memory.drop) {
                if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(Game.spawns.Spawn1);
                }
          }
          else {
              var target = Game.spawns.Spawn1;
              for (var name in Game.creeps) {
                  var upgrader = Game.creeps[name];
                  if (upgrader.memory.role == 'upgrader') {
                      target = upgrader;
                  }
              }
              if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target);
              }
            }
        }

    },
    createHarvester: function(forUpgrade) {
        var harvesters = 1;
        var stats = [1, 1, 1];
        if (forUpgrade.drop) {
            stats[2]++;
        }
        var parts = [];
        for (var i = 0; i < stats.length; i++) {
            switch (i) {
                case 0:
                    for(var j = 0; j < stats[i]; j++) {
                        parts.push(WORK);
                    }
                    break;
                case 1:
                    for(var j = 0; j < stats[i]; j++) {
                        parts.push(CARRY);
                    }
                    break;
                case 2:
                    for(var j = 0; j < stats[i]; j++) {
                        parts.push(MOVE);
                    }
                    break;
            }
        }

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                harvesters++;
            }
        }
        return Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], 'Worker' + harvesters, {role: 'harvester', drop: forUpgrade.drop});
    },
}
