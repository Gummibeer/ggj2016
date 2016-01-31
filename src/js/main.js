function renderScores() {
    document.getElementById('deadBeans').innerText = localStorage.getItem("deadBeans");
    document.getElementById('solvedRituals').innerText = localStorage.getItem("solvedRituals");
}

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'stage', {});

game.state.add('Boot', boot);
game.state.add('Load', load);
game.state.add('Menu', menu);
game.state.add('Intro', intro);

game.state.add('Level', level);
game.state.add('Swap', swap);

game.state.add('GameWon', gamewon);
game.state.add('GameOver', gameover);

game.state.start('Boot');

renderScores();