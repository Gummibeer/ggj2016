var gamewon = function (game) {
};

gamewon.prototype = {
    bg: null,
    music: null,
    escButton: null,
    create: function () {
        this.bg = this.game.add.sprite('center', 'center', 'gamewon');
        this.escButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        var anim = this.bg.animations.add('play', [0, 1, 2, 3], 3, true);
        this.music = this.game.add.audio('gamewon');
        this.music.play();
        anim.play();
    },
    update: function () {
        if (this.escButton.isDown) {
            this.goToMenu();
        } else {
            this.game.input.keyboard.onPressCallback = this.goToMenu;
        }
    },
    goToMenu: function() {
        if(this.music != undefined) {
            this.music.stop();
        }
        this.game.state.start('Menu');
    }
};