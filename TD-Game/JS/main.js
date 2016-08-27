var game;

function startMenu (){
    game = new Phaser.Game(512, 720, Phaser.AUTO, '');
    game.state.add('Menu', MenuVar);
    game.state.add('MainGame', mainGameVar);

    game.state.start('Menu');
}