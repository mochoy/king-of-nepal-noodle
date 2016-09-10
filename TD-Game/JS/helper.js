var helper = {
    pathStuff: {
        pathArray: new Array(),
        pathPointArray: new Array(),
        
        pathCoordsX: [100, 99, 480, 480, 1000],
        pathCoordsY: [0, 297, 297, 600 , 1000],
        
        pathScaleX: [0.03, 0.3, 0.03, 0.003, 0.003],
        pathScaleY: [0.3, 0.03, 0.3, 0.003, 0.003],
        
        getSpawnCoords: function (xOrY){   //1 = x, 2 = y
            if (xOrY == 1){
                return helper.pathStuff.setValues(2, 1, 0);
            } else if (xOrY == 2){
                return helper.pathStuff.setValues(2, 2, 0);
            }
        },
        
        setValues: function (scaleOrCoords, xorY, numToSet){    // scale = 1, coords = 2    x = 1, y = 2  
            if (scaleOrCoords == 1){
                if (xorY == 1){
                    return this.pathScaleX [numToSet];
                }
                if (xorY == 2){      
                    return this.pathScaleY [numToSet];
                }
            } else if (scaleOrCoords == 2) {
                if (xorY == 1){
                    return this.pathCoordsX [numToSet];
                }
                if (xorY == 2){
                    return this.pathCoordsY [numToSet];
                }
            }
        }   //function set values
    },   //pathStuff
    
    showList: function (sprite) {
        towerStuff.buyTower(1, sprite);
    },  //function showlist
    
    createPath: function(name) {
        for (var i = 0; i < 5; i++){
            var path = game.add.sprite (helper.pathStuff.setValues(2, 1, i), helper.pathStuff.setValues(2, 2, i), name);
            path.scale.x = helper.pathStuff.setValues(1, 1, i);
            path.scale.y = helper.pathStuff.setValues(1, 2, i);
//            path.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(path);
            helper.pathStuff.pathArray.push(path);
            
            var pathPoint = game.add.sprite (helper.pathStuff.setValues(2, 1, i), helper.pathStuff.setValues(2, 2, i), "pathPointIMG");
            pathPoint.scale.x = 0.05;
            pathPoint.scale.y = 0.05;
            game.physics.arcade.enable(pathPoint);
            helper.pathStuff.pathPointArray.push(pathPoint);
            
        }   //for 
    },   // function create path
    
    moveToNextPoint: function(enemy, pathPoint){
        for (var i = 0; i < helper.pathStuff.pathArray.length; i++){
            if ((pathPoint.x == helper.pathStuff.setValues(2, 1, i)) && (pathPoint.y == helper.pathStuff.setValues (2, 2, i))){
                var num = i + 1;
                return num;
            }   //if 
        }   //for 
        
        return "hi";

    }   // function move to next object
    
}   // helper

helper.removeFromArray = function (array1, array2, array3, sprite) {
    if (array1) {
        array1.splice(array1[array1.indexOf(sprite)], 1); 
    }
    if (array2) {
        array2.splice(array2[array2.indexOf(sprite)], 1); 
    }
    if (array3) {
        array3.splice(array3[array2.indexOf(sprite)], 1);   
    }
    
//    sprite.scale.x = 10;
    sprite.destroy(true);
    
    return null;
};

helper.findInArr = function (arr, target) {
    return _.findIndex(arr, target); 
}

helper.imgNames = {
    civilianImg: "pathPointIMG"
};

helper.initSprite = function (sprite, scaleX, scaleY) {
    sprite.anchor.set(0.5);
    game.physics.arcade.enable(sprite);
    sprite.scale.x = scaleX;
    sprite.scale.y = scaleY;
};

helper.bringToTop = function () {
    //draw enemies first
    for (var enemy = 0; enemy < enemyStuff.allEnemyArray.length; enemy++) {
        enemyStuff.allEnemyArray[enemy].bringToTop();
    }
    
    for (var tower = 0; tower < towerStuff.allTowerArr.length; tower++) {
        towerStuff.allTowerArr[tower].bringToTop();
    }
    
    //make sure this stuff is at the most top     
    UI.bringPurchaseInterfaceToTop();
    UI.healthText.bringToTop();
    UI.moneyText.bringToTop();
}

helper.setHW = function (target, h, w) {
    target.height = h;
    target.width = w;
    
    return target;
}

helper.setXY = function (target, x, y) {
    target.x = x;
    target.y = y;
    
    return target;
}

helper.checkIfMouseOverlapping = function (target, x, y) {
    //find corners of target
    var width = target.width, height = target.height;
    var x1 = target.x - (width/2), x2 = target.x + (width/2),   //x1 left, x2 right
        y1 = target.y - (height/2), y2 = target.y + (height/2);   //y1 upper, y2 lower
    
    if(x > x1 && x < x2 && y > y1 && y < y2 ){ 
        return true;
    } else {
        return false;
    }

    
}





var dataHelper = {};
dataHelper.initGameData = function () {
    var temp = _.cloneDeep(gameData);
    data = temp.data[temp.currentPeriod];
    data.currentPeriod = temp.currentPeriod;    
    
    return this;
}





//Entity class
var Entity = function (x, y, data, src) {
    //texture sprite depending on what's passed in
    var imgSrc; 
    var srcScale;
    if (data !== null) {
        imgSrc = data.src;
        srcScale = data.srcScale;
    } else if (src) {
        imgSrc = src;
        srcScale = 0.15;
    }
    
    this.sprite = game.add.sprite(x, y, imgSrc);
    helper.initSprite(this.sprite, srcScale, srcScale);
    this.sprite.inputEnabled = true;
    
    if (data) {
        this.sprite.data = _.cloneDeep(data);
    }
    
    this.isPurchaseInterfaceShowing = false;
}

//class that buildings and towers will inherit from
var BuildingsAndTowers = function (x, y, data) {
    this.inheritEntity = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(x, y, data);
    };
    this.inheritEntity(this, Entity);
    
    this.sprite.totalCost = 0;
    if (data.cost) {
        this.sprite.totalCost += data.cost;
    }
}


