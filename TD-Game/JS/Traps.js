var trapStuff = {
    allTrapArr: []
};

var TrapPrototype = function (x, y, data){        
    this.inheritEntity = function (thiz, constructer) {
        thiz.constructer = constructer;
        thiz.constructer(x, y, data, data.src);
    };
    this.inheritEntity(this, Entity);
    
    this.addToArr = function (index) {              
        if (!index) {
            trapStuff.allTrapArr.push(this.sprite);
        }
        
        return this;
    }
    
    return this;
    
}   // constructor




trapStuff.trapFactory = function (trapNum, x, y) {
    return new window[trapData.data[trapNum].class](x, y, trapData.data[trapNum]).addToArr(null); 
}