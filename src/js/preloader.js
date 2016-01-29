var preloader = function(game) {};

preloader.prototype = {
    preload: function() {
        console.log('preloader.preload');
    },
    create: function() {
        console.log('preloader.create');
        this.game.state.start('Menu');
    }
};