var menu = function (game) {
};

menu.prototype = {
    bg: null,
    create: function () {
        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menuscreen');
        this.bg.fixedToCamera = true;

        var button = this.game.add.button(300, 500, 'btnstart', this.click, this);
    },
    click: function () {
        this.game.state.start('Intro');
    }
};