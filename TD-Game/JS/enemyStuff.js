var enemyStuff = {};

enemyStuff.allEnemyArray = [];

enemyStuff.moveToPoint;
enemyStuff.moveToPoint2;

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
        this.enemySprite.home = enemyStuff.moveToPoint;
        this.enemySprite.end = enemyStuff.moveToPoint2;
        this.enemySprite.target = this.enemySprite.home;
        
        
        //stats
        this.enemySprite.health = 3;
        this.enemySprite.moveSpeed = 100;
        
        //functions attached to enemySprite
        this.enemySprite.hit = this.hit;    
        this.enemySprite.moveToTarget = this.moveToTarget;
        this.enemySprite.moveToEnd = this.moveToEnd;
        this.enemySprite.endReached = this.endReached;
        this.enemySprite.homeReached = this.homeReached;
        
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
    this.hit = function (bulletSpritec, enemySpritec) {
        //decrease enemy health, kill and remove bullet, add to tower's hit score
        if (enemySpritec.health == 0) {
            //kill sprite stuff
            helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySpritec);
        } else {
            enemySpritec.health --;
            
            bulletSpritec.towerSprite.hit ++;
            helper.removeFromArray(bulletSpritec.towerSprite.bulletArray, null, null, bulletSpritec);
        }   //else enemySprite health
    };   
    
    //enemy reaches home
    this.homeReached = function (enemySprite, point) {
        
        //change target
        enemySprite.end = enemyStuff.moveToPoint2;
        enemySprite.target = enemySprite.end;
        enemySprite.moveToTarget();
    };
    
    //enemy reaches end
    //intended to be used as a stateless function, don't use "this"
    this.endReached = function (enemySprite, end){
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);

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

//update enemy's target when it changes
enemyStuff.updateTarget = function (target) {
    for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++) {
        enemySprite = enemyStuff.allEnemyArray[enemy]; 
        //switch targets
        enemySprite.target = target;
        enemySprite.moveToTarget();
    }   //for
};  //function
