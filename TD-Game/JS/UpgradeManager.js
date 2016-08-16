var UpgradeManager = function (upgradeData) {
    //keep track of upgrades on each path
    this.currentUps1 = 0;
    this.currentUps2 = 0;
    this.currentUps3 = 0;
    
    //Entity being upgraded gets a new copy of the JSON object containing all of the data 
    this.data = Object.create(upgradeData);

    this.validateUpgradeEntity = function (path) {        
        //money and upgrades validation before upgrade
        if (data.money < upgradeData.path.cost;) {
            //too poor, can't buy
        } else if (data.money >= upgradeData.path.cost;) {
            this.upgradeEntity();
        }
        
        
    }    //method
    
    this.upgradeEntity = function () {
        window["currentUps" + path]++;
        data.money -= upgradeData.[path].cost;
        UI.updatateUI();
    }


}   //constructor