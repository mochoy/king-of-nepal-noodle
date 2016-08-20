var towerStuff = {};

towerStuff.allTowerArr = [];
towerStuff.autoTowerArr = [];
towerStuff.manualTowerArr = [];

towerStuff.towerSlotArr = [];

towerStuff.moveToPoint;


//tower superclass thingy
TowerPrototype = function () {
    //create sprite
    this.init = function (game, x, y, data) {
        this.sprite = game.add.sprite(x, y, data.src);
        helper.initSprite(this.sprite, data.srcScale, data.srcScale);
        this.sprite.inputEnabled = true;
        
		//initialize shooting stuff
        this.sprite.bulletArray = [];
        this.sprite.target = towerStuff.moveToPoint;
        this.sprite.canShoot = data.canShoot;
        
        //towerSprite's functions
        this.sprite.shoot = this.shoot;    
        this.sprite.findEnemy = this.findEnemy;
        this.sprite.clicked = this.clicked;
        
        //stats stuff
        //all default MainTower stats
        this.sprite.data = Object.create(data);
        
        //attatch upgradeManager to sprite object
        this.sprite.upgradeManager = new UpgradeManager(this.sprite, data.upgrades);
        
        //towerSprite clickable
        //if pass in function, function will be part of sprite
        this.sprite.events.onInputDown.add(
            function () {
                this.sprite.upgradeManager.displayUpgradeInfo()
            }, this);
    
        this.sprite.timer = game.time.events.loop(this.sprite.data.fireRate, function () {
            if (this.sprite.canShoot == true){
                this.sprite.shoot(this.sprite, this.sprite.target);
            }
        }, this);
        
        //call functions
        this.addToArray();
        this.createRange();
	  
        return this;
    };   //function create
    
    //add tower to specific arrays 
    this.addToArray = function () {
        towerStuff.allTowerArr.push(this.sprite);
        towerStuff.manualTowerArr.push(this.sprite);
        
        return this;
    };   //function 
    
    //shoot
    this.shoot = function (towerSpritel, target) {
        //bullet creating stuff
        var bullet = game.add.sprite(0, 0, this.img);
        bullet.x = towerSpritel.x;
        bullet.y = towerSpritel.y;
       	helper.initSprite(bullet, 1, 1);
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
    };  //fucntion
    

};   //class MainTower

//ManualTower subclass of TowerPrototype
//Manualtowers aim on click
ManualTower = function () {
    //inherit from parent class 
    this.inherit = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer();
    };
    this.inherit(this, TowerPrototype);
};

//AutoTower subclass of TowerPrototype
//Autotowers aim automatically
AutoTower = function () {
    //inherit from TowerPrototype
    this.inherit = function (t, c) {    //t is this, c is constructor
        t.c = c;
        t.c();
    };  
    this.inherit(this, TowerPrototype);
    
    //add sprite to specific arrays
    this.addToArray = function () {
        towerStuff.allTowerArr.push(this.sprite);
        towerStuff.autoTowerArr.push(this.sprite);
    };
    
    
    this.findEnemy = function (enemyArray) {
		//find enemy
        for (var i = 0; i < enemyArray.length; i ++){
            enemySprite = enemyArray[i];
            if (this.range.contains(enemySprite.x, enemySprite.y)) {
                this.canShoot = true;
                this.target = enemySprite;
            } else {
				this.canShoot = false;
			}
        }   //for
		
		//rotate to enemy
		if (this.canShoot) {
			this.rotation = game.physics.arcade.angleBetween(this, this.target);
		}
		
    };  //function findEnemy
};


//towerSlot supercalss thingy
towerStuff.TowerSlotPrototype = function () {
    this.img = "pathIMG";
    this.sprite = null;
    
    //create all the TowerSlot stuff
    this.create = function (game, x, y) {
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
	  	towerStuff.mainTower = new window[towerData.data[0].class]().init(game, x, y, towerData.data[0]);
    } else {
	  	towerStuff.mainTower = new window[towerData.data[1].class]().init(game, x, y, towerData.data[1]);
    }
};

