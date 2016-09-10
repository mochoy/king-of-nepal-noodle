//UI stuff
UI = {
    fontFamily: "Montserrat",
    
    //create UI that's mainly visible all in game
    createUI: function () {
        UI.healthText = game.add.text(0, 0, "HEALTH: " + data.health, { fontFamily: UI.fontFamily, fontSize: 20, fontWeight: 'bold', fill: '#000000'    });
        UI.moneyText = game.add.text(200, 0, "MONEY: " + data.money, { fontFamily: UI.fontFamily, fontSize: 20, fontWeight: 'bold', fill: '#000000' });
        
        return this;
    },
        
    updateUI: function(){
        UI.healthText.text = "HEALTH: " + data.health;
        UI.moneyText.text = "MONEY: " + data.money;
    }, 
    
    createUnPauseInputListener: function (){
        game.input.onDown.add(function () {            
            if (game.paused) {
                UI.unPause();
            }   
        }, this);
        
        return this;
    },
    
    createPauseBtn: function () {
        var sprite = game.add.sprite(450, 0, "pauseBtnIMG");
        helper.setHW(sprite, 25, 25);
        
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(function () {            
            UI.pause();
        });
        
        return this;  
    },
    
    pause: function () {        
        game.paused = true;
        canClickOnGame = false;
        
        return this;
    },
    
    unPause: function() {        
        game.paused = false;
        canClickOnGame = true;
        
        return this;
    },

    
    //
    //
    //purchase interface stuff
    //
    
    purchaseInterfaceArr: [],      //this array will be saved even after the methods that use it terminate

    
    //show buttons/interface when user buying or upgrading entity. 
    //this method called when by PurchaseManager
    showPurchaseInterface: function (parent, data, canShowSellBtn) { 
        //hide and kill all buttons in case there are some extra buttons from last time
        UI.destroyPurchaseInterface().initPurchaseInterface(parent).removePurchaseInterface();
        
        var amtOfVisBtns = 0;       //keep track of how many buttons drawn
        var btnsToShowArr = [];     //keep track of WHICH buttons drawn
        amtOfVisBtns = UI.initInterfaceTextures(amtOfVisBtns, data, canShowSellBtn, btnsToShowArr);
        
        
        UI.showLoadedTextureBtns(amtOfVisBtns, btnsToShowArr).fixCoordsVisBtns(amtOfVisBtns, btnsToShowArr);
        
    }, 
    
    //init buttons/interface when user buying or upgrading entity if not already created
    //this method required b/c the value passed into callback function must be different for each button
    initPurchaseInterface: function (parent) {
        //create buttons and add them to array
        //6 buttons are created, just in case
        for (var i = 0; i < 5; i++) {
            //first button will be sell button
            if (i === 0) {
                //create sell button
                UI.purchaseInterfaceArr.push(game.add.button(0, 0, "buttonStartSS", function () {     
                    UI.purchaseInterfaceArr[0].visible = false;   //make this button invisible
                    //show/create sell confim button
                    var btn = game.add.button (UI.purchaseInterfaceArr[0].x, UI.purchaseInterfaceArr[0].y, "testBtn3SS",
                                               function () {
                        parent.validatePurchaseEntity(0);    //legit sell              
                    }, parent, 2, 1, 0);
                    UI.purchaseInterfaceArr.push(btn);
                }, parent, 2, 1, 0) );
            } else {
                UI.createPurchaseInterface(parent, i);
            }
        }
        
        return this;
    },
    
    //create buttons/interface when user buying or upgrading entity if not already created
    //this method required b/c the value passed into callback function must be different for each button
    createPurchaseInterface: function (parent, val) {
        UI.purchaseInterfaceArr.push(game.add.button(0, 0, "buttonStartSS", function () {
            parent.validatePurchaseEntity(val)   
        }, parent, 2, 1, 0));
    },
     
    //change textures of buttons according to how far upgraded entity is
    initInterfaceTextures: function (amtOfVisBtns, data, canShowSellBtn, btnsToShowArr) {        
        for (var btn = 0; btn < UI.purchaseInterfaceArr.length; btn++) {            
            amtOfVisBtns = UI.textureSellBtn(btn, canShowSellBtn, amtOfVisBtns, btnsToShowArr);
              
            //set texture of button to the one specified in data file
            //make sure this is compatible with buying and upgrading. Buying keys/object names diff than upgrades
            //use and modify these vars for use in texturing btns depending on whether showing upgrades or buy
            //reset vars so values doesn't stay
            var arr = null, objInArr = null, unpressableBtnSrc = null, toDrawUnpressableBtns = null;      
            if (data["path" + btn]){     //check to see if it's upgrades by seeing if the upgrade arr is there
                arr = data["path" + btn];
                objInArr = data["path" + btn][data["currentPathUps" + btn]];
                unpressableBtnSrc = "testBtn4SS";
                toDrawUnpressableBtns = true;
            } else if (data.towersOrBuildings) {     //check if it's buying by seeing if an arr "towersOrBuidlings" exists
                if ((data.towersOrBuildings[btn - 1]) && btn > 0) {  //make sure not retexturing sell btn                    
                    arr = data.towersOrBuildings;
                    objInArr = data.towersOrBuildings[btn - 1];
                    toDrawUnpressableBtns = false;
                }
            }
                
            amtOfVisBtns = UI.changeInterfaceTextures(arr, amtOfVisBtns, objInArr, btn, toDrawUnpressableBtns, unpressableBtnSrc, btnsToShowArr);
            
        }   //for
        
        return amtOfVisBtns;
    },  //method
    
    textureSellBtn: function (btn, canShowSellBtn, amtOfVisBtns, btnsToShowArr) {
        //make 1 sell button
        if ( (btn === 0) && canShowSellBtn ) {                
            UI.purchaseInterfaceArr[amtOfVisBtns].loadTexture("testBtn2SS");
            amtOfVisBtns++;
            btnsToShowArr.push(UI.purchaseInterfaceArr[btn]);
        }
        
        return amtOfVisBtns;
    },
    
    changeInterfaceTextures: function (arr, amtOfVisBtns, objInArr, btn, toDrawUnpressableBtns, unpressableBtnSrc, btnsToShowArr) {   
        if (arr) {
            amtOfVisBtns++;
            //check if there are any more upgrades left. 
            if (objInArr) {
                UI.purchaseInterfaceArr[btn].loadTexture(objInArr.btnSrc);
            } else if (toDrawUnpressableBtns) {    //if not, upgrade path is complete and display the "can't buy anymore" button
                //test/placeholder button for now
                UI.purchaseInterfaceArr[btn].loadTexture(unpressableBtnSrc);
                UI.purchaseInterfaceArr[btn].inputEnabled = false;   //make it so it can't be clicked anymore
            }
            //push textured button into array containing buttons that will be viewable
            btnsToShowArr.push(UI.purchaseInterfaceArr[btn]);
        }   //if
        
        return amtOfVisBtns;
    },  //method
    
    //make all buttons with different loaded textures visible
    showLoadedTextureBtns: function (amtOfVisBtns, btnsToShowArr) {
        for (var button = 0; button < btnsToShowArr.length; button++) {
            btnsToShowArr[button].visible = true;
        }   
        
        return this;
    },
    
    //fix coordinates of all buttons that are visible so they do not overlap
    //change position of buttons according to how many are shown
    fixCoordsVisBtns: function (amtOfVisBtns, btnsToShowArr) {        
//        var button = 0, loopVal = amtOfVisBtns;
//        
//        //don't count sell button into dividing screen if it can't be shown
//        if (!canShowSellBtn && button === 0) {
//            button++;   //so the sell button is skipped when trying to display it
//            amtOfVisBtns--;     //becasue the amount of visible buttons is decreased by one since there'xs no sell button
//            loopVal--;
//        }
        
        for (var button = 0; button < amtOfVisBtns; button++) {
            //reposition visible buttons
            if (btnsToShowArr[button].visible) {      //make sure button is visible                
                btnsToShowArr[button].y = 100;
                btnsToShowArr[button].x = (game.world.width/(amtOfVisBtns + 1)) * (button + 1);
            }
            
        }
        
        return this;
    },
    
    removePurchaseInterface: function () {
        for (var i = 0; i < UI.purchaseInterfaceArr.length; i++) {
            UI.purchaseInterfaceArr[i].visible = false;
        }
        
        return this;
    },
      
    
    //the buttons will be re-created so the callback functions will "update"
    destroyPurchaseInterface: function () {
        for (var button = 0; button < UI.purchaseInterfaceArr.length; button++) {
            UI.purchaseInterfaceArr[button].destroy();
        }
        
        UI.purchaseInterfaceArr = [];
        
        return this;
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