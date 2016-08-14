var allCivilianArr = [];

Civilan = function () {
    this.imgName = helper.imgNames.civilianImg;
    this.sprite = null;
    
    this.init = function (game, x, y) {
        this.sprite = game.add.sprite(x, y, this.imgName);
        helper.initSprite(this.sprite, 0.1, 0.1);
        
        this.sprite.isPickedUp = true;
        this.sprite.isTimerStarted = false;
        
        allCivilianArr.push(this.sprite);
        
        this.sprite.dropped = this.dropped;
        
        return this;
    };
    
    this.followEnemy = function (enemySprite) {
        this.sprite.x = enemySprite.x;
        this.sprite.y = enemySprite.y;
        
        return this;
    };
    
    //this = sprite
    this.dropped = function() {
        this.isTimerStarted = true;
        game.time.events.add(Phaser.Timer.SECOND * 5, function () {
            helper.removeFromArray(allCivilianArr, null, null, this);
        }, this);

    }
};
