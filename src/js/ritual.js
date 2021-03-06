var BeanRitual = function () {
    var _keys = 0;
    var _time = 0;
    var _callback = null;
    var _keycount = 0;
    var _timeout = null;
    var _game = null;
    var _overlay = null;
    var _overlay_y = null;
    var _overlayText = null;
    //var _overlayText_use = null;
    var _overlayText_keys = null;
    var _player = null;
    var _buttonMask = null;
    var _timeTween = null;

    var _processKey = function (key) {
        var nesKey = _keys[_keycount];
        if (key.toLowerCase() == nesKey) {
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
        clearInterval(_timeTween);
        _overlay.destroy();
        _overlayText.destroy();
        _overlay_y.destroy();
        //_overlayText_use.destroy();
        _overlayText_keys.destroy();
        _buttonMask.destroy();

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
        _buttonMask = game.add.graphics();
        _buttonMask.beginFill(0xffffff, 1);
        _buttonMask.drawRect(0, _game.height * 0.7, _game.width, 10);

        _overlay = game.add.graphics();
        _overlay.beginFill(0x000000, 0.5);
        _overlay.drawRect(0, 0, _game.width, _game.height * 0.7);

        _overlay_y = game.add.graphics();
        _overlay_y.beginFill(0xfdd835, 1);
        _overlay_y.drawRect(0,0, _game.width, 160);

        _overlay.fixedToCamera = true;
        _overlay_y.fixedToCamera = true;
        _buttonMask.fixedToCamera = true;
        _overlayText = _game.add.text(0, 0, "COMBINATION TO SABOTAGE THE MACHINE");

        _overlayText.font = 'Lato';
        _overlayText.fontSize = 32;
        _overlayText.align = 'center';
        _overlayText.fill = '#000000';
        _overlayText.boundsAlignH = "center";
        _overlayText.boundsAlignV = "middle";

       /* _overlayText_use = _game.add.text(0, 0, "USE");
        _overlayText_use.font = 'Lato';
        _overlayText_use.fontSize = 72;
        _overlayText_use.align = 'center';
        _overlayText_use.fill = '#ffffff';
        _overlayText_use.boundsAlignH = "center";
        _overlayText_use.boundsAlignV = "middle";*/


        _overlayText_keys = _game.add.text(0, 0, _keys[0].toUpperCase() + "    " + _keys[1].toUpperCase() + "    " + _keys[2].toUpperCase() + "    " + _keys[3].toUpperCase());
        _overlayText_keys.font = 'Lato';
        _overlayText_keys.fontSize = 90;
        _overlayText_keys.align = 'center';
        _overlayText_keys.fill = '#ffffff';
        _overlayText_keys.boundsAlignH = "center";
        _overlayText_keys.boundsAlignV = "middle";

        _timeTween = setInterval(function () {
            var step = _game.width / 200;
            _buttonMask.x = _buttonMask.x - step;
        }, 25);
        _overlayText.fixedToCamera = true;
        //_overlayText_use.fixedToCamera = true;
        _overlayText_keys.fixedToCamera = true;

        _overlayText.setTextBounds(0, 50, _game.width, 50);
        //_overlayText_use.setTextBounds(0, 0, _game.width, _game.height * 0.7 - 150);
        _overlayText_keys.setTextBounds(0, 0, _game.width, _game.height * 0.7 + 150);
    }

};