var game;

function startMenu (){
    game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    game.state.add('Menu', MenuVar);
    game.state.start('Menu');
}