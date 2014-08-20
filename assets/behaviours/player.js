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
  this.speed = new Phaser.Point(125, 100);

  // set camera to follow Dude
  this.go.game.camera.follow(this.go.entity);
  //set the deadzone
  this.go.game.camera.deadzone = new Phaser.Rectangle(0, 0, 120, 360);

  // enable cursors
  this.cursors = this.go.game.input.keyboard.createCursorKeys();

  // set finish to false
  this.finish = true;

  this.safeCooldown = 2000;
  this.currentSafeCooldown = 0;

  this.fireCooldown = 500;
  this.currentFireCooldown = 0;

  this.bulletDirection = new Phaser.Point();

  var pollinator = this.go.game.pollinator;
  if (pollinator) pollinator.on("playerFinishes", this.callbackFinish, this);

  //Phaser.Canvas.setSmoothingEnabled(this.go.game.context, false);
};

Player.prototype.update = function() {
  var dt = this.go.game.time.elapsed;

  // if the player doesn't cross the finish line
  if (this.finish == false) {
    // always move to the right
    this.go.body.moveRight(this.speed.x);

    this.updateControls();

    if (this.hp <= 0) {
      this.stop();
    }

    this.updateCooldowns();
  } else {
    this.go.body.moveUp(0);
    this.go.body.moveDown(0);
  }
};

Player.prototype.updateControls = function() {

  var pointerLeft = this.getPointerLeft();
  if (pointerLeft) {
    if (pointerLeft.isDown) {
      var deltaY = Math.round(this.go.game.camera.y + pointerLeft.y - this.go.body.y);

      var absDeltaY = Math.abs(deltaY);

      // avoid shake
      if (absDeltaY > 2) {
        if (deltaY < 0) {
          this.go.body.moveUp(this.speed.y);
        } else if (deltaY > 0) {
          this.go.body.moveDown(this.speed.y);
        }
      } else {
        this.go.body.moveUp(0);
        this.go.body.moveDown(0);
      }
    }
  } else {
    if (this.cursors.up.isDown) {
      this.go.body.moveUp(this.speed.y);
    } else if (this.cursors.down.isDown) {
      this.go.body.moveDown(this.speed.y);
    } else {
      this.go.body.moveUp(0);
      this.go.body.moveDown(0);
    }
  }

  if (this.currentFireCooldown <= 0) {
    var pointerRight = this.getPointerRight();

    if (pointerRight) {
      if (pointerRight.isDown) {
        console.log(this.go.body);
        var spawnX = this.go.body.x + this.go.entity.width * 0.5;
        var spawnY = this.go.body.y;

        this.bulletDirection.set(
          this.go.game.camera.x + pointerRight.x - spawnX,
          this.go.game.camera.y + pointerRight.y - spawnY
        ).normalize();

        var direction = new Phaser.Point(1, 0);
        var bullet = Bullet.SpawnBullet(
          this.go.game,
          spawnX,
          spawnY,
          this.bulletDirection
        );

        this.currentFireCooldown = this.fireCooldown;
      }
    }
    
  }
};

Player.prototype.updateCooldowns = function() {
  var dt = this.go.game.time.elapsed;

  this.currentSafeCooldown -= dt;
  if (this.currentSafeCooldown < 0) this.currentSafeCooldown = 0;

  this.currentFireCooldown -= dt;
  if (this.currentFireCooldown < 0) this.currentFireCooldown = 0;
};

Player.prototype.getPointerLeft = function() {
  var input = this.go.game.input;

  var pointerLeft = null;

  if (input.mousePointer.isDown) {
    if (input.mousePointer.x < 200) {
      pointerLeft = input.mousePointer;
    }
  }

  if (input.pointer1.isDown) {
    if (input.pointer1.x < 200) {
      pointerLeft = input.pointer1;
    }
  }

  if (input.pointer2.isDown) {
    if (input.pointer2.x < 200) {
      pointerLeft = input.pointer2;
    }
  }

  return pointerLeft;
};

Player.prototype.getPointerRight = function() {
  var input = this.go.game.input;

  var pointerRight = null;

  if (input.mousePointer.isDown) {
    if (input.mousePointer.x > 200) {
      pointerRight = input.mousePointer;
    }
  }

  if (input.pointer1.isDown) {
    if (input.pointer1.x > 200) {
      pointerRight = input.pointer1;
    }
  }

  if (input.pointer2.isDown) {
    if (input.pointer2.x > 200) {
      pointerRight = input.pointer2;
    }
  }

  return pointerRight;
};

Player.prototype.stop = function() {
  this.finish = true;

  this.go.game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    this.go.body.setZeroVelocity();
    this.go.body.setZeroDamping();
  }, this);
};

Player.prototype.takesDamage = function(_damages) {
  if (this.currentSafeCooldown <= 0) {
    this.hp -= _damages;
    if (this.hp < 0) {
      this.hp = 0;
    }

    var pollinator = this.go.game.pollinator;
    if (pollinator) pollinator.dispatch("playerTakesDamage");

    this.go.blink = new LR.FX.Blink(this.go);
    this.go.blink.activate(2, this.safeCooldown);

    this.currentSafeCooldown = this.safeCooldown;
  }
};

Player.prototype.callbackFinish = function() {
  this.finish = true;

  console.log("FINISH!");
};
