var builder = require('builder');
var config = require('config');
var guard = require('guard');
var harvester = require('harvester');
var upgrader = require('upgrader');
require('lib');

module.exports.loop = function () {
    for(var name in Game.creeps) {
    var creep = Game.creeps[name];
      creep.run;
  }
  config.creepManagement();
};
