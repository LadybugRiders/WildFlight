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

  var bitmapData = new Phaser.BitmapData(this.go.game, "myBitmap", 16, 16);
  bitmapData.fill(0, 0, 0, 1);
  var sprite = this.go.game.add.sprite(0, 0);
  sprite.anchor.setTo(0.5, 0.5);
  sprite.fixedToCamera = true;
  sprite.cameraOffset.x = this.go.game.camera.width * 0.5;
  sprite.cameraOffset.y = this.go.game.camera.height * 0.5;
  sprite.alpha = 0.75;

  bitmapData.add(sprite);

  var tween = this.go.game.add.tween(sprite).to({
      width: this.go.game.camera.width,
      height: this.go.game.camera.height,
      alpha: 1
    }, 1500, Phaser.Easing.Quadratic.Out, true
  );

  tween.onComplete.add(function() {
    var state = this.go.game.state.getCurrentState();
    this.entity.game.state.start("Level", true, false, {levelName: "level_selection"});
  }, this);
}