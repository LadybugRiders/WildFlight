"use strict";

//>>LREditor.Behaviour.name: LifeManager

var LifeManager = function(_gameobject) {
	LR.Behaviour.call(this, _gameobject);
};

LifeManager.prototype = Object.create(LR.Behaviour.prototype);
LifeManager.prototype.constructor = LifeManager;

LifeManager.prototype.start = function() {
  var pollinator = this.go.game.pollinator;
  if (pollinator) pollinator.on("playerTakesDamage", this.removeLetter, this);
};

LifeManager.prototype.update = function() {
  
};

LifeManager.prototype.removeLetter = function() {
  var letter = this.getLastLetter();
  if (letter) letter.destroy();
};

LifeManager.prototype.getLastLetter = function() {
  var letter = null;

  for (var i = 0; i < this.go.entity.children.length; i++) {
    var child = this.go.entity.children[i];

    if (letter) {
      if (child.cameraOffset.x > letter.cameraOffset.x) {
        letter = child;
      }
    } else {
      letter = child;
    }
  };

  return letter;
};
