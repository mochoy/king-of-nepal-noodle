var towerStuff = {};

towerStuff.allTowerArray = new Array();
towerStuff.tower1Array = new Array();

towerStuff.Tower1 = function () {
    this.range = 100;
    this.damage = 10;
    this.fireRate = 10,
    this.image = 'tower1IMG';
    
    //coords of sprite 
    this.coordsX = null; 
    this.coordsY = null;
    
    this.sprite = null;
    
    this.setCoords = function () {
        this.coordsX = this.sprite.body.x;
        this.coordsY = this.sprite.body.y;
    }

    this.createRange = function () {
        towerStuff.createRange(this);
    }
    
    this.drawRange = function (){
        towerStuff.drawRange(this);
    }

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
    var tower = new towerStuff.Tower1();
    
    //add a sprite to the new tower object
    tower.sprite = game.add.sprite(x, y, tower.image);
    game.physics.arcade.enable(tower.sprite);
    
    towerStuff.allTowerArray.push(tower);
    towerStuff.tower1Array.push(tower);
    
    tower.setCoords();
    tower.createRange();
}

towerStuff.createRange = function (towerObject) {
    var sprite = towerObject.sprite;
        
    //get coords to draw range
    var xCoords = sprite.body.x;
    var yCoords = sprite.body.y;
    
    //get range to draw circle
    var d = towerObject.range;
    
    var circle = new Phaser.Circle(xCoords, yCoords, d);    //circle for range detection only
    
    towerStuff.drawRange(towerObject);
}

towerStuff.drawRange = function (towerObject) {
    var sprite = towerObject.sprite;
    
    //get coords to draw range
    var xCoords = sprite.body.x;
    var yCoords = sprite.body.y;
    
    //get range to draw circle
    var d = towerObject.range;
    
    //draw circle

}