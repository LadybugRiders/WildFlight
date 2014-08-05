"use strict";

//>>LREditor.Behaviour.name: Finish

var Finish = function(_gameobject) {
	LR.Behaviour.call(this, _gameobject);
};

Finish.prototype = Object.create(LR.Behaviour.prototype);
Finish.prototype.constructor = Finish;

Finish.prototype.onBeginContact = function(_otherBody, _myShape, _otherShape, _equation){
  // get playerbehaviour
  var behaviourPlayer = _otherBody.go.getBehaviour(Player);
  // stop the player
  behaviourPlayer.stop();

  // stop the timer
  var currentState = this.go.game.state.getCurrentState();
  var timer = currentState.getGameObjectByName("timer");
  var behaviourTimer = timer.getBehaviour(Timer);
  behaviourTimer.stop();
}