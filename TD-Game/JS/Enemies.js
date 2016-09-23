var enemyStuff = {
    home: null,
    moveToPoint: null,
    endPoint: null
};

enemyStuff.allEnemyArray = [];


//Enemy superclass thingy
EnemyPrototype = function (x, y, data) {
    this.inheritEntity = function (thiz, constructer) {
        thiz.constructor = constructer;
        thiz.constructor(x, y, data, data.src);
    };
    this.inheritEntity(this, Entity)
    
    this.sprite.target = enemyStuff.moveToPoint;
    this.sprite.civilian = null;
    
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
    
    this.sprite.moveToTarget = function () {
//        this.rotation = game.physics.arcade.angleBetween(this, this.target);
//        game.physics.arcade.moveToObject(this, this.target, this.data.moveSpeed);
        
        var ovrlpSprite, moveSpeed = this.data.moveSpeed;
        
        if (this.m.cntr >= 100) {      //reset values if counter reaches max
            this.m.rand = Math.random();
            this.m.cntr = 0;
        }
        
        //check if enemy overlaps towerslot
        loop:
            for (var i = 0; i < towerStuff.towerSlotArr.length; i ++) {
                if (game.physics.arcade.overlap(this, towerStuff.towerSlotArr[i])) {
                    ovrlpSprite = towerStuff.towerSlotArr[i];
                    break loop;
                }
            }        
        
        //if not overlapping slot
        if (!ovrlpSprite) {
            //randomize enemy movement in x axis to make it look like its snaking
            this.m.cntr < 50 ? this.x += this.m.rand : this.x -= this.m.rand;
            
            this.m.xValArr.push(this.x);
            this.m.xValArr.length > 100 ? this.m.xValArr = []: null;
            
            this.m.cntr++;
            //move down/up to endpoint/home
            this.y > this.target.y ? this.y -= moveSpeed: this.y += moveSpeed;
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
                
            }else {
                this.y > this.target.y ? this.y -= moveSpeed: this.y += moveSpeed;
            }
            
            
        }      //if overlapping towerslot/tower
            
        
    };  //method
    
    //enemy hit
    //stateless function, dont use "this"
    this.sprite.hit = function (bulletSpritec, enemySprite) {
        //decrease enemy health, kill and remove bullet, add to tower's hit score
        if (enemySprite.data.health === 0) {
            enemySprite.killed(enemySprite);
        } else {
            enemySprite.data.health--;
            bulletSpritec.towerSprite.hit++;
        }   //else enemySprite health
            
        //if bullet can still pass enemies, dont kill it
        if (bulletSpritec.pierce === 0) {
            helper.removeFromArray(bulletSpritec.towerSprite.bulletArray, null, null, bulletSpritec);
        } else {
            bulletSpritec.pierce--;
        }
    };   
    
    this.sprite.killed = function (enemySprite) {
        if (enemySprite.civilian != null) {
            enemySprite.civilian.sprite.isPickedUp = false;
            enemySprite.civilian.sprite.dropped();
        }
        
        data.money+= enemySprite.data.rewardMoney;
        UI.updateUI();
        
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);
    };
    
    //enemy reaches destination: home or civilian
    //stateless function
    this.sprite.destinationReached = function (enemySprite, point) {            
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
    };
    
    //enemy reaches end
    //intended to be used as a stateless function, don't use "this"
    this.sprite.endReached = function (enemySprite, end){              
        //decrement health
        if (window["data"].health > 0) {                        
            window["data"].health --;
            UI.updateUI();
        }
        
        enemySprite.civilian.sprite.dropped(true);
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);

    };
    
};

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
};

enemyStuff.changeTarget = function (target) {
    for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy ++) {
        enemyStuff.moveToPoint = target;
        enemyStuff.allEnemyArray[enemy].target = enemyStuff.moveToPoint;
    }  
};
