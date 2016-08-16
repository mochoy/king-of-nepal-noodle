var UpgradeManager = function (upgradeData) {
    //keep track of upgrades on each path
    this.currentUps1 = 1;
    this.currentUps2 = 1;
    this.currentUps3 = 1;
    
    //whatever's being upgraded gets a new copy of the JSON object containing all of the data 
    this.data = Object.create(upgradeData);

    
}