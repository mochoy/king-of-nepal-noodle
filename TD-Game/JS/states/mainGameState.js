var centerX , centerY, canClickOnGame = true, data;

//config font stuff
WebFontConfig = {
  google: { families: [ 'Montserrat' ] }
};

var mainGameVar = {
    create: function (){
        //scale game to fit page
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffffff'

        centerX = game.width/2;
        centerY = game.height/2;
        
        game.time.events.loop(Phaser.Timer.SECOND, enemyStuff.enemyFactory, this);
        
        dataHelper.initGameData();
        
        towerStuff.moveToPoint = game.add.sprite(centerX, centerY, null);
        towerStuff.moveToPoint.visible = false
        
        enemyStuff.initVenturePoints();

        towerStuff.towerFactory(0, game.world.width/2, 500);
//        towerStuff.towerFactory(1, 100, 100);
        
        towerStuff.slotFactory(1, 400, 300);
        towerStuff.slotFactory(1, 100, 300);
        
        UI.createUI().createUnPauseInputListener().createPauseBtn();
        
    },  //function create
    
    update: function (){
        // Aim manual towers to mouse click
        game.input.onDown.add(function (event) {            
            if (canClickOnGame) {
                var canTowerRotate = true;         
                
                //check if clicked on tower
                loop:
                for (var i = 0; i < towerStuff.allTowerArr.length; i ++) {                        
                    var towerSprite = towerStuff.allTowerArr[i];

                    //if tower is clicked
                    if(helper.checkIfMouseOverlapping(towerSprite, event.x, event.y)){ 
                        canTowerRotate = false;
                        break loop;
                    }   //if
                }   //for
                
                //rotate only if can
                if (canTowerRotate){ 
                    helper.setXY(towerStuff.moveToPoint, event.x, event.y);
                    for (var i = 0; i < towerStuff.manualTowerArr.length; i ++) {
                        var towerSprite = towerStuff.manualTowerArr[i];
                        towerSprite.rotation = (game.physics.arcade.angleToPointer(towerSprite)) + 90;
                    }   //for
                }   //if

            }       //if
        }, this);
        
        //collision for bullets and enemies
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
    
        //move enemy to target
        for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++) {
            enemyStuff.allEnemyArray[enemy].moveToTarget();
        }
        
        //tower find enemy
        for (var tower = 0; tower < towerStuff.autoTowerArr.length; tower++) {
            towerStuff.autoTowerArr[tower].findEnemy(enemyStuff.allEnemyArray);
        }   //for tower find enemy
        
        //when enemy reaches home or end
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
        
        //keep max ammount of bullets at 20 per tower
        for (var tower = 0; tower < towerStuff.allTowerArr.length; tower++) {
            var towerSprite = towerStuff.allTowerArr[tower];
            if (towerSprite.bulletArray.length > 20) {
                towerSprite.bulletArray.shift().destroy();
            }
        }   //for
        
        //civilain follow enemy
        for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++) {
            var enemySprite = enemyStuff.allEnemyArray[enemy];
            if (enemySprite.civilian != null) {
                enemySprite.civilian.followEnemy(enemySprite);
            }
        }       //for
        
        //keep max amount of civilians at 20
        if (allCivilianArr.length > 20) {
            allCivilianArr.shift().destroy();
        }
        
        //kill enemy if dropped() somehow isnt called but it has been dropped
        for (var civilian = 0; civilian < allCivilianArr.length; civilian++) {
            //if civilain isnt picked up then drop()
            if (!allCivilianArr[civilian].isPickedUp) {
                allCivilianArr[civilian].dropped(false);
            }
        }
    
        helper.bringToTop();
    }  //method update
    
};   //object mainGameVar
