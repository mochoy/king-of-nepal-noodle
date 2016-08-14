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
        this.towerSprite = game.add.sprite(x, y, data.src);
        helper.initSprite(this.towerSprite, data.srcScale, data.srcScale);
        this.towerSprite.inputEnabled = true;
        
		//initialize shooting stuff
        this.towerSprite.bulletArray = [];
        this.towerSprite.target = towerStuff.moveToPoint;
        this.towerSprite.canShoot = data.canShoot;
        
        //towerSprite's functions
        this.towerSprite.shoot = this.shoot;    
        this.towerSprite.findEnemy = this.findEnemy;
        this.towerSprite.clicked = this.clicked;
        
        //stats stuff
        //all default MainTower stats
        this.towerSprite.data = data;
        
        //towerSprite clickable
        this.towerSprite.events.onInputDown.add(this.towerSprite.clicked, this);
    
        this.towerSprite.timer = game.time.events.loop(this.towerSprite.data.fireRate, function () {
            if (this.towerSprite.canShoot == true){
                this.towerSprite.shoot(this.towerSprite, this.towerSprite.target);
            }
        }, this);
        
        //call functions
        this.addToArray();
	  	this.createRange();
	  
        return this;
    };   //function create
    
    //add tower to specific arrays 
    this.addToArray = function () {
        towerStuff.allTowerArr.push(this.towerSprite);
        towerStuff.manualTowerArr.push(this.towerSprite);
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

    //when tower clicked
    this.clicked = function () {
        console.log("tower clicked!");
    };
  
	//create tower's range
    this.createRange = function () {
        if (this.towerSprite.data.rangeVal != 0) {
            this.towerSprite.range = new Phaser.Circle(this.towerSprite.x +(this.towerSprite.width/2), this.towerSprite.y+(this.towerSprite.height/2), this.towerSprite.data.rangeVal)
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
        towerStuff.allTowerArr.push(this.towerSprite);
        towerStuff.autoTowerArr.push(this.towerSprite);
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

