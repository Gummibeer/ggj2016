var menu = function (game) {
};

menu.prototype = {
    bg: null,
    button: null,
    create: function () {
        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menuscreen');
        this.bg.fixedToCamera = true;

        this.button = this.game.add.button(300, 200, 'btnstart', this.click, this);
    },
    click: function () {
        this.game.state.clearCurrentState();
        this.game.state.start('Intro');
    }
};