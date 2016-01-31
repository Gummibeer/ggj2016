var gamewon = function (game) {
};

gamewon.prototype = {
    bg: null,
    music: null,
    escButton: null,
    preload: function () {
        console.log('gamewon.preload');
    },
    create: function () {
        console.log('gamewon.create');
        this.bg = this.game.add.sprite('center', 'center', 'gamewon');
        this.escButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        var anim = this.bg.animations.add('play', [0, 1, 2, 3], 3, true);
        this.music = this.game.add.audio('gamewon');
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