var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'stage', {});

game.state.add('Boot', boot);
game.state.add('Load', load);
game.state.add('Menu', menu);
game.state.add('Progress', progress);

game.state.add('Level', level);

game.state.add('GameWon', gamewon);
game.state.add('GameOver', gameover);

game.state.start('Boot');