var menu = function (game) {
};

menu.prototype = {
    preload: function () {
        console.log('menu.preload');
    },
    create: function () {
        console.log('menu.create');

        this.game.stage.backgroundColor = '#182d3b';

        button = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.click, this, 2, 1, 0);
        button.onInputOver.add(this.over, this);
        button.onInputOut.add(this.out, this);
    },
    over: function () {
        console.log('button over');
    },
    out: function () {
        console.log('button out');
    },
    click: function () {
        console.log('button click');
        this.game.state.start('Level1');
    }
};