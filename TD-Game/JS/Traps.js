var TrapPrototype = function (game, x, y, data){
    this.inheritEntity = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(x, y, data, src);
    };
    this.inheritBuildingsAndTowers(this, Entity);
}