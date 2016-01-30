var load = function (game) {
};

load.prototype = {
    preload: function () {
        console.log('load.preload');
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        game.load.spritesheet('dude', 'src/img/dude.png', 32, 48);

        game.load.tilemap('test-map', 'src/tilemap/1280x768.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('colliosion', 'src/tilemap/tile_collision.png');

        // Level 1
        game.load.tilemap('map-1', 'src/tilemap/map-1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles-1', 'src/tilemap/tiles-1.png');
        game.load.image('background-1', 'src/img/level_1/background.jpg');

        // Level 2
        game.load.image('background-2', 'src/img/level_2/background.png');
    },
    create: function () {
        console.log('load.create');
        this.game.state.start('Menu');
    }
};