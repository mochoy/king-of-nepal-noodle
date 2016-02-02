//enemyStuff.js 1-24-2016 broken code for now


console.log(enemyHelper);

enemyHelper.allEnemyArray = new Array();
enemyHelper.enemyBasicArray = new Array();
enemyHelper.enemySpecialArray = new Array();


var EnemyBasic = function () {
    this.movingToPoint = 0;
        
    this.health = 5;
    this.moveSpeed = 200;
    this.sprite = null;
    this.imgName = "bookIMG";

    this.enable = function(game, spawnX, spawnY){
        this.sprite = game.add.sprite(spawnX, spawnY, this.imgName);
        game.physics.arcade.enable(this.sprite);
        
        this.sprite.movingToPoint = 1;
        
        this.addToSpecificArray();
        enemyHelper.allEnemyArray.push(this);
    }
    this.addToSpecificArray= function(){
        enemyHelper.enemyBasicArray.push(this);  //specific    
    }
    
}

//keep track of all enemySpecials in a game

var EnemySpecial = function () {
    this.constructor= EnemyBasic;
    this.constructor();
    this.moveSpeed = 250;
    this.imgName = "dudeIMG";
    
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

enemyHelper.moveEnemyAlongPath = function (enemy, nextPoint){
    // var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
    // console.log(enemy.movingToPoint)
    
    game.physics.arcade.moveToObject(enemy.sprite, helper.pathStuff.pathArray[enemy.sprite.movingToPoint], 200);
    game.physics.arcade.overlap (enemy.sprite, helper.pathStuff.pathArray[enemy.sprite.movingToPoint], enemyHelper.moveToNextPoint, null, this);
    
}

enemyHelper.moveToNextPoint = function (enemySprite, currentPoint){
    for (var i = 0; i < helper.pathStuff.pathPointArray.length; i ++){
        // console.log(currentPoint.x + "," + currentPoint.y);
        if (nextPoint == 4) {
            var enemyArray = helper.enemyBasicArray;
            if (enemySprite.type == 2){
                enemyArray = helper.enemySpecialArray;
            }
            helper.removeFromArray(enemyHelper.allEnemyArray, enemyArray, enemySprite);   
        }  
        
        if ((currentPoint.x == helper.pathStuff.setValues(2, 1, i)) && (currentPoint.y == helper.pathStuff.setValues (2, 2, i))){
            var nextPoint = (i + 1);
            enemySprite.movingToPoint = nextPoint;
        }   // if
    }   //for
}   //function