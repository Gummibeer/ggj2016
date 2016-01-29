var gameover = function(game) {};

gameover.prototype = {
    preload: function() {
        console.log('gameover.preload');
    },
    create: function() {
        console.log('gameover.create');
        this.game.stage.backgroundColor = '#880000';
    }
};