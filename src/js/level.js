var level = function (game) {
};

WebFontConfig = {
    active: function () {
        window.fontReady = true;
    },
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Lato:400,900:latin']
    }

};

level.prototype = {
    debug: false,

    bg: null,
    music: null,
    map: null,
    layer: null,
    foreground: null,
    player: null,
    cursors: null,
    jumpButton: null,
    takeButton: null,
    dropButton: null,
    escButton: null,
    buttonMask: null,
    timeTween: null,
    jumpTimer: 0,
    facing: 'right',
    playerMaterial: null,
    levelTimer: null,
    canMove: true,
    currentRitual: null,
    fontReady: false,
    hud: null,
    config: null,
    wheels: [],
    rituals: [],
    stampVelocity: 100,
    stamps: [],
    stampVelocities: [],
    platformVelocity: 150,
    hPlatforms: [],
    hPlatformVelocities: [],
    vPlatforms: [],
    vPlatformVelocities: [],

    solvedRituals: 0,
    init: function (config) {
        this.bg = null;
        this.music = null;
        this.map = null;
        this.layer = null;
        this.foreground = null;
        this.player = null;
        this.cursors = null;
        this.jumpButton = null;
        this.takeButton = null;
        this.dropButton = null;
        this.escButton = null;
        this.buttonMask = null;
        this.timeTween = null;
        this.jumpTimer = 0;
        this.facing = 'right';
        this.playerMaterial = null;
        this.levelTimer = null;
        this.canMove = true;
        this.currentRitual = null;
        this.fontReady = false;
        this.hud = null;
        this.config = config;
        this.wheels = [];
        this.rituals = [];
        this.stampVelocity = 100;
        this.stamps = [];
        this.stampVelocities = [];
        this.platformVelocity = 150;
        this.hPlatforms = [];
        this.hPlatformVelocities = [];
        this.vPlatforms = [];
        this.vPlatformVelocities = [];
        this.solvedRituals = 0;
    },
    create: function () {
        this.config = this.game.cache.getJSON(this.config);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.gravity.y = 1000;

        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, this.config.background);
        this.bg.fixedToCamera = true;

        this.music = this.game.add.audio('theme');
        this.music.loopFull();

        this.playerMaterial = this.game.physics.p2.createMaterial();

        this.createBackgrounds();
        this.createTilemap();
        this.createHud();

        this.levelTimer = this.game.time.events.add(Phaser.Timer.SECOND * this.config.leveltime, function () {
            this.killPlayer(true)
        }, this);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.takeButton = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.dropButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.escButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        this.canMove = true;
    },
    createBackgrounds: function () {
        var data;
        for (var i = 0; i < this.config.wheels.length; i++) {
            data = this.config.wheels[i];
            this.wheels[i] = this.createWheel(data.x, data.y, data.image);
        }
    },
    createWheel: function(xAnchor, yAnchor, image) {
        var wheel = this.game.add.sprite(xAnchor, yAnchor, image);
        wheel.anchor.x = 0.5;
        wheel.anchor.y = 0.5;
        return wheel;
    },
    createTilemap: function () {
        this.map = this.game.add.tilemap(this.config.map);
        this.map.addTilesetImage(this.config.tilesCollision);
        this.map.addTilesetImage(this.config.tilesForeground);
        this.map.setCollisionByExclusion([]);
        this.layer = this.map.createLayer(this.config.layerCollision);
        this.createObjects();
        this.createPlayer();
        this.foreground = this.map.createLayer(this.config.layerForeground);
        this.layer.debug = this.debug;
        this.layer.resizeWorld();
        this.game.physics.p2.convertTilemap(this.map, this.layer);
    },
    createPlayer: function () {
        this.player = this.game.add.sprite(163, 163, 'bean');
        this.player.scale.x = 0.35;
        this.player.scale.y = 0.35;
        this.game.physics.p2.enable(this.player);
        this.player.body.setCircle(25);
        this.player.anchor.setTo(0.5, 0.6);
        this.player.body.collideWorldBounds = true;
        this.player.body.fixedRotation = true;
        this.player.body.x = this.config.player.x;
        this.player.body.y = this.config.player.y;
        this.player.body.debug = this.debug;
        this.player.animations.add('left', [4, 3], 20, true);
        this.player.animations.add('turn', [2], 40, true);
        this.player.animations.add('right', [0, 1], 20, true);

        this.player.animations.add('left_w_item', [6, 5], 20, true);
        this.player.animations.add('turn_w_item', [7], 20, true);
        this.player.animations.add('right_w_item', [8, 9], 20, true);

        this.game.camera.follow(this.player);
        this.player.body.onBeginContact.add(this.playerHit, this);
        this.player.body.onEndContact.add(this.playerContactEnd, this);
        this.player.body.setMaterial(this.playerMaterial);
        return this.player;
    },
    createObjects: function () {
        var i;
        var data;
        for (i = 0; i < this.config.chains.length; i++) {
            data = this.config.chains[i];
            this.createRope(data.l, data.x, data.y);
        }
        for (i = 0; i < this.config.boxes.length; i++) {
            data = this.config.boxes[i];
            this.createBox(data.x, data.y);
        }
        for (i = 0; i < this.config.springs.length; i++) {
            data = this.config.springs[i];
            this.createSpring(data.x, data.y);
        }
        for (i = 0; i < this.config.spikes.length; i++) {
            data = this.config.spikes[i];
            this.createSpike(data.x, data.y);
        }
        for (i = 0; i < this.config.items.length; i++) {
            data = this.config.items[i];
            this.createItem(data.x, data.y);
        }
        for (i = 0; i < this.config.hPlatforms.length; i++) {
            data = this.config.hPlatforms[i];
            this.hPlatforms[i] = this.createPlatform(data.x1, data.y);
            this.hPlatformVelocities[i] = this.platformVelocity;
        }
        for (i = 0; i < this.config.vPlatforms.length; i++) {
            data = this.config.vPlatforms[i];
            this.vPlatforms[i] = this.createPlatform(data.x, data.y1);
            this.vPlatformVelocities[i] = this.platformVelocity;
        }
        for (i = 0; i < this.config.rituals.length; i++) {
            data = this.config.rituals[i];
            this.rituals[i] = this.createRitual(data.position.x, data.position.y, data.task);
        }
        for (i = 0; i < this.config.teleporters.length; i++) {
            data = this.config.teleporters[i];
            this.createTeleporter(data.x, data.y, data.dest);
        }
        for (i = 0; i < this.config.stamps.length; i++) {
            data = this.config.stamps[i];
            this.stamps[i] = this.createStamp(data.x, data.y1);
            this.stampVelocities[i] = this.stampVelocity;
        }
    },
    createHud: function () {
        var that = this;
        this.hud = game.add.graphics();
        this.hud.beginFill(0x000000, 0);
        this.hud.drawRect(0, 0, this.game.width, 150);
        var timeText = game.add.text(20, 10, "");
        timeText.font = 'Lato';
        timeText.fontSize = 150;
        timeText.fontWeight = 'bold';
        timeText.align = 'center';
        timeText.fill = '#ffffff';
        timeText.setShadow(8, 8, 'rgba(0,0,0,0.8)', 8);
        this.hud.addChild(timeText);
        this.timeTween = setInterval(function (timeText) {
            timeText.text = Math.round(game.time.events.duration / 1000);
        }, that.config.leveltime * 1000 / 1000, timeText);
        this.hud.fixedToCamera = true;

        // var clockSprite = this.game.make.sprite(10, 15, 'menuclock');
        // this.hud.addChild(clockSprite);
    },
    createStamp: function (xAnchor, yAnchor) {
        var stamp = this.game.add.sprite(xAnchor, yAnchor, 'stamp');
        this.game.physics.p2.enable(stamp);
        stamp.body.debug = this.debug;
        stamp.body.mass = 9999;
        stamp.body.data.gravityScale = 0;
        stamp.body.data.motionState = 1;
        stamp.body.fixedRotation = true;
        return stamp;
    },
    createTeleporter: function (xAnchor, yAnchor, dest) {
        var teleporter = this.game.add.sprite(xAnchor, yAnchor, 'teleporter');
        this.game.physics.p2.enable(teleporter);
        teleporter.body.fixedRotation = true;
        teleporter.body.static = true;
        teleporter.playerDestination = dest;
    },
    createRitual: function (xAnchor, yAnchor, task) {
        var ritual = this.game.add.sprite(xAnchor, yAnchor, 'ritual');
        this.game.physics.p2.enable(ritual);
        ritual.body.setCircle(60);
        ritual.body.debug = this.debug;
        ritual.body.fixedRotation = true;
        ritual.body.static = true;
        ritual.bean = {};
        ritual.bean.task = task;
        return ritual;
    },
    createPlatform: function (xAnchor, yAnchor) {
        var platform = this.game.add.sprite(xAnchor, yAnchor, 'platform');
        this.game.physics.p2.enable(platform);
        platform.body.debug = this.debug;
        platform.body.mass = 9999;
        platform.body.data.gravityScale = 0;
        platform.body.data.motionState = 1;
        platform.body.fixedRotation = true;
        return platform;
    },
    createItem: function (xAnchor, yAnchor) {
        var item = this.game.add.sprite(xAnchor, yAnchor, 'item');
        this.game.physics.p2.enable(item);
        item.body.onBeginContact.add(this.objectHit, this);
        return item;
    },
    createSpike: function (xAnchor, yAnchor) {
        var spike = this.game.add.sprite(xAnchor, yAnchor, 'spike');
        this.game.physics.p2.enable(spike);
        spike.body.static = true;
        return spike;
    },
    createSpring: function (xAnchor, yAnchor) {
        var spring = this.game.add.sprite(xAnchor, yAnchor, 'spring');
        this.game.physics.p2.enable(spring);
        var springMaterial = this.game.physics.p2.createMaterial();
        this.game.physics.p2.createContactMaterial(this.playerMaterial, springMaterial, {friction: 2, restitution: 2});
        spring.body.setMaterial(springMaterial);
        spring.body.onBeginContact.add(this.objectHit, this);
        return spring;
    },
    createBox: function (xAnchor, yAnchor) {
        var box = this.game.add.sprite(xAnchor, yAnchor, 'box');
        this.game.physics.p2.enable(box);
        box.body.onBeginContact.add(this.objectHit, this);
        return box;
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
            } else {
                newRect = this.game.add.sprite(x, y, 'chain', 0);
                lastRect.bringToTop();
            }

            this.game.physics.p2.enable(newRect, false);
            newRect.body.setRectangle(width, height);

            if (i === 0) {
                newRect.body.static = true;
            } else {
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
        if (this.escButton.isDown) {
            this.game.state.start('Menu');
        }

        if (this.canMove) {
            this.movement();
            this.platformMovement();
            this.stampMovement();
            this.ritualRotate();
            this.wheelRotate();
        }

        if (this.solvedRituals == this.config.rituals.length) {
            this.winPlayer();
        }

        if (this.takeButton.isDown && this.player.constraint == null && this.player.possibleTakeableItem != null) {
            this.player.possibleTakeableItem.data.shapes[0].sensor = true;
            this.player.possibleTakeableItem.fixedRotation = true;
            this.player.attachedBody = this.player.possibleTakeableItem;
            this.player.constraint = this.game.physics.p2.createLockConstraint(this.player, this.player.attachedBody, [0, 16], 0);
            this.player.possibleTakeableItem = null;
        }

        if (this.player.constraint != null && this.dropButton.isDown) {
            this.game.physics.p2.removeConstraint(this.player.constraint);
            this.player.constraint = null;
            this.player.attachedBody.fixedRotation = false;
            this.player.attachedBody.data.shapes[0].sensor = false;
            this.player.attachedBody = null;
            this.player.frame = 2;
        }
    },
    wheelRotate: function () {
        for (var i = 0; i < this.wheels.length; i++) {
            this.wheels[i].angle += 1;
        }
    },
    ritualRotate: function () {
        for (var i = 0; i < this.rituals.length; i++) {
            this.rituals[i].angle += 1;
        }
    },
    stampMovement: function () {
        var data;
        for (var i = 0; i < this.stamps.length; i++) {
            data = this.config.stamps[i];
            if (this.stamps[i].body) {
                var y = Math.round(this.stamps[i].body.y);
                if (y < data.y1) {
                    this.stampVelocities[i] *= -1;
                } else if (y > data.y2) {
                    this.stampVelocities[i] *= -1;
                }
                this.stamps[i].body.velocity.y = this.stampVelocities[i];
                this.stamps[i].body.x = data.x;
            }
        }
    },
    platformMovement: function () {
        var i;
        var data;
        var x;
        for (i = 0; i < this.hPlatforms.length; i++) {
            data = this.config.hPlatforms[i];
            x = Math.round(this.hPlatforms[i].body.x);
            if (x < data.x1) {
                this.hPlatformVelocities[i] *= -1;
            } else if (x > data.x2) {
                this.hPlatformVelocities[i] *= -1;
            }
            this.hPlatforms[i].body.velocity.x = this.hPlatformVelocities[i];
            this.hPlatforms[i].body.y = data.y;
        }
        var y;
        for (i = 0; i < this.vPlatforms.length; i++) {
            data = this.config.vPlatforms[i];
            y = Math.round(this.vPlatforms[i].body.y);
            if (y < data.y1) {
                this.vPlatformVelocities[i] *= -1;
            } else if (y > data.y2) {
                this.vPlatformVelocities[i] *= -1;
            }
            this.vPlatforms[i].body.velocity.y = this.vPlatformVelocities[i];
            this.vPlatforms[i].body.x = data.x;
        }
    },
    movement: function () {
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.player.body.moveLeft(250);

            if (this.facing != 'left') {
                if (this.player.attachedBody != null) {
                    this.player.animations.play('left_w_item');
                } else {
                    this.player.animations.play('left');
                }
                this.facing = 'left';
            }
        } else if (this.cursors.right.isDown) {
            this.player.body.moveRight(250);

            if (this.facing != 'right') {
                if (this.player.attachedBody != null) {
                    this.player.animations.play('right_w_item');
                } else {
                    this.player.animations.play('right');
                }
                this.facing = 'right';
            }
        } else {
            if (this.facing != 'idle') {
                this.player.animations.stop();
                if (this.player.attachedBody != null) {
                    this.player.frame = 7;
                } else {
                    this.player.frame = 2;
                }
                this.facing = 'idle';
            }
        }

        if ((this.jumpButton.isDown || this.cursors.up.isDown) && this.checkIfCanJump() && this.game.time.now > this.jumpTimer) {
            if (this.facing == 'idle') {
                this.player.frame = 2;
            }
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
                var d = p2.vec2.dot(c.normalA, yAxis);
                if (c.bodyA === this.player.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }

        return result;
    },
    playerHit: function (body, bodyB, shapeA, shapeB, equation) {
        if (body == null) {
            this.killPlayer();
        } else if (body.sprite) {
            if (body.sprite.key == 'spike' || body.sprite.key == 'stamp') {
                this.killPlayer();
            }
            if (this.player.attachedBody == null && (body.sprite.key == 'item' || body.sprite.key == 'box' || body.sprite.key == 'spring')) {
                this.player.possibleTakeableItem = body;
            } else if (body.sprite.key == 'ritual') {
                this.processRitual(body);
            } else if (body.sprite.key == 'teleporter') {
                var dest = body.sprite.playerDestination;
                this.player.body.x = dest.x;
                this.player.body.y = dest.y;
            }
        } else {
        }
    },
    playerContactEnd: function (body, bodyB, shapeA, shapeB, equation) {
        if (body && body.sprite != undefined && (body.sprite.key == 'item' || body.sprite.key == 'box' || body.sprite.key == 'spring')) {
            this.player.possibleTakeableItem = null;
        }
    },
    processRitual: function (spriteBody) {
        var that = this;
        this.game.physics.p2.isPaused = true;
        this.game.paused = true;
        this.pause();
        this.player.animations.stop();
        if (this.currentRitual == null) {
            this.currentRitual = new BeanRitual();
            this.currentRitual.start(this.game, this.player, spriteBody.sprite.bean.task, function (succeed) {
                that.ritualFinished(succeed, spriteBody);
            });
        }
    },
    ritualFinished: function (succeed, spriteBody) {
        this.currentRitual = null;
        this.levelTimer.timer.resume();
        this.canMove = true;
        if (succeed) {
            this.destroyObject(spriteBody);
            this.game.physics.p2.isPaused = false;
            this.game.paused = false;
            this.solvedRituals++;
            if (this.solvedRituals == this.config.rituals.length) {
                this.winPlayer();
            }
        } else {
            this.game.physics.p2.isPaused = false;
            this.game.paused = false;

        }
    },
    objectHit: function (body, bodyB, shapeA, shapeB, equation) {
        if (body == null || (body.sprite && body.sprite.key == 'spike')) {
            if (equation[0] != undefined) {
                if (equation[0].bodyA.parent != undefined && equation[0].bodyA.sprite != undefined && equation[0].bodyA.sprite.key != 'spike') {
                    this.destroyObject(equation[0].bodyA.parent);
                } else if (equation[0].bodyB.parent != undefined && equation[0].bodyB.sprite != undefined && equation[0].bodyB.sprite.key != 'spike') {
                    this.destroyObject(equation[0].bodyB.parent);
                }
            }
        }
    },
    killPlayer: function (isGameOver) {
        this.player.animations.stop();
        this.player.frame = 10;
        this.game.physics.p2.pause();
        var anim = this.player.animations.add('death', [2, 10, 11, 12, 13], 5, true);
        anim.loop = false;
        this.countDeadBeans();
        if (isGameOver) {
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("deadBeans", 0);
            }
            anim.onStart.add(function (sprite, animation) {
                setTimeout(function () {
                    game.state.start('GameOver');
                }, 1000);
            }, this);
        } else {
            anim.onStart.add(function (sprite, animation) {
                var that = this;
                setTimeout(function (that) {
                    that.player.frame = 2;
                    var info = game.add.graphics();
                    info.beginFill(0x000000, 0.5);
                    info.drawRect(220, 35, this.game.width-400, 100);
                    that.hud.addChild(info);
                    var _overlayText = game.add.text(0, 0, "OH, NOES! You have lost "+ localStorage.getItem("deadBeans") +" friends");
                    _overlayText.font = 'Lato';
                    _overlayText.fontSize = 36;
                    _overlayText.align = 'center';
                    _overlayText.fill = '#ffffff';
                    _overlayText.fontWeight = 'bold';
                    _overlayText.boundsAlignH = "center";
                    _overlayText.boundsAlignV = "middle";
                    _overlayText.setTextBounds(220, 35, this.game.width-400, 100);
                    var deadico = game.make.sprite(260, 50, 'iconflost');
                    deadico.scale.x = 0.7;
                    deadico.scale.y = 0.6;
                    info.addChild(deadico);
                    info.addChild(_overlayText);
                    setTimeout(function(theInfo){
                        theInfo.destroy();
                    },2500,info);
                    that.player.reset(that.config.player.x, that.config.player.y);
                    that.facing = 'idle';
                    that.game.physics.p2.resume();
                }, 1000, that);
            }, this);
        }
        this.music.stop();
        if (!anim.isPlaying) {
            anim.play();
        }
    },
    countDeadBeans: function () {
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("deadBeans")) {
                var value = parseInt(localStorage.getItem("deadBeans")) + 1;
                localStorage.setItem("deadBeans", value);
            }
        } else {
            // Sorry! No Web Storage support..
        }
    },
    winPlayer: function () {
        this.music.stop();
        this.game.physics.p2.isPaused = true;
        this.pause();
        this.player.animations.stop();
        if (this.config.nextLevel != null) {
            this.game.state.start('Swap', true, false, this.config.nextLevel);
        } else {
            this.game.state.start('GameWon');
        }
    },
    destroyObject: function (object) {
        object.sprite.destroy();
        object.destroy();
    },
    pause: function () {
        this.levelTimer.timer.pause();
        this.canMove = false;
    },
    resume: function () {
        this.levelTimer.timer.resume();
        this.canMove = true;
    },
    shutdown: function() {
        this.music.destroy();
        this.game.physics.p2.reset();
        this.game.physics.p2.clear();
        this.levelTimer.timer.removeAll();
    }
};