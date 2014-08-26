"use strict";

//>>LREditor.Behaviour.name: Bullet

var Bullet = function(_gameobject, _direction) {
	LR.Behaviour.call(this, _gameobject);

  this.direction = _direction;
};

Bullet.prototype = Object.create(LR.Behaviour.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.start = function() {
  this.hp = 1;
  this.strength = 1;
  this.range = 200;

  // set max speed
  this.maxSpeed = 250;
  // set speed
  this.speed = new Phaser.Point(
    this.direction.x * this.maxSpeed,
    this.direction.y * this.maxSpeed
  );

  // set rotation
  var rotation = Math.asin(this.direction.x);
  if (this.direction.y > 0) rotation = Math.PI - rotation;
  //this.go.body.rotation = rotation;

  // set finish to false
  this.finish = false;

  this.player = this.go.game.state.getCurrentState().getGameObjectByName("pelo");

  this.tmpVector1 = new Phaser.Point();
  this.tmpVector2 = new Phaser.Point();
};

Bullet.prototype.update = function() {
  // if Dude doesn't cross the finish line
  if (this.finish == false) {
    this.go.body.moveRight(this.speed.x);
    this.go.body.moveDown(this.speed.y);

    if (this.player) {
      this.tmpVector1.set(this.go.body.x, this.go.body.y);
      this.tmpVector2.set(this.player.body.x, this.player.body.y);

      var distance = this.tmpVector1.distance(this.tmpVector2);
      if (distance > this.range) {
        this.entity.destroy();
      }
    }
  }
};

Bullet.prototype.onBeginContact = function(_otherBody, _myShape, _otherShape, _equation) {
  var destroy = true;

  try {
    var go = _otherBody.go;

    var behaviour = go.getBehaviour(Enemy);
    if (behaviour) {
      if (behaviour.hp > 0) {
        behaviour.takesDamage(this.strength);
      } else {
        destroy = false;
      }
    }
  } catch(e) {
    console.error(e);
  }
    
  if (destroy == true) {
    this.go.entity.destroy();
  }
};

Bullet.SpawnBullet = function(_game, _x, _y, _direction) {
  var bullet = new LR.Entity.Sprite(
    _game,
    0, 0,
    "bubble",
    "bullet"
  );

  bullet.width = 15;
  bullet.height = 15;
  bullet.go.enablePhysics(Phaser.Physics.P2.Body.DYNAMIC);
  bullet.go.changeLayer("bullet");
  bullet.go.enableSensor();
  bullet.go.enableEvents();
  bullet.body.data.gravityScale = 0;
  bullet.body.reset(_x, _y);

  //var behaviour = new Bullet(bullet.go, _direction);
  var behaviour = new Bullet(bullet.go, _direction);
  bullet.go.addBehaviour(behaviour);

  bullet.start();

  _game.state.getCurrentState().addGameObject(bullet.go, true);

  return bullet;
};