var gameover = function (game) {
};

gameover.prototype = {
    bg: null,
    preload: function () {
        console.log('gameover.preload');
    },
    create: function () {
        console.log('gameover.create');
        this.bg = this.game.add.sprite('center', 'center', 'gameover');
        var anim = this.bg.animations.add('play', [0, 1], 1, true);
        anim.loop = false;
        anim.play();
    }
};