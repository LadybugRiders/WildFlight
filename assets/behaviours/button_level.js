"use strict";

//>>LREditor.Behaviour.name: ButtonLevel

var ButtonLevel = function(_gameobject) {
	LR.Behaviour.Button.call(this, _gameobject);
};

ButtonLevel.prototype = Object.create(LR.Behaviour.Button.prototype);
ButtonLevel.prototype.constructor = ButtonLevel;

ButtonLevel.prototype.create = function(_args) {
	this.levelname = _args.levelname;
};

ButtonLevel.prototype.onClick = function() {
	// start the level
	if (typeof this.levelname === "string") {
  	this.entity.game.state.start(
  		"Level", true, false, {levelName: this.levelname}
  	);
	}
};
