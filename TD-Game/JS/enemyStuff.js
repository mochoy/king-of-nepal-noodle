var enemyHelper = {};

enemyHelper.allEnemyArray = new Array();

enemyHelper.moveToPoint;


var EnemyBasic = function () {
    this.imgName = "bookIMG";

    this.create = function (x, y) {
        this.enemySprite = game.add.sprite(x, y, this.imgName);
        this.enemySprite.anchor.set(0.5);
        game.physics.arcade.enable(this.enemySprite);
        
        enemyHelper.allEnemyArray.push(this.enemySprite);
        
        this.enemySprite.health = 5;
        this.enemySprite.moveSpeed = 200;
        
        this.enemySprite.rotation = game.physics.arcade.angleBetween(this.enemySprite, enemyHelper.moveToPoint);
        game.physics.arcade.moveToObject(this.enemySprite, enemyHelper.moveToPoint, this.enemySprite.bulletSpeed);
    }
        
    this.addToSpecificArray= function(){
        enemyHelper.enemyBasicArray.push(this);  //specific    
    }
    
    this.hit = function () {
        
    }
}

/*
var EnemySpecial = function () {
    this.constructor = EnemyBasic;
    this.constructor();
    
    this.moveSpeed = 250;
    this.imgName = "dudeIMG";
    this.parentArray = enemyHelper.enemySpecialArray;
    this.id = 2;

    this.addToSpecificArray= function(){  //override
        enemyHelper.enemySpecialArray.push(this);  //specific    
    }
}
*/

enemyHelper.spawnEnemy = function () {
    //makes a new enemy which shows up in THE game
    //must be useable to be called without any parameters
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
        new EnemyBasic().create((game.width/3), 10);
    } else {
        new EnemyBasic().create(((game.width/3)*2), 10);
    }
}

/*
function moveEnemyAlongPath (enemy, nextPoint){
    var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
    
    game.physics.arcade.moveToObject (enemy.sprite, helper.pathStuff.pathPointArray[enemy.movingToPoint], 500);
    game.physics.arcade.overlap (enemy.sprite, helper.pathStuff.pathPointArray[enemy.movingToPoint], moveToNextPoint, null, this);
    
    if (game.physics.arcade.collide (enemy.sprite, nextPoint, null, null, null, this) ){
        console.log("overlapped")
    }
    
}

enemyHelper.moveEnemyAlongPath = function (enemy, nextPoint){
     var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
    
    game.physics.arcade.moveToObject(enemy.sprite, helper.pathStuff.pathArray[enemy.sprite.movingToPoint], 200);
    
    game.physics.arcade.overlap (enemy.sprite, helper.pathStuff.pathArray[enemy.sprite.movingToPoint], enemyHelper.moveToNextPoint, null, this);
    
};

enemyHelper.moveToNextPoint = function (enemySprite, currentPoint){
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
                                    
//            if (enemyHelper.findSprite(enemySprite).id == 1){
//                enemyArray = enemyHelper.enemyBasicArray;
//            } 
//            else if (enemySprite.id == 2) {
//                enemyArray = enemyHelper.enemySpecialArray;
//            }   //else if
            
            //remove enemy from array and kill
            console.log(enemyHelper.findSprite(enemySprite))
//            helper.removeFromArray(enemyHelper.allEnemyArray, enemyHelper.findSprite(enemySprite), enemySprite);   
        }   //if c
        
        
    }   //for
};   //function

enemyHelper.findSprite = function (enemySprite) {
    var array = enemyHelper.enemyBasicArray;
    var array2 = enemyHelper.enemySpecialArray;
    
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