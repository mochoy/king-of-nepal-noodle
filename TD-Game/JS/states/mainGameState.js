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
        towerStuff.aimManualTowers().autoTowerFindEnemies().limitBulletsForTowers();
        
        enemyStuff.collideEnemiesWithBullets().moveEnemiesToTarget().enemyReachEnd();
    
       
        
       
        
        
        
        
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
