var enemyStuff = {};

enemyStuff.allEnemyArray = [];

enemyStuff.moveToPoint;
enemyStuff.moveToPoint2;

//Enemy superclass thingy
enemyStuff.EnemyPrototype = function () {
    this.imgName = "bookIMG";
    this.enemySprite = null;
    
    //create sprite
    this.create = function (game, x, y) {
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
    /*
    var randomNum = Math.random();
    if (randomNum < 0.5){
        new EnemyBasic().enable(game, helper.pathStuff.getSpawnCoords(1), helper.pathStuff.getSpawnCoords(2));
    } else {    
        new EnemySpecial().enable(game, helper.pathStuff.getSpawnCoords(1), helper.pathStuff.getSpawnCoords(2));
    }
    */
    
    var num = Math.random();
    if (num < 0.5) {
        new enemyStuff.EnemyBasic().create(game, (game.width/3), 10);
    } else {
        new enemyStuff.EnemyBasic().create(game, ((game.width/3)*2), 10);
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

/*
var EnemySpecial = function () {
    this.constructor = EnemyBasic;
    this.constructor();
    
    this.moveSpeed = 250;
    this.imgName = "dudeIMG";
    this.parentArray = enemyStuff.enemySpecialArray;
    this.id = 2;

    this.addToSpecificArray= function(){  //override
        enemyStuff.enemySpecialArray.push(this);  //specific    
    }
}
*/

/*
function moveEnemyAlongPath (enemy, nextPoint){
    var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
    
    game.physics.arcade.moveToObject (enemy.sprite, helper.pathStuff.pathPointArray[enemy.movingToPoint], 500);
    game.physics.arcade.overlap (enemy.sprite, helper.pathStuff.pathPointArray[enemy.movingToPoint], moveToNextPoint, null, this);
    
    if (game.physics.arcade.collide (enemy.sprite, nextPoint, null, null, null, this) ){
        console.log("overlapped")
    }
    
}

enemyStuff.moveEnemyAlongPath = function (enemy, nextPoint){
     var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
    
    game.physics.arcade.moveToObject(enemy.sprite, helper.pathStuff.pathArray[enemy.sprite.movingToPoint], 200);
    
    game.physics.arcade.overlap (enemy.sprite, helper.pathStuff.pathArray[enemy.sprite.movingToPoint], enemyStuff.moveToNextPoint, null, this);
    
};

enemyStuff.moveToNextPoint = function (enemySprite, currentPoint){
    //go through pathStuff array 
    for (var i = 0; i < helper.pathStuff.pathPointArray.length; i ++){
        // console.log(currentPoint.x + "," + currentPoint.y);
        
        var enemyArray, nextPoint;
        
        //check what point enemy is at
        if ((currentPoint.x == helper.pathStuff.setValues(2, 1, i)) && (currentPoint.y == helper.pathStuff.setValues (2, 2, i))){
            nextPoint = (i + 1);
            enemySprite.movingToPoint = nextPoint;
        }   // if
                
        //check if enemy is at the last point
        if (nextPoint == 4) { 
            //find sprite to kill and get the coresponding array
                                    
//            if (enemyStuff.findSprite(enemySprite).id == 1){
//                enemyArray = enemyStuff.enemyBasicArray;
//            } 
//            else if (enemySprite.id == 2) {
//                enemyArray = enemyStuff.enemySpecialArray;
//            }   //else if
            
            //remove enemy from array and kill
            console.log(enemyStuff.findSprite(enemySprite))
//            helper.removeFromArray(enemyStuff.allEnemyArray, enemyStuff.findSprite(enemySprite), enemySprite);   
        }   //if c
        
        
    }   //for
};   //function

enemyStuff.findSprite = function (enemySprite) {
    var array = enemyStuff.enemyBasicArray;
    var array2 = enemyStuff.enemySpecialArray;
    
    //check if sprite is basic
    for (var i = 1; i < array.length; i++){
        //search for passed in sprite in array
        if (enemySprite == array[i].sprite){
            console.log(array);
//            return array[i];
            return array;
        }
    }
    //check if sprite is special
    for (var i = 1; i < array2.length; i++){
        //seach for passed in sprite in array
        if (enemySprite == array2[i].sprite){
            console.log(array2)
//            return array2[i];
            return array2;
        }
    }
};  //function findSprite

*/
