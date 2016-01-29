var boot = function(game) {};

boot.prototype = {
    preload: function() {
        console.log('boot.preload');
    },
    create: function() {
        console.log('boot.create');
        this.game.state.start('Preloader');
    }
};