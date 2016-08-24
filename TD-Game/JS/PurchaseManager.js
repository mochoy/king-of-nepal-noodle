//this class is inherited by the entity, so this will be reference to the entity class
var PurchaseManager = function (purchaseData) {    
    //when entity clicked, display upgrade information
    this.displayUpgradeInfo = function () {
        //draw upgrade menu
        //temporary code before disigning actual stuff   
        //will find a better way to do this
        UI.createPurchaseInterface(this, "buttonStartSS", "buttonStartSS", "buttonStartSS", "buttonStartSS");    
    }
        
    //make sure entitiy can be upgraded 
    //path will be a number correspoding to the value of currentPathUps      
    this.validateUpgradeEntity = function (path) {        
        //object with reference to object containing current path upgrade
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
        
        UI.removePurchaseInterface();
        
    }    //method
    
    //what to do when entity is actually being upgraded: subtract money, new entity texture
    this.upgradeEntity = function (path, currentUpsPathObj) {        
        data.money -= currentUpsPathObj.cost;
        UI.updateUI();
        
        this.drawNewEntity(path, currentUpsPathObj);   
        this.updateEntityStats(path, currentUpsPathObj);
        
        purchaseData["currentPathUps" + path] ++;      //keeping track of upgrades on each path
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
    
    //create menu/stuff to display when buying stuff
    this.displayBuyData = function () {
        //temp code for now
        //check for validation after user interacts   
        
    }
    
    //create new entity, subtract money
    this.buyEntity = function () {
        
    }
    
    this.sellEntity

}   //constructor