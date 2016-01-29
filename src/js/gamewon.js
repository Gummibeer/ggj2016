var gamewon = function(game) {};

gamewon.prototype = {
    preload: function() {
        console.log('gamewon.preload');
    },
    create: function() {
        console.log('gamewon.create');
        this.game.stage.backgroundColor = '#008800';
    }
};