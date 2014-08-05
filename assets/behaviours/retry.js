"use strict";

//>>LREditor.Behaviour.name: Retry

var Retry = function(_gameobject) {
	LR.Behaviour.Button.call(this, _gameobject);
};

Retry.prototype = Object.create(LR.Behaviour.Button.prototype);
Retry.prototype.constructor = Retry;

Retry.prototype.onClick = function() {
	var state = this.go.game.state.getCurrentState();
	// restart the level
  this.entity.game.state.start("Level", true, false, {levelName: state.levelname});
};
