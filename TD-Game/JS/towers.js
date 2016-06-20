var towerStuff = {};

towerStuff.allTowerArray = new Array();
towerStuff.towerNeedSearchArray = new Array();

towerStuff.moveToPoint;

towerStuff.TowerPrototype = function () {
    this.image = 'tower1IMG';
    this.towerSprite = null;
};   //class MainTower

//shoot
towerStuff.TowerPrototype.prototype.shoot = function tpfn1 (towerSpritel, target) {
            //keep max amount of bullets for tower at 20
        if (towerSpritel.bulletArray.length > 20){
            towerSpritel.bulletArray.shift().kill();
        }
        //bullet creating stuff
        var bullet = game.add.sprite(100, 100, this.img);
        bullet.x = towerSpritel.x;
        bullet.y = towerSpritel.y;
        game.physics.arcade.enable(bullet);
        bullet.anchor.set(0.5);
        bullet.inputEnabled = true;
        
        bullet.towerSprite = this;
        towerSpritel.bulletArray.push(bullet);
        
        //bullet shooting stuff
        bullet.rotation = game.physics.arcade.angleBetween(bullet, target);
        game.physics.arcade.moveToObject(bullet, target, towerSpritel.bulletSpeed);
        bullet.body.velocity.x += towerSpritel.weaponAccuracy*(Math.random() - 0.5);
        bullet.body.velocity.y += towerSpritel.weaponAccuracy*(Math.random() - 0.5);
};

//create sprite
towerStuff.TowerPrototype.prototype.create = function tpfn2 (game, x, y) {
    this.towerSprite = game.add.sprite(x, y, this.image);
    game.physics.arcade.enable(this.towerSprite);
    this.towerSprite.anchor.set(0.5);
    this.towerSprite.inputEnabled = true;
    
    this.towerSprite.bulletArray = [];
    this.towerSprite.target = towerStuff.moveToPoint;
    this.towerSprite.canShoot = true;
    
    //towerSprite's functions
    this.towerSprite.shoot = this.shoot;    
    this.towerSprite.findEnemy = this.findEnemy;
    
    this.addStats();
    this.createRange();
    
    this.towerSprite.timer = game.time.events.loop(this.towerSprite.fireRate, function () {
        if (this.towerSprite.canShoot == true){
            this.towerSprite.shoot(this.towerSprite, this.towerSprite.target);
        }
    }, this);
    
    return this;
};

//add stats
towerStuff.TowerPrototype.prototype.addStats = function tpfn3 () {
    this.towerSprite.fireRate = 500;
    this.towerSprite.bulletSpeed = 1000;
    this.towerSprite.weaponAccuracy = 500;
    this.towerSprite.hit = 0;
    this.towerSprite.rangeVal = 100;
};

//add tower to different arrays
towerStuff.TowerPrototype.prototype.addToArray = function tpfn4 (doesNeedSearch) {
    towerStuff.allTowerArray.push(this.towerSprite);
    if (doesNeedSearch == true){
        towerStuff.towerNeedSearchArray.push(this.towerSprite);
        this.towerSprite.canShoot = false;
    }

};

//create range
towerStuff.TowerPrototype.prototype.createRange = function tpfn5 () {
    if (this.towerSprite.range != 0) {
        towerSprite = this.towerSprite;
        towerSprite.range = new Phaser.Circle(towerSprite.x+(towerSprite.width/2), towerSprite.y+(towerSprite.height/2), towerSprite.rangeVal)
    }
};

//find enemy
//this == sprite, not the class
towerStuff.TowerPrototype.prototype.findEnemy = function tpfn6 (enemyArray) {
    for (var i = 0; i < enemyArray.length; i ++){
        enemySprite = enemyArray[i];
        if (this.range.contains(enemySprite.x, enemySprite.y)) {
            console.log("in range")
        }
    }
};

towerStuff.createTower = function (towerNum, x, y) {
    if (towerNum == 0){
        towerStuff.MainTower = new towerStuff.TowerPrototype().create(game, x, y).addToArray(false);
    } else {
        towerStuff.NewTower = new towerStuff.TowerPrototype().create(game, x, y).addToArray(true);
    }
}


/*
=======
towerStuff.tower1Array = new Array();
//ghetto change


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
  
    this.shootableEnemies = [];
    
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
        towerObject.outerRange = sprite.addChild(game.make.sprite(x, y, towerObject.rangeExteriorIMG));
        outerRange = towerObject.outerRange;
        outerRange.alpha = 0.5;
        game.physics.arcade.enable(outerRange);

        //draw outer circle
        towerObject.innerRange = sprite.addChild(game.make.sprite(x, y, towerObject.rangeInterior2IMG));
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
*/

