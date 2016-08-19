//when instantiated, this is reference to entity object, not sprite object instead of UpgradeManager itself
var UpgradeManager = function (towerSprite, upgradeData) {
    //Entity being upgraded gets a new copy of the JSON object containing all of the data 
    this.data = Object.create(upgradeData);
    
    //when entity clicked, display upgrade information
    this.displayUpgradeInfo = function () {
        //draw upgrade menu
        //temporary code before disigning actual stuff     
        this.path1BTN = game.add.button(100, 100, "buttonStartSS", function () {
              this.validateUpgradeEntity(1);
        }, this, 2, 1, 0  );        
        
        this.path2BTN = game.add.button(100, 300, "buttonStartSS", function () {
              this.validateUpgradeEntity(2);
        }, this, 2, 1, 0  );        
        
        this.path3BTN = game.add.button(100, 500, "buttonStartSS", function () {
              this.validateUpgradeEntity(3);
        }, this, 2, 1, 0  );

            
    }
        
    //make sure entitiy can be upgraded 
    //path will be a number correspoding to the value of currentPathUps      
    this.validateUpgradeEntity = function (path) {    
        //kill buttons/upgrade menu
        this.path1BTN.kill();
        this.path2BTN.kill();
        this.path3BTN.kill();
        
        console.log(data.money)
        console.log(this.data["path" + path])
        
        //money and upgrades validation before upgrade
        if (data.money < this.data["path" + path].cost) {
            //too poor, can't buy
            console.log("too poor")
        } else if (data.money >= this.data["path" + path].cost) {
            this.upgradeEntity(path);
        }
        
        
    }    //method
    
    this.upgradeEntity = function (path) {
        console.log("buying")
        
        upgradeData.window["currentUpsPath" + path]++;      //reference to variable keeping track of upgrades on each path
        //window["currentUps" + path]++;
        data.money -= upgradeData[path].cost;
        UI.updatateUI();
        
    }   //method


}   //constructor