var load = function (game) {
};

load.prototype = {
    preload: function () {
        console.log('load.preload');
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        this.game.load.spritesheet('bean', 'src/img/bean.png', 163, 163);
        this.game.load.spritesheet('chain', 'src/img/chain.png', 16, 26);
        this.game.load.image('box', 'src/img/box.png');
        this.game.load.image('spring', 'src/img/spring.png');
        this.game.load.image('spike', 'src/img/spike.png');
        this.game.load.image('item', 'src/img/item.png');

        this.game.load.image('platform', 'src/img/platform.png');
        this.game.load.image('ritual', 'src/img/ritual.png');
        this.game.load.image('teleporter', 'src/img/teleporter.png');
        this.game.load.image('stamp', 'src/img/stamp.png');

        // Level 1
        this.game.load.tilemap('map-1', 'src/level/map-1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles-1', 'src/level/tiles-1.png');
        this.game.load.image('foreground-1', 'src/level/foreground-1.png');
        this.game.load.json('config-1', 'src/level/config-1.json');
        this.game.load.image('background-1', 'src/img/level_1/background.jpg');

        // Level 2
        this.game.load.image('background-2', 'src/img/level_2/background.jpg');

        // GameOver
        this.game.load.spritesheet('gameover', 'src/img/gameover/background.jpg', 1280, 720);

        // GameWon
        this.game.load.spritesheet('gamewon', 'src/img/gamewon/background.jpg', 1280, 720);
    },
    create: function () {
        console.log('load.create');
        this.game.state.start('Menu');
    }
};