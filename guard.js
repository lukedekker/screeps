module.exports = {
  guard: function (creep) {

    const target = StructureSpawn.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(target) {
        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }

  },
  createGuard: function() {
    var guards = 1;
    var stats = [3, 1, 1];
    // if (forUpgrade.drop) {
    //   stats[2]++;
    // }
    var parts = [];
    for (var i = 0; i < stats.length; i++) {
      switch (i) {
        case 0:
          for(var j = 0; j < stats[i]; j++) {
            parts.push(TOUGH);
          }
          break;
        case 1:
          for(var j = 0; j < stats[i]; j++) {
            parts.push(MOVE);
          }
          break;
        case 2:
          for(var j = 0; j < stats[i]; j++) {
            parts.push(ATTACK);
          }
          break;
      }
    }

    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      if (creep.memory.role == 'guard') {
        guards++;
      }
    }
    return Game.spawns.Spawn1.createCreep(parts, 'Guard' + guards, {role: 'guard'});
  },
}
