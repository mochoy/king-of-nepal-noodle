var enemyStuff = {
    home: null,
    moveToPoint: null,
    endPoint: null
};

enemyStuff.allEnemyArray = [];


//Enemy superclass thingy
EnemyPrototype = function (x, y, enemyData) {
    this.inheritEntity = function (thiz, constructer) {
        thiz.constructor = constructer;
        thiz.constructor(x, y, enemyData, enemyData.src);
    };
    this.inheritEntity(this, Entity)
    
    this.sprite.target = enemyStuff.moveToPoint;
    this.sprite.civilian = null;
    
    this.sprite.canMove = true;
    
    this.sprite.health = enemyData.health;
    
    //add to specific arrays
    this.addToArray = function () {
        enemyStuff.allEnemyArray.push(this.sprite);
        return this;
    };
    
    //move to target
    //this == sprite
    this.sprite.m = {
        rand: Math.random(),
        cntr: 0,
        
        xValArr: []
    };    //move object to help with moving of spirte. These values have to be kept after the method terminiates
    
    //commit
    this.sprite.moveToTarget = function () {
        if (this.canMove) {
            var ovrlpSprite = helper.isOverlappingArr(this, towerStuff.towerSlotArr)
            var moveSpeed = enemyData.moveSpeed;
           
            if (this.m.cntr >= 100) {      //reset values if counter reaches max
                this.m.rand = Math.random();
                this.m.cntr = 0;
            }       
        
            //if not overlapping slot
            if (!ovrlpSprite) {            
                //get and rotate to next point its going to move to
                var nextX, nextY
                var lastX = this.m.xValArr.length > 1 ? this.m.xValArr[this.m.xValArr.length - 1]: null;
                this.rotation = game.physics.arcade.angleToXY(this, 
                    nextX = this.m.cntr < 50 ? this.x + this.m.rand : this.x - this.m.rand, 
                    nextY = this.y > this.target.y ? this.y - moveSpeed: this.y +     moveSpeed);
                
                nextX = lastX ? (nextX - lastX)/2 + this.x : nextX;
                //randomize enemy movement in x axis to make it look like its snaking using next coord values
                this.x = nextX;
                this.y = nextY;
              
                this.m.xValArr.push(this.x);
                //reset arr
                if (this.m.xValArr.length > 100) {
                    this.m.xValArr = [];
                }
                
                this.m.cntr++;

            }
        
            if (ovrlpSprite) {
                //if sprite is at towerslot/tower, only go around it    
                if (helper.isOverlappingAbove(this, ovrlpSprite)) {                  
                    //move sprite around towerslot in direction that will bring it closer to its target
                    this.x < this.target.x + (this.target.width/2) ? this.x += moveSpeed : this.x -= moveSpeed;
                } else if (helper.isOverlappingLeft(this, ovrlpSprite)) {    
                    //force sprite to randomly go the direction away from tower or slot
                    this.x -= 5;
                    this.m.cntr = 52;
                } else if (helper.isOverlappingRight(this, ovrlpSprite)) {
                    this.x += 5;
                    this.m.cntr = 2;
                } else if (helper.isOverlappingBelow(this, ovrlpSprite)) {
                    //move sprite around towerslot in direction that will bring it closer to its target
                    this.x < this.target.x + (this.target.width/2) ? this.x += moveSpeed : this.x -= moveSpeed;
                } else {
                    this.y > this.target.y ? this.y -= moveSpeed: this.y += moveSpeed;
                }
            
            }      //if overlapping towerslot/tower 
              
        }
        
        
            
        
    };  //method moveToTarget
    
    //enemy hit
    //stateless function, dont use "this"
    this.sprite.hit = function (bulletSpritec, enemySprite) {
        //decrease enemy health, kill and remove bullet, add to tower's hit score
        //decrease enemy health, kill and remove bullet, add to tower's hit score
                
        if (enemySprite.health <= 0) {
            enemySprite.killed(enemySprite);
        } else {
            enemySprite.health--;
            bulletSpritec.towerSprite.hit++;
        }   //else enemySprite health
            
        //if bullet can still pass enemies, dont kill it
        if (bulletSpritec.pierce === 0) {
            helper.removeFromArray(bulletSpritec.towerSprite.bulletArray, null, null, bulletSpritec);
        } else {
            bulletSpritec.pierce--;
        }
    };   //method hit
    
    this.sprite.killed = function (enemySprite) {        
        if (enemySprite.civilian) {
            enemySprite.civilian.sprite.isPickedUp = false;
            enemySprite.civilian.sprite.dropped(false);
        }
        
        
        data.money += enemyData.rewardMoney;
        UI.updateUI();
                
        enemySprite.kill().canMove = false;
//        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);
    };  //method killed
    
    //enemy reaches destination: home or civilian
    //stateless function
    this.sprite.homeReached = function (enemySprite, point) {            
        // //if point is a civilian
        // if (point != enemyStuff.home) {
        //     helper.removeFromArray(allCivilianArr, null, null, point);
        // }
        
        // //create new civilian if point is home
        // if (point === enemyStuff.home) {
        //     enemySprite.civilian = new Civilan().init(game, enemySprite.x, enemySprite.y);
        //     enemySprite.civilian.isPickedUp = true;
        // }
        
        // //change target
        // enemySprite.end = enemyStuff.moveToPoint2;
        // enemySprite.target = enemyStuff.endPoint;
        
        // enemySprite.hasReachedHome = true;
        
        enemySprite.endReached(enemySprite, point);
    };      //method homeReached
    
    //enemy reaches end
    //intended to be used as a stateless function, don't use "this"
    this.sprite.endReached = function (enemySprite, end){              
        //decrement health
        if (data.health > 0) {                        
            data.health --;
            UI.updateUI();
        }
        
//        enemySprite.civilian.sprite.dropped(true);
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);

    };  //method endReached
    
};


