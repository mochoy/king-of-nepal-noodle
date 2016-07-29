var enemyStuff = {
    home: null,
    moveToPoint: null,
    endPoint: null
};

enemyStuff.allEnemyArray = [];


//Enemy superclass thingy
EnemyPrototype = function () {
    this.enemySprite = null;
    
    //create sprite
    this.init = function (game, x, y, obj) {
        //create sprite
        this.enemySprite = game.add.sprite(x, y, obj.src);
		helper.initSprite(this.enemySprite, 1, 1);
        
        //stuff dealing with movement move locations
        this.enemySprite.home = enemyStuff.home;
        this.enemySprite.target = enemyStuff.moveToPoint;
        
        //stats
        this.enemySprite.health = obj.health;
        this.enemySprite.moveSpeed = obj.moveSpeed;
        
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
            enemySprite.killed(enemySprite);
        } else {
            enemySprite.health --;
            
            bulletSpritec.towerSprite.hit ++;
            helper.removeFromArray(bulletSpritec.towerSprite.bulletArray, null, null, bulletSpritec);
        }   //else enemySprite health
    };   
    
    this.killed = function (enemySprite) {
        if (enemySprite.civilian != null) {
            enemySprite.civilian.sprite.isPickedUp = false;
        }
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);
    };
    
    //enemy reaches destination: home or civilian
    //stateless function
    this.destinationReached = function (enemySprite, point) {        
        //if point is a civilian
        if (point != enemyStuff.home) {
            helper.removeFromArray(allCivilianArr, null, null, point);
        }
        
        //create new civilian
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
        helper.removeFromArray(allCivilianArr, null, null, enemySprite.civilian.sprite);
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);

    };
    
};

enemyStuff.spawnEnemy = function () {
    var num = Math.random();
    if (num < 0.5) {
		new window[enemyData.data[0].class]().init(game, (game.width/3), 10, enemyData.data[0]);
//        new enemyStuff.EnemyBasic().init(game, (game.width/3), 10);
    } else {
		new window[enemyData.data[0].class]().init(game, ((game.width/3)*2), 10, enemyData.data[0]);
//        new enemyStuff.EnemyBasic().init(game, ((game.width/3)*2), 10);
    }
};

enemyStuff.changeTarget = function (target) {
    for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy ++) {
        enemyStuff.moveToPoint = target;
        enemyStuff.allEnemyArray[enemy].target = enemyStuff.moveToPoint;
    }  
};
