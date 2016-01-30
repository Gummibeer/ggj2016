var level_1 = function (game) {
};

level_1.prototype = {
    bg: null,
    map: null,
    layer: null,
    player: null,
    cursors: null,
    jumpButton: null,
    jumpTimer: 0,
    facing: 'right',
    preload: function () {
        console.log('level_1.preload');
    },
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.gravity.y = 1000;

        this.bg = this.game.add.tileSprite(0, 0, 1280, 720, 'background-1');
        this.bg.fixedToCamera = true;

        this.createTilemap();
        this.createPlayer();
        this.createObjects();

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    createTilemap: function () {
        this.map = this.game.add.tilemap('map-1');
        this.map.addTilesetImage('tiles-1');
        this.map.setCollisionByExclusion([13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);
        this.layer = this.map.createLayer('collision-level-1');
        //this.layer.debug = true;
        this.layer.resizeWorld();
        this.game.physics.p2.convertTilemap(this.map, this.layer);
    },
    createPlayer: function () {
        this.player = this.game.add.sprite(32, 32, 'dude');
        this.game.physics.p2.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.fixedRotation = true;
        this.player.body.x = 64;
        this.player.body.y = 416;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('turn', [4], 20, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.game.camera.follow(this.player);
        this.player.body.onBeginContact.add(this.playerHit, this);
    },
    createObjects: function () {
        var objects = this.game.cache.getJSON('objects-1');
        for (var i = 0; i < objects.chains.length; i++) {
            var chain = objects.chains[i];
            this.createRope(chain.l, chain.x, chain.y);
        }
    },
    createRope: function (length, xAnchor, yAnchor) {
        var lastRect;
        var height = 20;
        var width = 16;
        var maxForce = 20000;
        for (var i = 0; i <= length; i++) {
            var x = xAnchor;
            var y = yAnchor + (i * height);

            if (i % 2 === 0) {
                newRect = this.game.add.sprite(x, y, 'chain', 1);
            }
            else {
                newRect = this.game.add.sprite(x, y, 'chain', 0);
                lastRect.bringToTop();
            }

            this.game.physics.p2.enable(newRect, false);
            newRect.body.setRectangle(width, height);

            if (i === 0) {
                newRect.body.static = true;
            }
            else {
                newRect.body.velocity.x = 1000;
                newRect.body.mass = length / i;
            }

            if (lastRect) {
                this.game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
            }

            lastRect = newRect;
        }
    },
    update: function () {
        this.movement();
    },
    movement: function () {
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.player.body.moveLeft(250);

            if (this.facing != 'left') {
                this.player.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.body.moveRight(250);

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
            this.player.body.moveUp(500);
            this.jumpTimer = this.game.time.now + 750;
        }
    },
    checkIfCanJump: function () {
        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;

        for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = this.game.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data) {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === this.player.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }

        return result;
    },
    playerHit: function (body, bodyB, shapeA, shapeB, equation) {
        if (body == null) {
            console.log('world');
            this.game.state.start('GameOver');
        }
        else if (body.sprite) {
            console.log(body.sprite.key);
        }
        else {
            console.log('wall');
        }
    }
};