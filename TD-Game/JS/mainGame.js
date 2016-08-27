var centerX , centerY;

//config font stuff
WebFontConfig = {
  google: { families: [ 'Montserrat' ] }
};

//init game data from gameData json file
var data = Object.create(gameData.data)[0];

var mainGameVar = {
    preload: function (){
        //test button spritesheets
        game.load.spritesheet('testBtn1SS', 'Assets/Images/Test/baddie.png', 32, 32);
        game.load.spritesheet('testBtn2SS', 'Assets/Images/Test/book.jpg', 66, 25);
        game.load.spritesheet('testBtn3SS', 'Assets/Images/Test/dude.png', 48, 48);
        game.load.spritesheet('testBtn4SS', 'Assets/Images/Test/platform.png', 32, 40);
        game.load.spritesheet('testBtn5SS', 'Assets/Images/Test/storyOfSeeds.png', 48, 48);
        
        game.load.image ("bookIMG", "Assets/Images/Test/book.jpg");                 
        game.load.image ("pathIMG", "Assets/Images/Test/greyBlock.jpg");            
        game.load.image ("pathPointIMG", "Assets/Images/Test/storyOfSeeds.png");    
        game.load.image ("dudeIMG", "Assets/Images/Test/dude.png")                  
        game.load.image ("tower1IMG", "Assets/Images/Test/baddie.png")             
        
        //more test tower assets
        //from canyon defense
        game.load.image("chainGunIMG", "Assets/Images/Test/canyonDefenseChainGun.png");    
        game.load.image("gooGunIMG", "Assets/Images/Test/canyonDefenseGooGun.png");
        game.load.image("gutlingLaserIMG", "Assets/Images/Test/canyonDefenseGutlingLaser.png");
        game.load.image("howitzerIMG", "Assets/Images/Test/canyonDefenseHowitzer.png");        
        game.load.image("missileTurretIMG", "Assets/Images/Test/canyonDefenseMissileTurret.png");
        game.load.image("aaGunIMG", "Assets/Images/Test/canyonDefenseAAGun.png");
        game.load.image("gaussCannonIMG", "Assets/Images/Test/canyonDefenseGaussCannon.png");
        game.load.image("nulificatorIMG", "Assets/Images/Test/canyonDefenseNulificator.png");
        game.load.image("oilSprayIMG", "Assets/Images/Test/canyonDefenseOilSpray.png");

        //from btd5
        game.load.image("beeKeeperIMG", "Assets/Images/Test/btd5BeeKeeper.png");
        game.load.image("bloonChipperIMG", "Assets/Images/Test/btd5BloonChipper.png");
        game.load.image("bombTowerIMG", "Assets/Images/Test/btd5BombTower.png");
        game.load.image("boomerangThrowerIMG", "Assets/Images/Test/btd5BoomerangThrower.png");
        game.load.image("dartlingGunIMG", "Assets/Images/Test/btd5DartlingGun.png");
        game.load.image("dartMonkeyIMG", "Assets/Images/Test/btd5DartMonkey.png");
        game.load.image("glueGunnerIMG", "Assets/Images/Test/btd5GlueGunner.png");
        game.load.image("iceTowerIMG", "Assets/Images/Test/btd5IceTower.png");
        game.load.image("monkeyAceIMG", "Assets/Images/Test/btd5MonkeyAce.png");
        game.load.image("monkeyApprenticeIMG", "Assets/Images/Test/btd5MonkeyApprentice.png");
        game.load.image("monkeyBuccaneerIMG", "Assets/Images/Test/btd5MonkeyBuccaneer.png");
        game.load.image("monkeyEngineerIMG", "Assets/Images/Test/btd5MonkeyEngineer.png");
        game.load.image("monkeySubIMG", "Assets/Images/Test/btd5MonkeySub.png");
        game.load.image("mortarTowerIMG", "Assets/Images/Test/btd5MortarTower.png");
        game.load.image("ninjaMonkeyIMG", "Assets/Images/Test/btd5NinjaMonkey.png");
        game.load.image("sniperMonkeyIMG", "Assets/Images/Test/btd5SniperMonkey.png");
        game.load.image("spikeFactoryIMG", "Assets/Images/Test/btd5SpikeFactory.png");
        game.load.image("superMonkeyIMG", "Assets/Images/Test/btd5SuperMonkey.png");
        game.load.image("tackShooterIMG", "Assets/Images/Test/btd5TackShooter.png");
        game.load.image("wizardLordIMG", "Assets/Images/Test/btd5WizardLord.png");

        
        //some test enemy assets
        game.load.image("mediumGroundEnemyIMG", "Assets/Images/Test/canyonDefenseMediumGroundEnemy.png");
        game.load.image("mediumGroundEnemyIMG", "Assets/Images/Test/canyonDefenseMediumGroundEnemy.png");

        
        game.load.image ("rangeExteriorIMG", "Assets/Images/greyCircle_interior.png");     //range circle
        game.load.image ("rangeExterior2IMG", "Assets/Images/greyCircle_interior2.png");   //range circle
        
        game.load.script("webFont", "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js");
        
    },  //function preload
    
    create: function (){
        //scale game to fit page
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
        
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
        
        new towerStuff.SlotPrototype(500, 500);
        
        UI.createUI();
    },  //function create
    
    update: function (){
        // Aim manual towers to mouse click
        game.input.onDown.add(function () {
            var canAim = false;
            towerStuff.moveToPoint.x = game.input.x;
            towerStuff.moveToPoint.y = game.input.y;
            
            //make sure not clicked on tower before rotate
            for (var i = 0; i < towerStuff.allTowerArr.length; i ++) {                
                var towerSprite = towerStuff.allTowerArr[i];
                if (!game.physics.arcade.overlap(towerStuff.moveToPoint, towerSprite)) {
                    canAim = true;
                    break;
                } else {
                    cainAim = false;
                    break;
                }
            }
            
            //rotate only if can
            if (canAim) {
                for (var i = 0; i < towerStuff.manualTowerArr.length; i ++) {
                    var towerSprite = towerStuff.manualTowerArr[i];
                    towerSprite.rotation = (game.physics.arcade.angleToPointer(towerSprite)) + 90;
                }
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
            game.physics.arcade.overlap(enemySprite, enemyStuff.endPoint, enemySprite.endReached, null, this);
            game.physics.arcade.overlap(enemySprite, enemySprite.target, enemySprite.destinationReached, null, this);
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
