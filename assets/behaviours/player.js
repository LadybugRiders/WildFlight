"use strict";

//>>LREditor.Behaviour.name: Player

var Player = function(_gameobject) {
	LR.Behaviour.call(this, _gameobject);
};

Player.prototype = Object.create(LR.Behaviour.prototype);
Player.prototype.constructor = Player;

Player.prototype.start = function() {
  this.hp = 5;

  // set max speed
  this.speed = new Phaser.Point(75, 100);

  // set camera to follow Dude
  this.go.game.camera.follow(this.go.entity);
  //set the deadzone
  this.go.game.camera.deadzone = new Phaser.Rectangle(50, 0, 200, 360);

  // enable cursors
  this.cursors = this.go.game.input.keyboard.createCursorKeys();

  // set finish to false
  this.finish = false;

  this.cooldown = 500;
  this.currentCooldown = 0;
};

Player.prototype.update = function() {
  var dt = this.go.game.time.elapsed;

  // if the player doesn't cross the finish line
  if (this.finish == false) {
    this.updateControls();

    if (this.hp <= 0) {
      this.stop();
    }

    this.currentCooldown -= dt;
    if (this.currentCooldown < 0) this.currentCooldown = 0;
  }
};

Player.prototype.updateControls = function() {
  this.go.body.moveRight(this.speed.x);

  if (this.cursors.up.isDown) {
    this.go.body.moveUp(this.speed.y);
  } else if (this.cursors.down.isDown) {
    this.go.body.moveDown(this.speed.y);
  } else {
    this.go.body.moveUp(0);
    this.go.body.moveDown(0);
  }

  if (this.cursors.right.isDown) {
    if (this.currentCooldown <= 0) {
      var bullet = Bullet.SpawnBullet(
        this.go.game,
        this.go.body.x,
        this.go.body.y
      );

      this.currentCooldown = this.cooldown;
    }
  }
};

Player.prototype.stop = function() {
  this.finish = true;

  this.go.game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    this.go.body.setZeroVelocity();
    this.go.body.setZeroDamping();
  }, this);
};

Player.prototype.takesDamage = function(_damages) {
  this.hp -= _damages;
  if (this.hp < 0) {
    this.hp = 0;
  }

  var pollinator = this.go.game.pollinator;
  if (pollinator) pollinator.dispatch("playerTakesDamage");
};
