'use strict';

function GraphicsContext(gc) {
    this.gc = gc;

    var self = this;

    Object.keys(Object.getPrototypeOf(gc)).forEach(function(key) {
        if (key in GraphicsContext.prototype || /^webkit/.test(key)) {
            return;
        }
        if (typeof gc[key] === 'function') {
            self[key] = !logger ? gc[key].bind(gc) : function() {
                return logger(key, arguments, gc[key].apply(gc, arguments));
            };
        } else {
            Object.defineProperty(self, key, {
                get: function() {
                    var result = gc[key];
                    return logger ? logger(key, 'getter', result) : result;
                },
                set: function(x) {
                    gc[key] = logger ? logger(key, 'setter', x) : x;
                }
            });
        }
    });
}

function logger(name, args, result) {
    var operator, yields;

    switch (args) {
        case 'getter':
            operator = '=';
            yields = result;
            break;

        case 'setter':
            operator = '\u27F9'; // LONG RIGHTWARDS DOUBLE ARROW
            yields = result;
            break;

        default: // method call
            name += '(' + Array.prototype.slice.call(args).join(', ') + ')';
            if (result === undefined) {
                operator = '';
                yields = '';
            } else {
                operator = ' -> ';
                yields = typeof result === 'string' ? '"' + result + '"' : result;
            }
    }

    console.log('GC.' + name, operator, yields);

    return result;
}


//GraphicsContext.prototype = {};
//GraphicsContext.prototype.constructor = GraphicsContext;

GraphicsContext.prototype = {

    constructor: GraphicsContext.prototype.constructor

};

module.exports = GraphicsContext;