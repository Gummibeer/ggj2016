var menu = function (game) {
};

menu.prototype = {
    bg: null,
    preload: function () {
        console.log('menu.preload');
    },
    create: function () {
        console.log('menu.create');

        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menuscreen');
        this.bg.fixedToCamera = true;

        var button = this.game.add.button(this.game.world.centerX - 400, 500, 'btnstart', this.click, this, 2, 1, 0);
    },
    click: function () {
        console.log('button click');
        this.game.state.start('Level', true, false, window.location.hash.replace('#', ''));
    }
};