var gameover = function (game) {
};

gameover.prototype = {
    bg: null,
    music: null,
    escButton: null,
    preload: function () {
        console.log('gameover.preload');
    },
    create: function () {
        console.log('gameover.create');
        this.bg = this.game.add.sprite('center', 'center', 'gameover');
        this.escButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        var anim = this.bg.animations.add('play', [0, 1], 1, true);
        anim.loop = false;
        this.music = this.game.add.audio('gameover');
        this.music.play();
        anim.play();
    },
    update: function () {
        if (this.escButton.isDown) {
            this.music.stop();
            this.game.state.start('Menu');
        }
    }
};