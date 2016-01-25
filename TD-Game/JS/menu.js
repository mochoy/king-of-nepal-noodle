var MenuVar = {
    buttonStart: null,
    
    preload : function() {
        game.load.spritesheet('buttonStartSS', 'Assets/Images/Test/sistineChapel.jpg', 220, 98);
    },

    create: function () {
        this.buttonStart = game.add.button(100, 100, "buttonStartSS", this.startGame, this, 2, 1, 0  );
    },
                                           
    
    startGame: function (){
        game.state.add('MainGame', mainGameVar);
        game.state.start('MainGame');    
    }

};