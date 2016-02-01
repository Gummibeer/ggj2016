var gameover = function (game) {
};

gameover.prototype = {
    bg: null,
    music: null,
    escButton: null,
    create: function () {
        this.bg = this.game.add.sprite('center', 'center', 'gameover');
        this.escButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        var anim = this.bg.animations.add('play', [0, 1], 1, true);
        anim.loop = false;
        this.music = this.game.add.audio('gameover');
        this.music.play();
        anim.play();
    },
    update: function () {
        var that=this;
        if (this.escButton.isDown) {
            this.goToMenu();
        } else {
            this.game.input.keyboard.onPressCallback = function(){that.goToMenu(that)};
        }
    },
    goToMenu: function(context) {
        context.music.stop();
        this.game.state.clearCurrentState();
        this.game.state.start('Menu');
    }
};