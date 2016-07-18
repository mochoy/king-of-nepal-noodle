var gameManagerStuff = {};
var centerX , centerY;

var mainGameVar = {
    
    preload: function (){
        game.load.image ("bookIMG", "Assets/Images/Test/book.jpg");                 //test asset
        game.load.image ("pathIMG", "Assets/Images/Test/greyBlock.jpg");            //test asset
        game.load.image ("pathPointIMG", "Assets/Images/Test/storyOfSeeds.png");    //test asset
        game.load.image ("dudeIMG", "Assets/Images/Test/dude.png")                  //test asset
        game.load.image ("tower1IMG", "Assets/Images/Test/baddie.png")              //test asset
        
        game.load.image ("rangeExteriorIMG", "Assets/Images/greyCircle_interior.png");     //range circle
        game.load.image ("rangeExterior2IMG", "Assets/Images/greyCircle_interior2.png");   //range circle


    },  //function preload
    
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffffff'

        // helper.createPath("pathIMG");
        
        centerX = game.width/2; centerY = game.height/2;
        
        var enemySpawnTimer = game.time.events.loop(Phaser.Timer.SECOND, enemyStuff.spawnEnemy, this);
        
        towerStuff.moveToPoint = game.add.sprite(centerX, centerY, null);
        
        enemyStuff.moveToPoint = game.add.sprite(centerX, game.height - 200, "dudeIMG");
        game.physics.arcade.enable(enemyStuff.moveToPoint);
        enemyStuff.moveToPoint.width = 1;
        enemyStuff.moveToPoint.height = 1;
        
        enemyStuff.moveToPoint2 = game.add.sprite(centerX, 0, "dudeIMG");
        game.physics.arcade.enable(enemyStuff.moveToPoint2);
        enemyStuff.moveToPoint2.width = 1;
        enemyStuff.moveToPoint2.height = 1;


        towerStuff.createTower(0, game.world.width/2, 500);
        towerStuff.createTower(1, 100, 100);
        
        new towerStuff.TowerSlotPrototype().create(game, 500, 500);


    },  //function create
    
    update: function (){
        towerStuff.moveToPoint.bringToTop();

        // Aim tower to mouse click
        game.input.onDown.add(function () {
            towerStuff.moveToPoint.x = game.input.x;
            towerStuff.moveToPoint.y = game.input.y;
            for (var i = 0; i < towerStuff.towerFollowMouseArray.length; i ++) {
                var towerSprite = towerStuff.towerFollowMouseArray[i];
                towerSprite.rotation = (game.physics.arcade.angleToPointer(towerSprite));
            }
        }, this);
        
        //collision for bullets and enemies
        for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++) {
            var enemySprite = enemyStuff.allEnemyArray[enemy];
            //loop through all towers
            for (var tower = 0; tower < towerStuff.allTowerArray.length; tower++ ){
                var towerSprite = towerStuff.allTowerArray[tower];
                //loop through bullets
                for (var bullet = 0; bullet < towerSprite.bulletArray.length; bullet++) {
                    var bulletSprite = towerSprite.bulletArray[bullet];
                    game.physics.arcade.overlap(bulletSprite, enemySprite, enemySprite.hit, null, this);
                }   //for iterate bulletArray
            }   //for iterate towerStuff.allTowerArray
        }   //for iterate enemyStuff.allEnemyArray
    
        //tower find enemy
        for (var tower = 0; tower < towerStuff.towerNeedSearchArray.length; tower++) {
            towerStuff.towerNeedSearchArray[tower].findEnemy(enemyStuff.allEnemyArray);
        }   //for tower find enemy
        
        //when enemy reaches home or end
        for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++){
            var enemySprite = enemyStuff.allEnemyArray[enemy];
            game.physics.arcade.overlap(enemySprite, enemySprite.home, enemySprite.homeReached, null, null);
            // game.physics.arcade.overlap(enemySprite, enemySprite.end, enemySprite.endReached, null, this);
        }   //for 
    }  //function update
    
};   //object mainGameVar

var helper = {
    pathStuff: {
        pathArray: new Array(),
        pathPointArray: new Array(),
        
        pathCoordsX: [100, 99, 480, 480, 1000],
        pathCoordsY: [0, 297, 297, 600 , 1000],
        
        pathScaleX: [0.03, 0.3, 0.03, 0.003, 0.003],
        pathScaleY: [0.3, 0.03, 0.3, 0.003, 0.003],
        
        getSpawnCoords: function (xOrY){   //1 = x, 2 = y
            if (xOrY == 1){
                return helper.pathStuff.setValues(2, 1, 0);
            } else if (xOrY == 2){
                return helper.pathStuff.setValues(2, 2, 0);
            }
        },
        
        setValues: function (scaleOrCoords, xorY, numToSet){    // scale = 1, coords = 2    x = 1, y = 2  
            if (scaleOrCoords == 1){
                if (xorY == 1){
                    return this.pathScaleX [numToSet];
                }
                if (xorY == 2){      
                    return this.pathScaleY [numToSet];
                }
            } else if (scaleOrCoords == 2) {
                if (xorY == 1){
                    return this.pathCoordsX [numToSet];
                }
                if (xorY == 2){
                    return this.pathCoordsY [numToSet];
                }
            }
        }   //function set values
    },   //pathStuff
    
    showList: function (sprite) {
        towerStuff.buyTower(1, sprite);
    },  //function showlist
    
    createPath: function(name) {
        for (var i = 0; i < 5; i++){
            var path = game.add.sprite (helper.pathStuff.setValues(2, 1, i), helper.pathStuff.setValues(2, 2, i), name);
            path.scale.x = helper.pathStuff.setValues(1, 1, i);
            path.scale.y = helper.pathStuff.setValues(1, 2, i);
//            path.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(path);
            helper.pathStuff.pathArray.push(path);
            
            var pathPoint = game.add.sprite (helper.pathStuff.setValues(2, 1, i), helper.pathStuff.setValues(2, 2, i), "pathPointIMG");
            pathPoint.scale.x = 0.05;
            pathPoint.scale.y = 0.05;
            game.physics.arcade.enable(pathPoint);
            helper.pathStuff.pathPointArray.push(pathPoint);
            
        }   //for 
    },   // function create path
    
    moveToNextPoint: function(enemy, pathPoint){
        for (var i = 0; i < helper.pathStuff.pathArray.length; i++){
            if ((pathPoint.x == helper.pathStuff.setValues(2, 1, i)) && (pathPoint.y == helper.pathStuff.setValues (2, 2, i))){
                var num = i + 1;
                return num;
            }   //if 
        }   //for 
        
        return "hi";

    }   // function move to next object
    
}   // helper

helper.removeFromArray = function (array1, array2, array3, sprite) {
    var newArray1 = [], newArray2 = [], newArray2 = [];
    if (array1 != null){
        for (var i = 0; i < array1.length; i++){
            if (sprite == array1[i]){

                if (i == array1.length - 1) {
                    array1.pop();
                } else {
                    array1[i] = array1.pop();
                }
                sprite.destroy();
    
            }
        }   //for
    }   //if array1
    
    if (!sprite) {
    }
    sprite.destroy();
};