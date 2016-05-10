var towerStuff = {};

towerStuff.allTowerArray = new Array();
towerStuff.tower1Array = new Array();

//tower 1 class
towerStuff.Tower1 = function () {
    this.range = 0.8;
    this.damage = 10;
    this.fireRate = 10;
        
    this.image = 'tower1IMG';
    this.rangeInteriorIMG = "rangeExteriorIMG";
    this.rangeInterior2IMG = "rangeExterior2IMG";
    this.rangeExteriorIMG = "rangeInterior2IMG";
    
    this.showingRange = false;
    
    //coords of sprite 
    this.coordsX = null; 
    this.coordsY = null;
    
    this.sprite = null; 
    this.innerRange = null;
    this.outerRange = null;
    
    var $t = this;
    
    this.createRange = function () {
        towerStuff.createRange(this);
    }
    
    this.drawRange = function (){
        towerStuff.drawRange(this);
    }
    
    //if tower selected, show: range
    this.clicked = function () { 
        console.log()
        $t.showingRange != $t.showingRange;
        $t.drawRange();
    }

}

//buy the tower
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

//place tower on location of tower slot
towerStuff.placeTower = function (tower, x, y) {
    //create new instance of tower class
    var tower = new towerStuff.Tower1();
    
    //add a sprite to the new tower object
    tower.sprite = game.add.sprite(x, y, tower.image);
    game.physics.arcade.enable(tower.sprite);
    
    towerStuff.allTowerArray.push(tower);
    towerStuff.tower1Array.push(tower);
    
    tower.createRange();
    
    tower.sprite.inputEnabled = true
    tower.sprite.events.onInputDown.add(tower.clicked, this);
}

//get coordinates of tower sprite
towerStuff.getCoords = function (towerObject, xOrY) {
    if (xOrY == 1){
        return towerObject.sprite.body.x;
    } else if (xOrY == 2) {
        return towerObject.sprite.body.y;
    }
}

//create the circle used to see if enemy is in range of tower
towerStuff.createRange = function (towerObject) {
    var sprite = towerObject.sprite;

    //get range to draw circle
    var d = towerObject.range;
    
    var circle = new Phaser.Circle(towerStuff.getCoords(towerObject, 1), towerStuff.getCoords(towerObject, 2), d);    //circle for range detection only
    
    towerStuff.drawRange(towerObject);
}

//draw circles to represent ranges of tower
towerStuff.drawRange = function (towerObject) {
    if (towerObject.showingRange == false) {
        towerObject.showingRange = true;
        
        console.log("show ranges")

        var sprite = towerObject.sprite;

        var x = towerStuff.getCoords(towerObject, 1);
        var y = towerStuff.getCoords(towerObject, 2);

        //get range to draw circle
        var d = towerObject.range;

        //draw inner circle
        towerObject.outerRange = game.add.sprite(x, y, towerObject.rangeExteriorIMG);
        outerRange = towerObject.outerRange;
        outerRange.alpha = 0.5;
        game.physics.arcade.enable(outerRange);

        //draw outer circle
        towerObject.innerRange = game.add.sprite(x, y, towerObject.rangeInterior2IMG);
        innerRange = towerObject.innerRange;
        innerRange.alpha = 0.5
        game.physics.arcade.enable(innerRange);

        //scale circles to match ranges
        outerRange.scale.x = towerObject.range;
        outerRange.scale.y = towerObject.range;

        innerRange.scale.x = towerObject.range;
        innerRange.scale.y = towerObject.range;

        //ger width and height of the circle
        var outerRangeWidth = outerRange.width;
        var outerRangeHight = outerRange.height;

        var innerRangeWidth = innerRange.width;
        var innerRangeHight = innerRange.height;

        //change position so the middle is on the sprite
        outerRange.position.x = ((x - outerRangeWidth/2) + (sprite.width/2));
        outerRange.position.y = (y - outerRangeHight/2);

        innerRange.position.x = ((x - innerRangeWidth/2) + (sprite.width/2));
        innerRange.position.y = (y - innerRangeHight/2);


        //bring sprite to top so it will appear above the ranges
        game.world.bringToTop(sprite);
    } else if (towerObject.showingRange == true){
        towerObject.showingRange = false;
        console.log("remove ranges");
        
        towerObject.innerRange.kill();
        towerObject.outerRange.kill();
    }
};

//find the enemy to shoot at
towerStuff.findEnemy = function () {
    console.log("collides")
}