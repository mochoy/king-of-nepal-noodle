var enemyStuff = {};

enemyStuff.allEnemyArray = new Array();

enemyStuff.moveToPoint;
enemyStuff.moveToPoint2;

enemyStuff.EnemyPrototype = function () {
    this.imgName = "bookIMG";
    this.enemySprite = null;
};

//create sprite
enemyStuff.EnemyPrototype.prototype.create = function (game, x, y) {
    //create sprite
    this.enemySprite = game.add.sprite(x, y, this.imgName);
    this.enemySprite.anchor.set(0.5);
    game.physics.arcade.enable(this.enemySprite);
    
    this.enemySprite.target = enemyStuff.moveToPoint;
    //functions attached to enemySprite
    this.enemySprite.hit = this.hit;    
    this.enemySprite.moveToEnd = this.moveToEnd;
    this.enemySprite.endReached = this.endReached;
    this.enemySprite.homeReached = this.homeReached;
    
    this.addToArray();
    this.addStats();
    this.moveToTarget();
}

//add stats
enemyStuff.EnemyPrototype.prototype.addStats = function () {
    this.enemySprite.health = 5;
    this.enemySprite.moveSpeed = 200;
};

//move to target
enemyStuff.EnemyPrototype.prototype.moveToTarget = function () {
    this.enemySprite.rotation = game.physics.arcade.angleBetween(this.enemySprite, this.enemySprite.target);
    game.physics.arcade.moveToObject(this.enemySprite, this.enemySprite.target, this.enemySprite.bulletSpeed);
};

//move to end
//this == sprite
enemyStuff.EnemyPrototype.prototype.moveToEnd = function () {
    this.rotation = game.physics.arcade.angleBetween(this, this.target);
    game.physics.arcade.moveToObject(this, this.target, this.bulletSpeed);
};

//add to specific arrays
enemyStuff.EnemyPrototype.prototype.addToArray = function () {
    enemyStuff.allEnemyArray.push(this.enemySprite);
};

//enemy hit
enemyStuff.EnemyPrototype.prototype.hit = function (bulletSpritec, enemySpritec) {
    //decrease enemy health, kill and remove bullet, add to tower's hit score
    if (enemySpritec.health == 0) {
        //kill sprite stuff
        helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySpritec);
    } else {
        enemySpritec.health --;
        
        bulletSpritec.towerSprite.hit ++;
        helper.removeFromArray(bulletSpritec.towerSprite.bulletArray, null, null, bulletSpritec);
    }   //else enemySprite health
}

//enemy reaches home
enemyStuff.EnemyPrototype.prototype.homeReached = function (enemySprite, point) {
    enemySprite.target = enemyStuff.moveToPoint2;
    enemySprite.moveToEnd();
};

//enemy reaches end 
enemyStuff.EnemyPrototype.prototype.endReached = function (enemySprite, end) {
    helper.removeFromArray(enemyStuff.allEnemyArray, null, null, enemySprite);
},


enemyStuff.EnemyBasic = function () {};
enemyStuff.EnemyBasic.prototype = new enemyStuff.EnemyPrototype();


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
}


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
