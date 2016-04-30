//enemyStuff.js 1-24-2016 broken code for now
var enemyHelper = {};

enemyHelper.allEnemyArray = new Array();
enemyHelper.enemyBasicArray = new Array();
enemyHelper.enemySpecialArray = new Array();


var EnemyBasic = function () {
    this.movingToPoint = 0;
        
    this.health = 5;
    this.moveSpeed = 200;
    this.sprite = null;
    this.imgName = "bookIMG";
    this.parentArray = enemyHelper.enemyBasicArray;
    this.id = 1;

    this.enable = function(game, spawnX, spawnY){
        this.sprite = game.add.sprite(spawnX, spawnY, this.imgName);
        game.physics.arcade.enable(this.sprite);
        
        this.sprite.movingToPoint = 1;
        this.object = this;
        
        this.addToSpecificArray();
        enemyHelper.allEnemyArray.push(this);
    }
        
    this.addToSpecificArray= function(){
        enemyHelper.enemyBasicArray.push(this);  //specific    
    }
    
}

//keep track of all enemySpecials in a game

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

enemyHelper.spawnNewEnemy = function () {
    //makes a new enemy which shows up in THE game
    //must be useable to be called without any parameters
    var randomNum = Math.random();
    if (randomNum < 0.5){
        new EnemyBasic().enable(game, helper.pathStuff.setValues(2, 1, 0), helper.pathStuff.setValues(2, 2, 0));
    } else {    
        new EnemySpecial().enable(game, helper.pathStuff.setValues(2, 1, 0), helper.pathStuff.setValues(2, 2, 0));
    }
}

function moveEnemyAlongPath (enemy, nextPoint){
    var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
    
    game.physics.arcade.moveToObject (enemy.sprite, helper.pathStuff.pathPointArray[enemy.movingToPoint], 500);
    game.physics.arcade.overlap (enemy.sprite, helper.pathStuff.pathPointArray[enemy.movingToPoint], moveToNextPoint, null, this);
    
    if (game.physics.arcade.collide (enemy.sprite, nextPoint, null, null, null, this) ){
        console.log("overlapped")
    }
    
}
function moveEnemyAlongPath (enemy, nextPoint){
    var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
//    game.physics.arcade.moveToObject (enemy, helper.pathStuff.pathPointArray[enemy.movingToPoint], 500);
    game.physics.arcade.overlap (enemy.sprite, nextPoint, nextPoint, null, this);
}
enemyHelper.moveEnemyAlongPath = function (enemy, nextPoint){
    // var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
    // console.log(enemy.movingToPoint)
    
    game.physics.arcade.moveToObject(enemy.sprite, helper.pathStuff.pathArray[enemy.sprite.movingToPoint], 200);
    game.physics.arcade.overlap (enemy.sprite, helper.pathStuff.pathArray[enemy.sprite.movingToPoint], enemyHelper.moveToNextPoint, null, this);
    
};

enemyHelper.moveToNextPoint = function (enemySprite, currentPoint){
    for (var i = 0; i < helper.pathStuff.pathPointArray.length; i ++){
        // console.log(currentPoint.x + "," + currentPoint.y);
        
        var enemyArray;
        
        console.log(enemySprite.object);

        if (enemySprite.object.id == 1){
            enemyArray = enemyHelper.enemyBasicArray;
            console.log(enemyArray);
        } else if (enemySprite.id == 2) {
            enemyArray = enemyHelper.enemyBasicArray;
        }
        
        if (nextPoint == 4) {
            helper.removeFromArray(enemyHelper.allEnemyArray, enemyArray, enemySprite);   
        }  
        
        if ((currentPoint.x == helper.pathStuff.setValues(2, 1, i)) && (currentPoint.y == helper.pathStuff.setValues (2, 2, i))){
            var nextPoint = (i + 1);
            enemySprite.movingToPoint = nextPoint;
        }   // if
    }   //for
};   //function