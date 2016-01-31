var gamewon = function (game) {
};

gamewon.prototype = {
    bg: null,
    music: null,
    preload: function () {
        console.log('gamewon.preload');
    },
    create: function () {
        console.log('gamewon.create');
        this.bg = this.game.add.sprite('center', 'center', 'gamewon');
        var anim = this.bg.animations.add('play', [0, 1, 2, 3], 3, true);
        this.music = this.game.add.audio('gamewon');
        this.music.play();
        anim.play();
    }
};