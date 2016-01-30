var BeanRitual = function () {
    var _keys = 0;
    var _time = 0;
    var _callback = null;
    var _keycount = 0;
    var _timeout = null;
    var _game = null;
    var _overlay = null;
    var _player = null;
    var _processKey = function (key) {
        console.log(key);
        var nesKey = _keys[_keycount];
        console.log('THE KEY', key, _keys, _keycount, nesKey);
        if (key == nesKey) {
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
        _overlay.destroy();
    };

    var _onFail = function () {
        _destroy();
        _callback(false);
    };

    var _onComplete = function () {
        _destroy();
        _callback(true);
    };

    this.start = function (game, player, task, callback) {
        console.log(game, task, callback);
        _time = task.time;
        _keys = task.keys;
        _callback = callback;
        _game = game;
        _player = player;
        _showTasks();
        _timeout = setTimeout(_onFail, Phaser.Timer.SECOND * _time);
        game.input.keyboard.onPressCallback = _processKey;
    };

    var _showTasks = function () {
        var style = { font: "25px Arial", fill: "#ff0044", align: "center", backgroundColor:"rgba(255, 255, 255, 0.5)" };
        _overlay = _game.add.text(_game.width/4, _game.width/4,"Perform the following ritual to destroy this part:\n"+_keys+"\n", style);
        _overlay.fixedToCamera = true;
    }

};