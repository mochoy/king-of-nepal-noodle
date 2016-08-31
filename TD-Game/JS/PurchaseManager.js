//this class is inherited by the entity, so this will be reference to the entity class
var PurchaseManager = function (purchaseData) {  
    
    //when entity clicked, display upgrade information
    this.displayPurchaseInfo = function () {        
        //draw upgrade menu
        var toDisplaySellBtn = true;
        //check id to see if slot
        if (purchaseData.id) {      // .indexOf("Slot") !== -1 
            toDisplaySellBtn = false;
        }
        UI.showPurchaseInterface(this, purchaseData, toDisplaySellBtn); 
        this.isPurchaseInterfaceShowing = true;
    }
            
    this.validatePurchaseEntity = function (path) {   
        //hide interface first just in case the interface needs to be shown again
        UI.removePurchaseInterface();
        this.isPurchaseInterfaceShowing = false;    
                
        //if the sell button was pressed
        if (path === 0) {
            this.sellEntity();
        } else if (purchaseData["path" + path]) {        //stuff if upgrading            
            this.validateUpgrade(path);
        } else if (purchaseData.towersOrBuildings) {      //stuff if buying
            this.validateBuy(path);
        }
         
    }    //method
    
    //make sure entitiy can be upgraded 
    //path will be a number correspoding to the value of currentPathUps  
    this.validateUpgrade = function (path) {        
        //object with reference to object containing current path upgrade
        //only do this if the entity is being upgraded
        var currentUpsPathObj = purchaseData["path" + path][purchaseData["currentPathUps" + path]];
             
        //money and upgrades validation before upgrade
        if (purchaseData["currentPathUps" + path] >= purchaseData["path" + path].length) {
            //at max upgrades for path
            console.log("max upgrades for path")
        } else if (data.money < currentUpsPathObj.cost) {
            //too poor, can't buy
            console.log("too poor")
        } else if (data.money >= currentUpsPathObj.cost) {
            this.upgradeEntity(path, currentUpsPathObj);
        }   
    }
    
    this.validateBuy = function (path) {
        var currentBuyingObj = purchaseData.towersOrBuildings[path - 1];
              
        if (currentBuyingObj.cost > data.money){    //check if can afford
            console.log("cant buy, too poor")
        } else {
            this.buyEntity(currentBuyingObj);
        }
    }
    
    //what to do when entity is actually being upgraded: subtract money, new entity texture
    this.upgradeEntity = function (path, currentUpsPathObj) {        
        data.money -= currentUpsPathObj.cost;
        UI.updateUI();
        
        this.drawNewEntity(path, currentUpsPathObj);   
        this.updateEntityStats(path, currentUpsPathObj);
        
        //keeping track of upgrades on each path
        purchaseData["currentPathUps" + path] ++;
        
        //add to total cost of tower the cost of the upgrade
        this.sprite.totalCost += currentUpsPathObj.cost;
        
        
    }   //method
    
    this.drawNewEntity = function (path, currentUpsPathObj) {           
        this.sprite.loadTexture(currentUpsPathObj.src);
        helper.initSprite(this.sprite, currentUpsPathObj.srcScale, currentUpsPathObj.srcScale);
    }
    
    //change stats from data onto the entity
    this.updateEntityStats = function (path, currentUpsPathObj) {
        for (key in currentUpsPathObj.upgradeStats) {         
            this.sprite.data[key] += currentUpsPathObj.upgradeStats[key];
            
            //change timer values if the fireRate is to be changed
            if (key === "fireRate") {
                this.sprite.fireLoopTimer.delay = this.sprite.data.fireRate;
            } else if (key === "rangeVal") {     //re create range if rangeVal changed  
                this.createRange();
            }
        }   //for
    }       //method   
    
    //create new entity, subtract money
    this.buyEntity = function (currentBuyingObj) {
        //make sure tower sprite can no longer be clicked on unless its sold
        this.sprite.inputEnabled = false;
        towerStuff.towerFactory(currentBuyingObj.indexInTowArr, this.sprite.x, this.sprite.y);      
    }
    
    this.sellEntity = function () {
        console.log("selling entity")
    }

}   //constructor