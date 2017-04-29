Creep.prototype = {
    run: function() {
          if (this.memory.role == 'harvester') {
      harvester.harvest(creep);
    }
    else if (this.memory.role == 'builder') {
      builder.build(creep);
    }
    else if (this.memory.role == 'guard') {
        guard.guard(creep);
    }
    else if (this.memory.role == 'upgrader') {
        upgrader.upgrade(creep);
    }
    },
}
