var allCivilianArr = [];

Civilan = function () {
    this.imgName = helper.imgNames.civilianImg;
    this.sprite = null;
    
    this.init = function (game, x, y) {
        this.sprite = game.add.sprite(x, y, this.imgName);
        helper.initSprite(this.sprite, 0.1, 0.1);
        
        allCivilianArr.push(this.sprite);
        
        return this;
    };
    
    this.followEnemy = function (enemySprite) {
        console.log("following enemy");
        this.sprite.x = enemySprite.x;
        this.sprite.y = enemySprite.y;
    };
};