//init and set all obejcts and sprites involving what/where enemies have to travel to
enemyStuff.initVenturePoints = function () {
    //point at buttom
    enemyStuff.endPoint = helper.setHW(game.add.sprite(0, game.height - 200, "dudeIMG"), 1, game.width);
    game.physics.arcade.enable(enemyStuff.endPoint);

    //point at top
//    enemyStuff.endPoint = helper.setHW(game.add.sprite(0, 0, "dudeIMG"), 1, game.width);
//    game.physics.arcade.enable(enemyStuff.endPoint);

    enemyStuff.moveToPoint = enemyStuff.endPoint;
    
    return enemyStuff;

}


enemyStuff.enemyFactory = function () {
    var num = Math.random();
    var currentEnemyData = enemyData.data[data.currentPeriod];
    
    if (num > 0.5) {
		return new window[currentEnemyData[0].class]((game.width/3), 10, currentEnemyData[0]).addToArray();
//        new enemyStuff.EnemyBasic().init(game, (game.width/3), 10);
    } else {
		return new window[currentEnemyData[0].class](((game.width/3)*2), 10, currentEnemyData[0]).addToArray();
//        new enemyStuff.EnemyBasic().init(game, ((game.width/3)*2), 10);
    }
    
    return enemyStuff;  
};

enemyStuff.changeTarget = function (target) {
    for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy ++) {
        enemyStuff.moveToPoint = target;
        enemyStuff.allEnemyArray[enemy].target = enemyStuff.moveToPoint;
    }  
    
    return enemyStuff;
};

enemyStuff.collideEnemiesWithBullets = function () {
    for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++) {
            var enemySprite = enemyStuff.allEnemyArray[enemy];
            //loop through all towers
            for (var tower = 0; tower < towerStuff.allTowerArr.length; tower++ ){
                var towerSprite = towerStuff.allTowerArr[tower];
                //loop through bullets
                for (var bullet = 0; bullet < towerSprite.bulletArray.length; bullet++) {
                    var bulletSprite = towerSprite.bulletArray[bullet];                    
                    game.physics.arcade.overlap(bulletSprite, enemySprite, enemySprite.hit, null, this);
                }   //for iterate bulletArray
            }   //for iterate towerStuff.allTowerArray
        }   //for iterate enemyStuff.allEnemyArray
    
    return enemyStuff;
}

enemyStuff.moveEnemiesToTarget = function () {
     for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++) {
            enemyStuff.allEnemyArray[enemy].moveToTarget();
    }
    
    return enemyStuff;
}

enemyStuff.enemyReachEnd = function () {
    for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++){
            var enemySprite = enemyStuff.allEnemyArray[enemy];
            
            //call specific functions depending on what's reached
//            if (!enemySprite.hasReachedHome){
//                game.physics.arcade.overlap(enemySprite, enemyStuff.home, enemySprite.homeReached, null, this); 
//            } else 
//            if (enemySprite.hasReachedHome) {
            game.physics.arcade.overlap(enemySprite, enemyStuff.endPoint, enemySprite.endReached, null, this);

//            }
            
        }   //for
    
    return enemyStuff;
}


