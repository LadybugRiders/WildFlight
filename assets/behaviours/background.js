"use strict";

//>>LREditor.Behaviour.name: Background

var Background = function(_gameobject) {
	LR.Behaviour.call(this, _gameobject);
};

Background.prototype = Object.create(LR.Behaviour.prototype);
Background.prototype.constructor = Background;

Background.prototype.start = function() {
  var pollinator = this.go.game.pollinator;
  if (pollinator) pollinator.on("playerFinishes", this.callbackFinish, this);
};

Background.prototype.callbackFinish = function() {
  this.go.entity.stopScroll();
};