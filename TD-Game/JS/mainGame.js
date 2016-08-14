var centerX , centerY;

WebFontConfig = {
  google: { families: [ 'Montserrat' ] }
};

var mainGameVar = {
    preload: function (){
        game.load.image ("bookIMG", "Assets/Images/Test/book.jpg");                 
        game.load.image ("pathIMG", "Assets/Images/Test/greyBlock.jpg");            
        game.load.image ("pathPointIMG", "Assets/Images/Test/storyOfSeeds.png");    
        game.load.image ("dudeIMG", "Assets/Images/Test/dude.png")                  
        game.load.image ("tower1IMG", "Assets/Images/Test/baddie.png")             
        
        game.load.image("chainGunIMG", "Assets/Images/Test/canyonDefenseChainGun.png");    
        game.load.image("gooGunIMG", "Assets/Images/Test/canyonDefenseGooGun.png");
        game.load.image("mediumGroundEnemyIMG", "Assets/Images/Test/canyonDefenseMediumGroundEnemy.png");
        
        game.load.image ("rangeExteriorIMG", "Assets/Images/greyCircle_interior.png");     //range circle
        game.load.image ("rangeExterior2IMG", "Assets/Images/greyCircle_interior2.png");   //range circle
        
         game.load.script("webFont", "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js");
        
    },  //function preload
    
    create: function (){
//        game.add.text(0, 0, "Awesome Game", { fontFamily: 'Montserrat', fontSize: 128, fontWeight: 'bold', fill: '#000000' });        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffffff'

        centerX = game.width/2;
        centerY = game.height/2;
        
        var enemySpawnTimer = game.time.events.loop(Phaser.Timer.SECOND, enemyStuff.spawnEnemy, this);
        
        towerStuff.moveToPoint = game.add.sprite(centerX, centerY, null);
        
        enemyStuff.home = game.add.sprite(centerX, game.height - 200, "dudeIMG");
        game.physics.arcade.enable(enemyStuff.home);
        enemyStuff.home.width = 1;
        enemyStuff.home.height = 1;
           
        enemyStuff.endPoint = game.add.sprite(centerX, 0, "dudeIMG");
        game.physics.arcade.enable(enemyStuff.endPoint);
        enemyStuff.endPoint.width = 10;
        enemyStuff.endPoint.height = 10;
        
        enemyStuff.moveToPoint = enemyStuff.home;


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
            for (var i = 0; i < towerStuff.manualTowerArr.length; i ++) {
                var towerSprite = towerStuff.manualTowerArr[i];
                towerSprite.rotation = (game.physics.arcade.angleToPointer(towerSprite));
            }
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
    
        //tower find enemy
        for (var tower = 0; tower < towerStuff.autoTowerArr.length; tower++) {
            towerStuff.autoTowerArr[tower].findEnemy(enemyStuff.allEnemyArray);
        }   //for tower find enemy
        
        //when enemy reaches home or end
        for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++){
            var enemySprite = enemyStuff.allEnemyArray[enemy];
            //call specific functions depending on what's reached
            game.physics.arcade.overlap(enemySprite, enemySprite.target, enemySprite.destinationReached, null, this);
            game.physics.arcade.overlap(enemySprite, enemyStuff.endPoint, enemySprite.endReached, null, this);
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
            var civilianSprite = allCivilianArr[civilian];
            if (!civilianSprite.isTimerStarted && !civilianSprite.isPickedUp) {
                civilianSprite.dropped();
            }
        }
    
        
    }  //method update
    
};   //object mainGameVar
