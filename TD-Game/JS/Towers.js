var towerStuff = {};

towerStuff.allTowerArr = [];
towerStuff.autoTowerArr = [];
towerStuff.manualTowerArr = [];

towerStuff.towerSlotArr = [];

towerStuff.moveToPoint;


//tower superclass thingy
TowerPrototype = function (game, x, y, data) {    
    //inherit from Entity
    this.inheritBuildingsAndTowers = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(x, y, data);
    };
    this.inheritBuildingsAndTowers(this, BuildingsAndTowers);
    
    //inherit from PurchaseManager
    //yay polymorphism
    this.inheritUpgrades = function (thiz, constructer) {        
        thiz.constructer = constructer;
        thiz.constructer(this.sprite.data.upgrades);
    }
    this.inheritUpgrades(this, PurchaseManager);

    //initialize shooting stuff
    this.sprite.bulletArray = [];
    this.sprite.target = towerStuff.moveToPoint;
    this.sprite.canShoot = data.canShoot;
        
    //towerSprite clickable
    this.sprite.events.onInputDown.add(
        function () {
            if (this.isPurchaseInterfaceShowing) {      //if upgrade info is already showing
                UI.removePurchaseInterface();
                this.isPurchaseInterfaceShowing = false;
            } else {
            this.displayPurchaseInfo()                
            }
        }, this);
    
    //periodically shoot depending on tower's fireRate
    this.sprite.fireLoopTimer = game.time.events.loop(this.sprite.data.fireRate, function () {        
        if (this.sprite.data.canShoot && this.sprite.alive){
            this.sprite.shoot(this.sprite, this.sprite.target);
        }
    }, this);
    
    //add tower's sprite to specific arrays 
    this.addToArray = function () {
        towerStuff.allTowerArr.push(this.sprite);
        towerStuff.manualTowerArr.push(this.sprite);
        
        return this;
    };   //function 
    
    //shoot
    this.sprite.shoot = function (towerSpritel, target) {
        //bullet creating stuff
        var bullet = game.add.sprite(0, 0, "bookIMG");
        bullet.x = towerSpritel.x;
        bullet.y = towerSpritel.y;
       	helper.initSprite(bullet, 0.1, 0.1);
        bullet.inputEnabled = true;
        
        bullet.towerSprite = this;
        towerSpritel.bulletArray.push(bullet);
        
        //bullet shooting stuff
        bullet.rotation = game.physics.arcade.angleBetween(bullet, target);
        game.physics.arcade.moveToObject(bullet, target, towerSpritel.data.bulletSpeed);
        
        //weapon inaccuracy
        bullet.body.velocity.x += towerSpritel.data.weaponAccuracy * (Math.random() - 0.5);
        bullet.body.velocity.y += towerSpritel.data.weaponAccuracy * (Math.random() - 0.5);
    };   //function shoot
  
	//create tower's range
    this.createRange = function () {
        if (this.sprite.data.rangeVal != 0) {
            this.sprite.range = new Phaser.Circle(this.sprite.x +(this.sprite.width/2), this.sprite.y+(this.sprite.height/2), this.sprite.data.rangeVal);
            this.showRange();
        }   //if
        
        return this;
    };  //fucntion
    
    this.showRange = function () {
        this.sprite.graphics = game.add.graphics(0, 0);
        this.sprite.graphics.lineStyle(2, 0x000000, 1);
        this.sprite.graphics.drawCircle(this.sprite.x, this.sprite.y, this.sprite.data.rangeVal);
        
        this.sprite.graphics.visibile = true;
    }
    
    return this;
};   //class MainTower

//ManualTower subclass of TowerPrototype
//Manualtowers aim on click
ManualTower = function (game, x, y, data) {   
    //inherit from parent class 
    this.inherit = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(game, x, y, data);
    };
    this.inherit(this, TowerPrototype);
};

//AutoTower subclass of TowerPrototype
//Autotowers aim automatically
AutoTower = function (game, x, y, data) {
    //inherit from TowerPrototype
    this.inherit = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(game, x, y, data);
    };
    this.inherit(this, TowerPrototype);
    
    //add sprite to specific arrays
    this.addToArray = function () {
        towerStuff.allTowerArr.push(this.sprite);
        towerStuff.autoTowerArr.push(this.sprite);
        
        return this;
    };
    
    //this reference to sprite
    this.sprite.findEnemy = function (enemyArray) {          
		//find enemy
        for (var i = 0; i < enemyArray.length; i ++){
            enemySprite = enemyArray[i];
            if (this.range.contains(enemySprite.x, enemySprite.y)) {
                this.data.canShoot = true;
                this.target = enemySprite;
                break;
            } else {                
                this.data.canShoot = false;
			}
        }   //for
                		
		//rotate to enemy
		if (this.data.canShoot) {
			this.rotation = game.physics.arcade.angleBetween(this, this.target) + 90;
		}
		
    };  //function findEnemy
};


//towerSlot supercalss thingy
//don't need more than one type of slot (ex tower/ building) b/c towers/buildings able to buy will be specified in json file
SlotPrototype = function (x, y, data) {
    this.inheritEntity = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(x, y, data, null);
    }
    this.inheritEntity(this, Entity);
    
    this.inheritUpgrades = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(data)
    }
    this.inheritUpgrades(this, PurchaseManager);
        
    towerStuff.towerSlotArr.push(this.sprite);
    
    this.sprite.hasTower = false;
    this.isPurchaseInterfaceShowing = false
    
    this.sprite.events.onInputDown.add(function () {
//        this.hasTower = true;
//         towerStuff.createTower(1, this.sprite.x ,this.sprite.y);
//        this.sprite.inputEnabled = false;
        if (this.isPurchaseInterfaceShowing) {
            UI.removePurchaseInterface().destroyPurchaseInterface();
            this.isPurchaseInterfaceShowing = false; 
        } else {
            this.displayPurchaseInfo();
        }
        
    }, this);

    
};  //constructor




towerStuff.towerFactory = function (towerNum, x, y) {    
    return new window[towerData.data[towerNum].class](game, x, y, towerData.data[towerNum]).createRange().addToArray();
};

towerStuff.slotFactory = function (slotNum, x, y) {
    return new SlotPrototype(x, y, slotData.data[slotNum])
}

