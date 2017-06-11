var game;

function startMenu (){
    game = new Phaser.Game(512, 720, Phaser.AUTO, '');
    game.state.add('bootState', bootStateVar);
    game.state.add('preloadState', preloadStateVar);
    game.state.add('startMenuState', startMenuVar)
    game.state.add('mainGameState', mainGameVar);

    game.state.start('bootState');
}