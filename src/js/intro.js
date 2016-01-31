var intro = function (game) {
};

intro.prototype = {
    video: null,
    init: function() {
        this.video = null;
    },
    create: function () {
        this.video = this.game.add.video('intro');
        this.video.onComplete.addOnce(this.videoEnd, this);
        var sprite = this.video.addToWorld(640, 360, 0.5, 0.5);
        this.video.play();
    },
    update: function() {
        var that=this;
        this.game.input.keyboard.onPressCallback = function(){that.videoEnd(that.video);}
    },
    videoEnd: function(myVideo) {
        myVideo.stop();
        myVideo.destroy();
        this.game.state.start('Level', true, false, 'config-2');
    },
    shutdown: function() {
        this.game.input.keyboard.onPressCallback = null;
    }
};