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
    this.init = function (game, x, y, data) {
        //create sprite
        this.enemySprite = game.add.sprite(x, y, data.src);
		helper.initSprite(this.enemySprite, data.srcScale, data.srcScale);
        
        //stuff dealing with movement move locations
        this.enemySprite.target = enemyStuff.moveToPoint;
        
        //stats
        this.enemySprite.data = Object.create(data);
        
        //civilian stuff
        this.enemySprite.civilian = null;
        
        //functions attached to enemySprite
        this.enemySprite.hit = this.hit;    
        this.enemySprite.moveToTarget = this.moveToTarget;
        this.enemySprite.moveToEnd = this.moveToEnd;
        this.enemySprite.endReached = this.endReached;
        this.enemySprite.destinationReached = this.destinationReached;
        this.enemySprite.killed = this.killed;
        
        this.addToArray().enemySprite.moveToTarget();
    };
    
    //add to specific arrays
    this.addToArray = function () {
        enemyStuff.allEnemyArray.push(this.enemySprite);
        return this;
    };
    
    //move to target
    //this == sprite
    this.moveToTarget = function () {
        this.rotation = game.physics.arcade.angleBetween(this, this.target);
        game.physics.arcade.moveToObject(this, this.target, this.data.moveSpeed);
    };
    
    //enemy hit
    //stateless function, dont use "this"
    this.hit = function (bulletSpritec, enemySprite) {
        //decrease enemy health, kill and remove bullet, add to tower's hit score
        if (enemySprite.data.health === 0) {
            enemySprite.killed(enemySprite);
        } else {
            enemySprite.data.health --;
            
            bulletSpritec.towerSprite.hit ++;
            helper.removeFromArray(bulletSpritec.towerSprite.bulletArray, null, null, bulletSpritec);
        }   //else enemySprite health
    };   
    
    this.killed = function (enemySprite) {
        if (enemySprite.civilian != null) {
            enemySprite.civilian.sprite.isPickedUp = false;
            enemySprite.civilian.sprite.dropped();
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
        
        //create new civilian if point is home
        if (point === enemyStuff.home) {
            enemySprite.civilian = new Civilan().init(game, enemySprite.x, enemySprite.y);
            enemySprite.civilian.isPickedUp = true;
        }
        
        //change target
        enemySprite.end = enemyStuff.moveToPoint2;
        enemySprite.target = enemyStuff.endPoint;
        enemySprite.moveToTarget();
    };
    
    //enemy reaches end
    //intended to be used as a stateless function, don't use "this"
    this.endReached = function (enemySprite, end){
        enemySprite.civilian.sprite.dropped();
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
