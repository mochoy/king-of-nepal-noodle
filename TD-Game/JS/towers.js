var towerStuff = {};

towerStuff.Tower1 = function () {
    this.range = 10;
    this.damage = 10;
    this.fireRate = 10,
    this.image = 'tower1IMG';
    
}

towerStuff.buyTower = function (towerToBuy, towerSlot) {
    var xCoord = towerSlot.body.x;
    var yCoord = towerSlot.body.y;
    
    if (towerToBuy == 1){
        towerStuff.placeTower(towerStuff.Tower1, xCoord, yCoord);
    }
}

towerStuff.placeTower = function (tower, x, y) {
    new tower;
    
    tower.sprite = game.add.sprite(x, y, tower.image);
    game.physics.arcade.enable(tower.sprite);
}