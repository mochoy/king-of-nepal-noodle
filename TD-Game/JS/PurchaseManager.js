//this class is inherited by the entity, so this will be reference to the entity class
var PurchaseManager = function (purchaseData) {  
    
    //when entity clicked, display upgrade information
    this.displayPurchaseInfo = function () {        
        //draw upgrade menu
        var toDisplaySellBtn = true;
        
        //check id to see if slot
        if (purchaseData.id) {      // .indexOf("Slot") !== -1 
            toDisplaySellBtn = false;
        } else if (!this.sprite.data.canSell) {
            toDisplaySellBtn = false;
        }
        
        UI.showPurchaseInterface(this, purchaseData, toDisplaySellBtn); 
        this.isPurchaseInterfaceShowing = true;
        
        return this;
    }
            
    this.validatePurchaseEntity = function (path) {   
        //hide interface first just in case the interface needs to be shown again
        UI.removePurchaseInterface();
        this.isPurchaseInterfaceShowing = false;    
                
        //if the sell button was pressed
        if (path === 0) {
            this.sellEntity();
        } else if (purchaseData["path" + path]) {        //stuff if upgrading            
            this.validateUpgrade(path).hideAllRanges().hideRange();
        } else if (purchaseData.towersOrBuildings) {      //stuff if buying
            this.validateBuy(path);
        }
         
        return this;
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
        
        return this;
    }
    
    this.validateBuy = function (path) {
        var currentBuyingObj = purchaseData.towersOrBuildings[path - 1];
              
        if (currentBuyingObj.cost > data.money){    //check if can afford
            console.log("cant buy, too poor")
        } else {
            this.buyEntity(currentBuyingObj);
        }
        
        return this;
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
        
        return this;
    }   //method
    
    this.drawNewEntity = function (path, currentUpsPathObj) {           
        this.sprite.loadTexture(currentUpsPathObj.src);
        helper.initSprite(this.sprite, currentUpsPathObj.srcScale, currentUpsPathObj.srcScale);
        
        return this;
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
        
        return this;
    }       //method   
    
    //create new entity, subtract money
    this.buyEntity = function (currentBuyingObj) {
        this.sprite.inputEnabled = false;
        
        //attatch slot info to the created tower
        var created = towerStuff.towerFactory(currentBuyingObj.indexInTowArr, this.sprite.x, this.sprite.y);   
        created.hasSlot = true;
        created.slot = this.sprite;
        
        data.money -= currentBuyingObj.cost;
        UI.updateUI();
        
        return this;
    }
    
    this.sellEntity = function () {
        data.money += this.sprite.totalCost;
        UI.updateUI();
        
        this.slot.inputEnabled = true;
        this.sprite.kill();
        
        //make sure to remove from correct arr
//        var arrToRemoveFrom = (this instanceof AutoTower) ? towerStuff.autoTowerArr: towerStuff.manualTower;
//        helper.removeFromArray(towerStuff.allTowerArr, arrToRemoveFrom, null, this.sprite);
        
        
        return this;
    }

    
}   //constructor