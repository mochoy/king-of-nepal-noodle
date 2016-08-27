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
            if (this.isPurchaseInterfaceShowing) {      //if upgrade info is alread showing
                UI.removePurchaseInterface();
                this.isPurchaseInterfaceShowing = false;
            } else {
            this.displayUpgradeInfo()                
            }
        }, this);
    
    //periodically shoot depending on tower's fireRate
    this.sprite.fireLoopTimer = game.time.events.loop(this.sprite.data.fireRate, function () {
        if (this.sprite.data.canShoot){
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
            this.sprite.range = new Phaser.Circle(this.sprite.x +(this.sprite.width/2), this.sprite.y+(this.sprite.height/2), this.sprite.data.rangeVal)
        }   //if
        
        return this;
    };  //fucntion
    
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
    };
    
    //this reference to sprite
    this.sprite.findEnemy = function (enemyArray) {
		//find enemy
        for (var i = 0; i < enemyArray.length; i ++){
            enemySprite = enemyArray[i];
            if (this.range.contains(enemySprite.x, enemySprite.y)) {
                this.data.canShoot = true;
                this.target = enemySprite;
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
towerStuff.TowerSlotPrototype = function (x, y) {
    this.img = "pathIMG";
    this.sprite = null;
    
    this.inheritEntity = function (thiz, constructer) {
        thiz.constructer = constructer;
        constructer(x, y, null, this.img);
    }
    this.inheritEntity(this, Entity);
    
    //create all the TowerSlot stuff
    this.create = function (game) {
        this.sprite = game.add.sprite(x, y, this.img);
        this.sprite.inputEnabled = true;
        
        this.sprite.hasTower = false;
        
        //functions
        this.sprite.clicked = this.clicked;
        this.sprite.buyTower = this.buyTower;
        
        this.sprite.events.onInputDown.add(this.sprite.clicked, this);
		
		towerStuff.towerSlotArr.push(this.sprite);
    };  //function create
    
    this.clicked = function () {
        this.sprite.buyTower();
    }
    
    this.buyTower = function () {
        this.hasTower = true;
        towerStuff.createTower(1, this.x ,this.y);
        this.inputEnabled = false;
    }
};


towerStuff.createTower = function (towerNum, x, y) {
    if (towerNum == 0){
	  	towerStuff.mainTower = new window[towerData.data[0].class](game, x, y, towerData.data[0]).createRange().addToArray();
    } else {
	  	towerStuff.mainTower = new window[towerData.data[1].class](game, x, y, towerData.data[1]).createRange().addToArray();
    }
};

