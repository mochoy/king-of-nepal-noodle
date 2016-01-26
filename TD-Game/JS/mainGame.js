//mainGame.js 1-24-2016 broken code for now

var enemyHelper= {};


var mainGameVar = {
    book: null,
    point: null,
    
    preload: function (){
        game.load.image ("bookIMG", "Assets/Images/Test/book.jpg");                 //test asset
        game.load.image ("pathIMG", "Assets/Images/Test/greyBlock.jpg");            //test asset
        game.load.image ("pathPointIMG", "Assets/Images/Test/storyOfSeeds.png");    //test asset
        game.load.image ("dudeIMG", "Assets/Images/Test/dude.png")                  //test asset
    },
    
    create: function (){
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.book = game.add.sprite(250, 100, "bookIMG");
        game.physics.arcade.enable(this.book);
        this.book.inputEnabled = true;
        
        this.createPath("pathIMG");
        
        var enemySpawnTimer = game.time.events.loop(Phaser.Timer.SECOND, enemyHelper.spawnNewEnemy, this);
    },
    
    update: function (){
        this.book.events.onInputDown.add(this.showList, this);
        
        for (var i = 0; i < enemyHelper.allEnemyArray.length; i ++){
            enemyHelper.moveEnemyAlongPath (enemyHelper.allEnemyArray[i], helper.pathStuff.pathArray[1])
        }
                        
//        for (var i = 0; i < helper.pathStuff.pathArray.length; i ++){
//            var pointToMoveTo = 0;
//            for (var k = 0; k < helper.pathStuff.pathPointArray.length; k ++){
//                game.physics.arcade.overlap(this.book, helper.pathStuff.pathArray[pointToMoveTo], this.moveToNextPoint, null, this);
//            }   // for 
//            game.physics.arcade.moveToObject(this.book, helper.pathStuff.pathArray[pointToMoveTo], 200);
//        }   // for
        
    },
    
    
    showList: function () {
        console.log("clicked");
    },
    
    createPath: function(name) {
        for (var i = 0; i < 3; i++){
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
    
}   //object main game var


var helper = {
    pathStuff: {
        pathArray: new Array(),
        pathPointArray: new Array(),
        
        pathCoordsX: [100, 99, 480],
        pathCoordsY: [0, 297, 297],
        
        pathScaleX: [0.03, 0.3, 0.03],
        pathScaleY: [0.3, 0.03, 0.3],
        
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
    }   //pathStuff
}   // helper