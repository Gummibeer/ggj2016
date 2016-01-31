var load = function (game) {
};

load.prototype = {
    preload: function () {
        console.log('load.preload');
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.game.load.spritesheet('bean', 'src/img/objects/bean.png', 163, 163);
        this.game.load.spritesheet('chain', 'src/img/objects/chain.png', 16, 26);
        this.game.load.image('box', 'src/img/objects/box.png');
        this.game.load.image('spring', 'src/img/objects/spring.png');
        this.game.load.image('spike', 'src/img/objects/spike.png');
        this.game.load.image('item', 'src/img/objects/item.png');
        this.game.load.image('platform', 'src/img/objects/platform.png');
        this.game.load.image('ritual', 'src/img/objects/ritual.png');
        this.game.load.image('teleporter', 'src/img/objects/teleporter.png');
        this.game.load.image('stamp', 'src/img/objects/stamp.png');

        // Menu-Screen
        this.game.load.image('menuscreen', 'src/img/menuscreen.jpg');
        this.game.load.audio('theme', ['src/audio/theme.mp3', 'src/audio/theme.ogg']);

        // Level 1
        this.game.load.tilemap('map-1', 'src/level/map-1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles-1', 'src/level/tiles-1.png');
        this.game.load.image('foreground-1', 'src/level/foreground-1.png');
        this.game.load.json('config-1', 'src/level/config-1.json');
        this.game.load.image('background-1', 'src/img/level_1/background.jpg');

        // Level 2
        this.game.load.tilemap('map-2', 'src/level/map-2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles-2', 'src/level/tiles-2.png');
        this.game.load.image('foreground-2', 'src/level/foreground-2.png');
        this.game.load.json('config-2', 'src/level/config-2.json');
        this.game.load.image('background-2', 'src/img/level_2/background.jpg');

        // GameOver
        this.game.load.spritesheet('gameover', 'src/img/gameover/background.jpg', 1280, 720);
        this.game.load.audio('gameover', ['src/audio/gameover.mp3', 'src/audio/gameover.ogg']);

        // GameWon
        this.game.load.spritesheet('gamewon', 'src/img/gamewon/background.jpg', 1280, 720);
        this.game.load.audio('gamewon', ['src/audio/gamewon.mp3', 'src/audio/gamewon.ogg']);
    },
    create: function () {
        console.log('load.create');
        this.game.state.start('Menu');
    }
};