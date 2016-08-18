//when instantiated, this is reference to entity object, not sprite object instead of UpgradeManager itself
var UpgradeManager = function (towerSprite, upgradeData) {
    //Entity being upgraded gets a new copy of the JSON object containing all of the data 
    this.data = Object.create(upgradeData);
    
    //when entity clicked, display upgrade information
    this.displayUpgradeInfo = function (path) {
        //temporary code before disigning actual stuff     
        
        console.log("DISplay upgrade info"+this);
        console.log(this);
        
        this.sprite.upgradeManager.validateUpgradeEntity(path, this.sprite.upgradeManager);
    }

    //make sure entitiy can be upgraded 
    //path will be a number correspoding to the value of currentPathUps      
    this.validateUpgradeEntity = function (path, spriteUpgradeManager) {      
        
        console.log("asdoghai")
        
        //money and upgrades validation before upgrade
        if (data.money < upgradeData.window["currentUpsPath" + path].cost) {
            //too poor, can't buy
        } else if (data.money >= upgradeData.window["currentUpsPath" + path].cost) {
            this.upgradeEntity(path, spriteUpgradeManager);
        }
        
        
    }    //method
    
    this.upgradeEntity = function (path, spriteUpgradeManager) {
        upgradeData.window["currentUpsPath" + path]++;      //reference to variable keeping track of upgrades on each path
        //window["currentUps" + path]++;
        data.money -= upgradeData[path].cost;
        UI.updatateUI();
        
    }   //method


}   //constructor