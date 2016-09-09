var trapStuff = {
    allTrapArr: []
};

var TrapPrototype = function (game, x, y, data){    
    this.inheritEntity = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(x, y, data, data.src);
    };
    this.inheritEntity(this, Entity);
}




trapStuff.trapFactory = function (trapNum, x, y) {
    return new window[trapData.data[trapNum].class](game, x, y, trapData.data[trapNum]).addToArr(null); 
}