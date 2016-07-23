var towerStuff = {};

towerStuff.allTowerArray = [];
towerStuff.towerNeedSearchArray = [];
towerStuff.towerFollowMouseArray = [];

towerStuff.towerSlotArray = [];

towerStuff.moveToPoint;


//tower superclass thingy
TowerPrototype = function () {
    this.image = 'tower1IMG';
    this.towerSprite = undefined;

    //create sprite
    this.init = function (game, x, y, data) {
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
        this.towerSprite.clicked = this.clicked;
        
        //stats stuff
        //all default MainTower stats
        this.towerSprite.fireRate = 500;    //lower fireRate = shoot faster
        this.towerSprite.bulletSpeed = 1000;
        this.towerSprite.weaponAccuracy = 500;
        this.towerSprite.hit = 0;
        this.towerSprite.rangeVal = 0;
        
        //towerSprite clickable
        this.towerSprite.events.onInputDown.add(this.towerSprite.clicked, this);
    
        this.towerSprite.timer = game.time.events.loop(this.towerSprite.fireRate, function () {
            if (this.towerSprite.canShoot == true){
                this.towerSprite.shoot(this.towerSprite, this.towerSprite.target);
            }
        }, this);
        
        //call functions
        this.addToArray();

        return this;
    };   //function create
    
    //add tower to specific arrays 
    this.addToArray = function () {
        towerStuff.allTowerArray.push(this.towerSprite);
        towerStuff.towerFollowMouseArray.push(this.towerSprite);
    };   //function 
    
    //shoot
    this.shoot = function (towerSpritel, target) {
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
        
        //weapon inaccuracy
        bullet.body.velocity.x += towerSpritel.weaponAccuracy*(Math.random() - 0.5);
        bullet.body.velocity.y += towerSpritel.weaponAccuracy*(Math.random() - 0.5);
    };   //function shoot

    //when tower clicked
    this.clicked = function () {
        console.log("tower clicked!");
    };
    

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

//MainTower subclass of ManualTower
towerStuff.MainTower = function () {
    //inherit from ManualTower
    this.inherit = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer();
    };
    this.inherit(this, towerStuff.ManualTower);
};


//AutoTower subclass of TowerPrototype
//Autotowers aim automatically
towerStuff.AutoTower = function () {
    //inherit from TowerPrototype
    this.inherit = function (t, c) {    //t is this, c is constructor
        t.c = c;
        t.c();
    };  
    this.inherit(this, towerStuff.TowerPrototype);
    
    //add sprite to specific arrays
    this.addToArray = function () {
        towerStuff.allTowerArray.push(this.towerSprite);
        towerStuff.towerNeedSearchArray.push(this.towerSprite);
        this.towerSprite.canShoot = false;
    };
    
    //update or create variables specific to AutoTower
    this.addStats = function () {
        this.towerSprite.rangeVal = 500;  
    };
    
    //create tower's range
    this.createRange = function () {
        if (this.towerSprite.rangeVal != 0) {
            towerSprite = this.towerSprite;
            towerSprite.range = new Phaser.Circle(towerSprite.x+(towerSprite.width/2), towerSprite.y+(towerSprite.height/2), towerSprite.rangeVal)
        }   //if
    };  //fucntion
    
    this.findEnemy = function (enemyArray) {
        for (var i = 0; i < enemyArray.length; i ++){
            enemySprite = enemyArray[i];
            if (this.range.contains(enemySprite.x, enemySprite.y)) {
                this.canShoot = true;
                this.target = enemySprite;
                this.rotation = game.physics.arcade.angleBetween(this, this.target);
    
            }   //if
        }   //for
    };  //function findEnemy
    
    //call functions specific to this tower
    this.callSpecificFunctions = function () {
        this.addStats();
        this.createRange();
    }   //function
};

//BasicTower subclass of AutoTower
towerStuff.BasicTower = function () {
    //inherit from TowerPrototype
    this.inherit = function (t, c) {
        t.c = c;
        t.c();
    };  
    this.inherit(this, towerStuff.AutoTower);
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

towerStuff.AutoTowerSlot = function () {
    //inherit from parent class
    this.inherit = function (t, c) {
        t.c = c;
        t.c();
    }    
    this.inherit(this, towerStuff.TowerSlotPrototype);
    
};


towerStuff.createTower = function (towerNum, x, y) {
    if (towerNum == 0){
	  	towerStuff.mainTower = new window[towerData.data[0].class]().init(game, x, y, towerData.data[0]);
		new window[enemyData.data[0].class]().init(game, (game.width/3), 10, enemyData.data[0]);
//        towerStuff.mainTower = new towerStuff.MainTower().init(game, x, y);
    } else {
        towerStuff.newTower = new towerStuff.BasicTower().init(game, x, y).callSpecificFunctions();
    }
};