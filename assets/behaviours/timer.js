"use strict";

//>>LREditor.Behaviour.name: Timer

var Timer = function(_gameobject) {
	LR.Behaviour.call(this, _gameobject);
};

Timer.prototype = Object.create(LR.Behaviour.prototype);
Timer.prototype.constructor = Timer;

Timer.prototype.start = function() {
  // save base text
  this.baseText = this.go.entity.text;
  this.elapsedTime = 0;
	this.keepUpdating = true;
};

Timer.prototype.update = function() {
	if (this.keepUpdating == true) {
		this.elapsedTime += this.go.game.time.elapsed;
	  
	  var round = Math.round(this.elapsedTime / 100) / 10;
	  this.go.entity.text = this.baseText + " " + round;
	}
};

Timer.prototype.stop = function() {
	this.keepUpdating = false;

	// center the timer
	this.go.entity.cameraOffset.x = this.go.game.camera.width * 0.5;
	this.go.entity.cameraOffset.y = this.go.game.camera.height * 0.5;
	// double font size
	this.go.entity.fontSize = this.go.entity.fontSize * 2
};