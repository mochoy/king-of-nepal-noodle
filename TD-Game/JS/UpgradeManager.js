//when instantiated, this is reference to entity object, not sprite object instead of UpgradeManager itself
var UpgradeManager = function (towerSprite, upgradeData) {
    //Entity being upgraded gets a new copy of the JSON object containing all of the data 
    this.data = Object.create(upgradeData);
    
    //when entity clicked, display upgrade information
    this.displayUpgradeInfo = function () {
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
        
        console.log("asdoghai")
        
        //money and upgrades validation before upgrade
        if (data.money < upgradeData.window["currentUpsPath" + path].cost) {
            //too poor, can't buy
        } else if (data.money >= upgradeData.window["currentUpsPath" + path].cost) {
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