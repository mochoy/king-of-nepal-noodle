var allCivilianArr = [];

Civilan = function () {
    this.imgName = helper.imgNames.civilianImg;
    this.sprite = null;
    
    this.init = function (game, x, y) {
        this.sprite = game.add.sprite(x, y, this.imgName);
        helper.initSprite(this.sprite, 0.1, 0.1);
        
        this.sprite.isPickedUp = true;
        
        allCivilianArr.push(this.sprite);
        
        return this;
    };
    
    this.followEnemy = function (enemySprite) {
        this.sprite.x = enemySprite.x;
        this.sprite.y = enemySprite.y;
    };
};