var intro = function (game) {
};

intro.prototype = {
    video: null,
    videoSprite: null,
    init: function() {
        this.video = null;
    },
    create: function () {
        var that = this;
        this.video = this.game.add.video('intro');
        this.video.onComplete.addOnce(function(){that.videoEnd(that)}, this);
        this.game.input.keyboard.onPressCallback = function(){that.videoEnd(that);};
        this.videoSprite = this.video.addToWorld(640, 360, 0.5, 0.5);
        this.video.play();
    },
    videoEnd: function(context) {
        if(context){
            context.video.stop();
            context.video.destroy();
        }
        this.game.state.clearCurrentState();
        this.game.state.start('Level', true, false, 'config-1');
    },
    shutdown: function() {
        this.game.input.keyboard.onPressCallback = null;
    }
};