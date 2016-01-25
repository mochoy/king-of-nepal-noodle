//enemyStuff.js 1-24-2016 broken code for now

enemyHelper.allEnemyArray = new Array();
enemyHelper.enemyBasicArray = new Array();

var EnemyBasic = function () {
    this.movingToPoint = 0;
        
    this.health = 5;
    this.moveSpeed = 200;
    this.sprite = null;
    this.imgName = "bookIMG";
        
    this.enable = function(game, spawnX, spawnY){
        this.sprite = game.add.sprite(spawnX, spawnY, this.imgName);
        game.physics.arcade.enable(this.sprite);
    
        this.addToSpecificArray();
        enemyHelper.allEnemyArray.push(this);
    }
    this.addToSpecificArray= function(){
        enemyHelper.enemyBasicArray.push(this);  //specific    
    }
}

//keep track of all enemySpecials in a game
enemyHelper.enemySpecialArray = new Array();

var EnemySpecial = function () {
    this.constructor= EnemyBasic;
    this.constructor();
    this.moveSpeed = 250;
    this.imgName = "dudeIMG";

    this.addToSpecificArray= function(){  //override
        enemyHelper.enemySpecialArray.push(this);  //specific    
    }
}

function spawnNewEnemy () {
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
    console.log(enemy.movingToPoint)
    var nextPointStuff = helper.pathStuff.pathPointArray[enemy.movingToPoint];
//    game.physics.arcade.moveToObject (enemy, helper.pathStuff.pathPointArray[enemy.movingToPoint], 500);
    game.physics.arcade.overlap (enemy, nextPoint, moveToNextPoint, null, this);
}

function moveToNextPoint (enemy, currentPoint){
    for (var i = 0; i < helper.pathStuff.pathPointArray.length; i ++){
        if ((currentPoint.x == helper.pathStuff.setValues(2, 1, i)) && (currentPoint.y == helper.pathStuff.setValues (2, 2, i))){
            console.log("hi");  
            enemy.movingToPoint = (i + 1);
        }   // if
    }   //for
}   //function