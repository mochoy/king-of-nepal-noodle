var enemyStuff = {
    home: null,
    moveToPoint: null,
    endPoint: null
};

enemyStuff.allEnemyArray = [];


//Enemy superclass thingy
enemyStuff.EnemyPrototype = function () {
    this.imgName = "bookIMG";
    this.enemySprite = null;
    
    //create sprite
    this.init = function (game, x, y) {
        //create sprite
        this.enemySprite = game.add.sprite(x, y, this.imgName);
        this.enemySprite.anchor.set(0.5);
        game.physics.arcade.enable(this.enemySprite);
        
        //stuff dealing with movement move locations
        this.enemySprite.home = enemyStuff.home;
        this.enemySprite.target = this.enemySprite.home;
        
        //stats
        this.enemySprite.health = 3;
        this.enemySprite.moveSpeed = 100;
        
        //civilian stuff
        this.enemySprite.civilian = null;
        
        //functions attached to enemySprite
        this.enemySprite.hit = this.hit;    
        this.enemySprite.moveToTarget = this.moveToTarget;
        this.enemySprite.moveToEnd = this.moveToEnd;
        this.enemySprite.endReached = this.endReached;
        this.enemySprite.destinationReached = this.destinationReached;
        this.enemySprite.killed = this.killed;
        
        this.addToArray();
        this.enemySprite.moveToTarget();
    };
    
    //add to specific arrays
    this.addToArray = function () {
        enemyStuff.allEnemyArray.push(this.enemySprite);
    };
    
    //move to target
    //this == sprite
    this.moveToTarget = function () {
        this.rotation = game.physics.arcade.angleBetween(this, this.target);
        game.physics.arcade.moveToObject(this, this.target, this.moveSpeed);
    };
    
    //enemy hit
    //stateless function, dont use "this"
    this.hit = function (bulletSpritec, enemySprite) {
        //decrease enemy health, kill and remove bullet, add to tower's hit score
        if (enemySprite.health == 0) {
            //kill sprite stuff
            enemySprite.killed(enemySprite);
        } else {
            enemySprite.health --;
            
            bulletSpritec.towerSprite.hit ++;
            helper.removeFromArray(bulletSpritec.towerSprite.bulletArray, null, null, bulletSpritec);
        }   //else enemySprite health
    };   
    
    this.killed = function (enemySprite) {
        if (enemySprite.civilian != null) {
            enemySprite.civilian.isPickedUp = false;
        }
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);
    };
    
    //enemy reaches destination
    //stateless function
    this.destinationReached = function (enemySprite, point) {
        if (point != enemyStuff.home) {
            helper.removeFromArray(allCivilianArr, null, null, point);
        }
        
        enemySprite.civilian = new Civilan().init(game, enemySprite.x, enemySprite.y);
        enemySprite.civilian.isPickedUp = true;
        
        //change target
        enemySprite.end = enemyStuff.moveToPoint2;
        enemySprite.target = enemyStuff.endPoint;
        enemySprite.moveToTarget();
    };
    
    //enemy reaches end
    //intended to be used as a stateless function, don't use "this"
    this.endReached = function (enemySprite, end){
        console.log("end reached");
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);
        helper.removeFromArray(allCivilianArr, null, null, enemySprite.civilian);

    };
    
};

//subclass of EnemyPrototype
enemyStuff.EnemyBasic = function () {
    //inherit from parent class
    this.inherit = function (t, c) {
        t.c = c;
        t.c();
    }    
    this.inherit(this, enemyStuff.EnemyPrototype);
};



enemyStuff.spawnEnemy = function () {
    var num = Math.random();
    if (num < 0.5) {
        new enemyStuff.EnemyBasic().init(game, (game.width/3), 10);
    } else {
        new enemyStuff.EnemyBasic().init(game, ((game.width/3)*2), 10);
    }
};

enemyStuff.changeTarget = function () {
    for (var enemy; enemy < enemyStuff.allEnemyArray.length; enemy ++) {
        enemyStuff.allEnemyArray[enemy].target = enemyStuff.moveToPoint;
    }  
};
