var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'ggj-2016', {});

game.state.add('Boot', boot);
game.state.add('Preloader', preloader);
game.state.add('Menu', menu);

game.state.add('GameWon', gamewon);
game.state.add('GameOver', gameover);

game.state.start('Boot');