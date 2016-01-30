var BeanRitual = function () {
    var _keys = 0;
    var _time = 0;
    var _callback = null;
    var _keycount = 0;
    var _timeout = null;
    var _processKey = function (key) {
        var nesKey = _keys[_keycount];
        console.log('THE KEY', key.keyCode, _keys, _keycount, _keys[_keycount], nesKey, Phaser.Keyboard[nesKey]);
        if (key.keyCode == Phaser.Keyboard[nesKey]) {
            _keycount++;
            if (_keycount == _keys.length) {
                _onComplete();
            }
        } else {
            _onFail();
        }
    };

    var _destroy = function () {
        game.input.keyboard.onPressCallback = null;
        clearTimeout(_timeout);
    };

    var _onFail = function () {
        _destroy();
        _callback(false);
    };

    var _onComplete = function () {
        _destroy();
        _callback(true);
    };

    this.start = function (game, task, callback) {
        console.log(game, task, callback);
        this.zoomIn();
        _time = task.time;
        _keys = task.keys;
        _callback = callback;
        _timeout = setTimeout(_onFail, Phaser.Timer.SECOND * _time);
        game.input.keyboard.onPressCallback = _processKey;
    };

    this.zoomIn = function() {
        var scale = game.stage.scale.x + .8;
        game.add.tween(game.stage.scale).to({x: scale, y: scale}, 400).start();
    }

};