"use strict";

//>>LREditor.Behaviour.name: Bullet

var Bullet = function(_gameobject) {
	LR.Behaviour.call(this, _gameobject);
};

Bullet.prototype = Object.create(LR.Behaviour.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.start = function() {
  this.hp = 1;
  this.strength = 1;
  this.range = 300;

  // set max speed
  this.speed = new Phaser.Point(200, 0);

  // set finish to false
  this.finish = false;

  this.player = this.go.game.state.getCurrentState().getGameObjectByName("player");
};

Bullet.prototype.update = function() {
  // if Dude doesn't cross the finish line
  if (this.finish == false) {
    this.go.body.moveRight(this.speed.x);

    if (this.player) {
      var distanceX = Math.abs(this.go.body.x - this.player.body.x);
      if (distanceX > this.range) {
        this.go.entity.destroy();
      }
    }
  }
};

Bullet.prototype.onBeginContact = function(_otherBody, _myShape, _otherShape, _equation) {
  var go = _otherBody.sprite.go;
  console.log(go.layer);

  var behaviour = go.getBehaviour(Enemy);
  if (behaviour) {
    console.log("ENEMY: " + behaviour.go.name);
    behaviour.takesDamage(this.strength);
  }

  //this.go.entity.destroy();
};

Bullet.SpawnBullet = function(_game, _x, _y) {
  var bullet = new LR.Entity.Sprite(
    _game,
    0, 0,
    "bullet",
    "bullet"
  );

  bullet.go.enablePhysics(Phaser.Physics.P2.Body.DYNAMIC);
  bullet.go.changeLayer("bullet");
  bullet.go.enableSensor();
  bullet.go.enableEvents();
  bullet.body.data.gravityScale = 0;
  bullet.body.reset(_x, _y);

  var behaviour = new Bullet(bullet.go);
  bullet.go.addBehaviour(behaviour);

  bullet.start();

  _game.state.getCurrentState().addGameObject(bullet.go, true);

  return bullet;
};