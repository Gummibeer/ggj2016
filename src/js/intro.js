var intro = function (game) {
};

intro.prototype = {
    video: null,
    create: function () {
        this.video = this.game.add.video('intro');
        this.video.onComplete.addOnce(this.videoEnd, this);
        var sprite = this.video.addToWorld(640, 360, 0.5, 0.5);
        this.video.play();
    },
    update: function() {
        this.game.input.keyboard.onPressCallback = this.videoEnd;
    },
    videoEnd: function() {
        this.game.state.start('Level', true, false, 'config-1');
    }
};