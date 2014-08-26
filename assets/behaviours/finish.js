"use strict";

//>>LREditor.Behaviour.name: Finish

var Finish = function(_gameobject) {
	LR.Behaviour.call(this, _gameobject);
};

Finish.prototype = Object.create(LR.Behaviour.prototype);
Finish.prototype.constructor = Finish;

Finish.prototype.onBeginContact = function(_otherBody, _myShape, _otherShape, _equation){
  var pollinator = this.go.game.pollinator;
  if (pollinator) pollinator.dispatch("playerFinishes");

  // create the timer for finish the level
  this.entity.game.time.events.add(
    Phaser.Timer.SECOND * 1,
    function() {
    	var state = this.go.game.state.getCurrentState();
	    this.entity.game.state.start("Level", true, false, {levelName: state.levelname});
	  },
    this
   );
}