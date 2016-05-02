var towerStuff = {};

towerStuff.Tower1 = function () {
    this.range = 10;
    this.damage = 10;
    this.fireRate = 10,
    this.image = 'tower1IMG';
    
}

towerStuff.buyTower = function (towerToBuy, towerSlot) {
    //get coords for where to spawn tower
    var xCoord = towerSlot.body.x;
    var yCoord = towerSlot.body.y;
    
    //check which tower to buy
    if (towerToBuy == 1){
        towerStuff.placeTower(towerStuff.Tower1, xCoord, yCoord);
    }
    
    //remove tower slot
    towerSlot.kill();
}

towerStuff.placeTower = function (tower, x, y) {
    //create new instance of tower class
    new tower;
    
    //add a sprite to the new tower object
    tower.sprite = game.add.sprite(x, y, tower.image);
    game.physics.arcade.enable(tower.sprite);
}