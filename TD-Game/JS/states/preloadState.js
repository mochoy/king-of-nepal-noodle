var preloadStateVar = {    
    preload : function() {
        //load legit assets 
        game.load.image("healthSymbolIMG", "Assets/Images/healthSymbol.png");
        game.load.image("moneySymbolIMG", "Assets/Images/moneySymbol.png");
        
        //test button spritesheets
        game.load.spritesheet('testBtn1SS', 'Assets/Images/Test/baddie.png', 32, 32);
        game.load.spritesheet('testBtn2SS', 'Assets/Images/Test/book.jpg', 66, 25);
        game.load.spritesheet('testBtn3SS', 'Assets/Images/Test/dude.png', 48, 48);
        game.load.spritesheet('testBtn4SS', 'Assets/Images/Test/platform.png', 32, 40);
        game.load.spritesheet('testBtn5SS', 'Assets/Images/Test/storyOfSeeds.png', 48, 48);
        
        game.load.image("bookIMG", "Assets/Images/Test/book.jpg");                 
        game.load.image("pathIMG", "Assets/Images/Test/greyBlock.jpg");            
        game.load.image("pathPointIMG", "Assets/Images/Test/storyOfSeeds.png");    
        game.load.image("dudeIMG", "Assets/Images/Test/dude.png")                  
        game.load.image("tower1IMG", "Assets/Images/Test/baddie.png")             
        game.load.image("pauseBtnIMG", "Assets/Images/Test/pauseButton.jpg")             
        
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
        
        //icon assets
        game.load.image("chainGunIconIMG", "Assets/Images/Test/canyonDefenseChainGunIcon.png");    
        game.load.image("gooGunIconIMG", "Assets/Images/Test/canyonDefenseGooCannonIcon.png");
        game.load.image("gutlingLaserIconIMG", "Assets/Images/Test/canyonDefenseGutlingLaserIcon.png");
        game.load.image("howitzerIconIMG", "Assets/Images/Test/canyonDefenseHowitzerIcon.png");        
        game.load.image("missileTurretIconIMG", "Assets/Images/Test/canyonDefenseMissileTurretIcon.png");
        game.load.image("aaGunIconIMG", "Assets/Images/Test/canyonDefenseAAGunIcon.png");
        game.load.image("gaussCannonIconIMG", "Assets/Images/Test/canyonDefenseGaussCannonIcon.png");
        game.load.image("nulificatorIconIMG", "Assets/Images/Test/canyonDefenseNulificatorIcon.png");
        game.load.image("oilSprayIconIMG", "Assets/Images/Test/canyonDefenseOilSprayIcon.png");
        
        
        

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
        
        //icon assets
        game.load.image("bloonChipperIconIMG", "Assets/Images/Test/btd5BloonChipperIcon.png");
        game.load.image("bombTowerIconIMG", "Assets/Images/Test/btd5BombTowerIcon.png");
        game.load.image("boomerangThrowerIconIMG", "Assets/Images/Test/btd5BoomerangThrowerIcon.png");
        game.load.image("dartlingGunIconIMG", "Assets/Images/Test/btd5DartlingGunIcon.png");
        game.load.image("dartMonkeyIconIMG", "Assets/Images/Test/btd5DartMonkeyIcon.png");
        game.load.image("glueGunnerIconIMG", "Assets/Images/Test/btd5GlueGunnerIcon.png");
        game.load.image("iceTowerIconIMG", "Assets/Images/Test/btd5IceTowerIcon.png");
        game.load.image("monkeyAceIMG", "Assets/Images/Test/btd5MonkeyAceIcon.png");
        game.load.image("monkeyApprenticeIconIMG", "Assets/Images/Test/btd5MonkeyApprenticeIcon.png");
        game.load.image("monkeyBuccaneerIconIMG", "Assets/Images/Test/btd5MonkeyBuccaneerIcon.png");
        game.load.image("monkeyEngineerIconIMG", "Assets/Images/Test/btd5MonkeyEngineerIcon.png");
        game.load.image("monkeySubIconIMG", "Assets/Images/Test/btd5MonkeySubIcon.png");
        game.load.image("mortarTowerIconIMG", "Assets/Images/Test/btd5MortarTowerIcon.png");
        game.load.image("ninjaMonkeyIconIMG", "Assets/Images/Test/btd5NinjaMonkeyIcon.png");
        game.load.image("sniperMonkeyIconIMG", "Assets/Images/Test/btd5SniperMonkeyIcon.png");
        game.load.image("spikeFactoryIconIMG", "Assets/Images/Test/btd5SpikeFactoryIcon.png");
        game.load.image("superMonkeyIconIMG", "Assets/Images/Test/btd5SuperMonkeyIcon.png");
        game.load.image("tackShooterIconIMG", "Assets/Images/Test/btd5TackShooterIcon.png");
        game.load.image("wizardLordIconIMG", "Assets/Images/Test/btd5WizardLordIcon.png");

        
        //some test enemy assets
        game.load.image("mediumGroundEnemyIMG", "Assets/Images/Test/canyonDefenseMediumGroundEnemy.png");
        game.load.image("mediumGroundEnemyIMG", "Assets/Images/Test/canyonDefenseMediumGroundEnemy.png");

        
        game.load.image ("rangeExteriorIMG", "Assets/Images/greyCircle_interior.png");     //range circle
        game.load.image ("rangeExterior2IMG", "Assets/Images/greyCircle_interior2.png");   //range circle
        
        game.load.script("webFont", "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js");
      
    },

    create: function () {
        game.state.start('startMenuState');      
    }

};