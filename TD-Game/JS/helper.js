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
    if (array1 != null) {
        array1.splice(array1[array1.indexOf(sprite)], 1); 
    }   //if array1
    
    sprite.destroy();
};

helper.imgNames = {
    civilianImg: "pathPointIMG"
};

helper.initSprite = function (sprite, scaleX, scaleY) {
    sprite.anchor.set(0.5);
    game.physics.arcade.enable(sprite);
    sprite.scale.x = scaleX;
    sprite.scale.y = scaleY;
};

helper.bringToTop = function () {
    //draw enemies first
    for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++) {
        enemyStuff.allEnemyArray[enemy].bringToTop();
    }
    
    for (var tower = 0; tower < towerStuff.allTowerArr.length; tower++) {
        towerStuff.allTowerArr[tower].bringToTop();
    }
    
    //make sure this stuff is at the most top 
    towerStuff.moveToPoint.bringToTop();
    
    UI.bringPurchaseInterfaceToTop();
    UI.healthText.bringToTop();
    UI.moneyText.bringToTop();
}

//UI stuff
UI = {
    fontFamily: "Montserrat",
    purchaseInterfaceArr: [],
    
    //create UI that's mainly visible all in game
    createUI: function () {
        UI.healthText = game.add.text(0, 0, "HEALTH: " + data.health, { fontFamily: UI.fontFamily, fontSize: 20, fontWeight: 'bold', fill: '#000000'    });
        UI.moneyText = game.add.text(200, 0, "MONEY: " + data.money, { fontFamily: UI.fontFamily, fontSize: 20, fontWeight: 'bold', fill: '#000000' });
    },
        
    updateUI: function(){
        UI.healthText.text = "HEALTH: " + data.health;
        UI.moneyText.text = "MONEY: " + data.money;
    }, 
    
    
    //create buttons/interface when user buying or upgrading entity if not already created
    createPurchaseInterface: function (parent) {
        //create buttons and add them to array
        //6 buttons are created, just in case
        for (var button = 0; button < 6; button++) {                   
            UI.purchaseInterfaceArr.push(
                game.add.button(100, 100, "buttonStartSS", function () {
                    parent.validateUpgradeEntity(button + 1)
                }, parent, 2, 1, 0) );
        }
    },
        
    //show buttons/interface when user buying or upgrading entity. 
    showPurchaseInterface: function (parent, data) { 
        //if there are no button(first time creating buttons) then create some blank ones
        if (UI.purchaseInterfaceArr.length === 0) {
            UI.createPurchaseInterface(parent);
        }
            
        //hide all buttons in case there are some extra buttons from last time
        UI.removePurchaseInterface();
        
        var amtOfVisBtns = 0;       //keep track of how many buttons drawn
        amtOfVisBtns = UI.changeInterfaceTextures(amtOfVisBtns, data);
        
        //make all buttons with different loaded textures visible
        for (var button = 0; button < amtOfVisBtns; button++) {
            UI.purchaseInterfaceArr[button].visible = true;
        }
        
        //fix coordinates of all buttons that are visible so they do not overlap
        //change position of buttons according to how many are shown
        for (var button = 0; button < amtOfVisBtns; button++) {
            if (UI.purchaseInterfaceArr[button].visible) {      //make sure button is visible
                UI.purchaseInterfaceArr[button].y = 100;
                UI.purchaseInterfaceArr[button].x = (game.world.width/(amtOfVisBtns + 1)) * (button + 1);
            }
        }
        
    }, 
    
    //change textures of buttons according to how far upgraded entity is
    changeInterfaceTextures: function (amtOfVisBtns, data) {
        for (var button = 0; button < UI.purchaseInterfaceArr.length; button++) {
            //set texture of button to the one specified in data file
            if ( amtOfVisBtns >= 1 ) {     //make sure not to overwrite the first texture set
                if (data["path" + button]){                         
                    amtOfVisBtns++;
                    UI.purchaseInterfaceArr[button].loadTexture(data["path" + button][data["currentPathUps" + button]].btnSrc);
                }
            }
               
            //make 1 sell button
            if (amtOfVisBtns === 0) {
                amtOfVisBtns++;
                UI.purchaseInterfaceArr[button].loadTexture("testBtn2SS");
            }
        }
        
        return amtOfVisBtns;
    },
    
    removePurchaseInterface: function () {
        //hide all buttons
        for (var button = 0; button < UI.purchaseInterfaceArr.length; button++) {
            UI.purchaseInterfaceArr[button].visible = false;
        }
    },
    
    //bring purchase buttons to top so it's not covered by towers or anything
    bringPurchaseInterfaceToTop: function () {
        for (var button = 0; button < UI.purchaseInterfaceArr.length; button++) {
            if (UI.purchaseInterfaceArr[button].visible) {
                UI.purchaseInterfaceArr[button].bringToTop();
            }
        }   
    }
    
    
};




//Entity class
var Entity = function (x, y, data) {
    this.sprite = game.add.sprite(x, y, data.src);
    helper.initSprite(this.sprite, data.srcScale, data.srcScale);
    this.sprite.inputEnabled = true;
    this.sprite.data = _.cloneDeep(data);
}

