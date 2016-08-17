var UpgradeManager = function (upgradeData) {
    //Entity being upgraded gets a new copy of the JSON object containing all of the data 
    this.data = Object.create(upgradeData);

    //make sure entitiy can be upgraded 
    //path will be a number correspoding to the value of currentPathUps      
    this.validateUpgradeEntity = function (path) {      
        //money and upgrades validation before upgrade
        if (data.money < upgradeData.path.cost) {
            //too poor, can't buy
        } else if (data.money >= upgradeData.path.cost) {
            this.upgradeEntity(path);
        }
        
        
    }    //method
    
    this.upgradeEntity = function (path) {
        upgradeData.window["currentUpsPath" + path]++;      //reference to variable keeping track of upgrades on each path
        //window["currentUps" + path]++;
        data.money -= upgradeData[path].cost;
        UI.updatateUI();
        
    }   //method


}   //constructor