var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'ggj-2016', {});

game.state.add('Boot', boot);
game.state.add('Load', load);
game.state.add('Menu', menu);

game.state.add('Level1', level_1);

game.state.add('GameWon', gamewon);
game.state.add('GameOver', gameover);

game.state.start('Boot');