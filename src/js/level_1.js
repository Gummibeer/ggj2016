var level_1 = function (game) {
    var map;
    var tileset;
    var layer;
    var player;
    var facing = 'left';
    var jumpTimer = 0;
    var cursors;
    var jumpButton;
    var bg;
};

level_1.prototype = {
    bg: null,
    map: null,
    layer: null,
    player: null,
    cursors: null,
    jumpButton: null,
    jumpTimer: 0,
    facing: 'left',
    preload: function () {
        console.log('level_1.preload');
    },
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1000;

        this.bg = this.game.add.tileSprite(0, 0, 1280, 720, 'background-1');
        this.bg.fixedToCamera = true;

        this.map = this.game.add.tilemap('test-map');
        this.map.addTilesetImage('colliosion');
        this.map.setCollisionByExclusion([13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);

        this.layer = this.map.createLayer('collllissssion');
        this.layer.debug = true;
        this.layer.resizeWorld();

        this.game.physics.p2.convertTilemap(this.map, this.layer);

        this.player = this.game.add.sprite(32, 32, 'dude');
        this.game.physics.p2.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.fixedRotation = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('turn', [4], 20, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.game.camera.follow(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function () {
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -250;

            if (this.facing != 'left') {
                this.player.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 250;

            if (this.facing != 'right') {
                this.player.animations.play('right');
                this.facing = 'right';
            }
        }
        else {
            if (this.facing != 'idle') {
                this.player.animations.stop();

                if (this.facing == 'left') {
                    this.player.frame = 0;
                }
                else {
                    this.player.frame = 5;
                }

                this.facing = 'idle';
            }
        }

        if ((this.jumpButton.isDown || this.cursors.up.isDown) && this.checkIfCanJump() && this.game.time.now > this.jumpTimer) {
            this.player.body.velocity.y = -500;
            this.jumpTimer = this.game.time.now + 750;
        }
    },
    render: function () {
        this.game.debug.body(this.player);
        this.game.debug.bodyInfo(this.player, 16, 24);
    },
    checkIfCanJump: function() {

        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;

        for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++)
        {
            var c = this.game.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data)
            {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === this.player.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }

        return result;

    }
};