var preloader = function (game) {
};

preloader.prototype = {
    preload: function () {
        console.log('preloader.preload');
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
    },
    create: function () {
        console.log('preloader.create');
        this.game.state.start('Menu');
    }
};