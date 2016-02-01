var swap = function (game) {
};

swap.prototype = {
    config: null,
    init: function (config) {
        this.config = config;
    },
    create: function () {
        this.game.state.clearCurrentState();
        this.game.state.start('Level', true, false, this.config);
    }
};