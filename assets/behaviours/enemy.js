"use strict";

//>>LREditor.Behaviour.name: Enemy

var Enemy = function(_gameobject) {
	LR.Behaviour.call(this, _gameobject);
};

Enemy.prototype = Object.create(LR.Behaviour.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.start = function() {
  this.hp = 1;
  this.strength = 1;

  this.isEnemy = true;

  // set max speed
  this.speed = new Phaser.Point(0, 0);

  // set finish to false
  this.finish = false;

  this.isFalling = false;
};

Enemy.prototype.update = function() {
  // if Dude doesn't cross the finish line
  if (this.finish == false) {
    if (this.hp <= 0) {
      this.isFalling = true;
      this.go.body.data.gravityScale = 1;
      this.go.body.fixedRotation = false;
    }

    if (this.isFalling) {
      this.go.body.rotateLeft(75);
    }

    if (this.go.body.x < this.go.game.camera.x) {
      this.go.entity.destroy();
    }
  }
};

Enemy.prototype.stop = function() {
  this.finish = true;
};

Enemy.prototype.takesDamage = function(_damages) {
  this.hp -= _damages;
  if (this.hp < 0) {
    this.hp = 0;
  }
};

Enemy.prototype.onBeginContact = function(_otherBody, _myShape, _otherShape, _equation) {
  if (_otherBody) {
    var go = _otherBody.go;

    if (this.isFalling == false) {
      if (go.name == "player") {
        var behaviour = go.getBehaviour(Player);
        if (behaviour) {
          behaviour.takesDamage(this.strength);
        }
      }
    }
  }
};