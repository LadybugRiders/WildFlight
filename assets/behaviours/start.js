"use strict";

//>>LREditor.Behaviour.name: Start

var Start = function(_gameobject) {
	LR.Behaviour.Button.call(this, _gameobject);
};

Start.prototype = Object.create(LR.Behaviour.Button.prototype);
Start.prototype.constructor = Start;

Start.prototype.onClick = function() {
	// start level 1
  this.entity.game.state.start("Level", true, false, {levelName: "level1"});
};
