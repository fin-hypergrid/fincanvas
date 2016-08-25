(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* eslint-env node, browser */

/**
 * Creates a new read-only property and attaches it to the provided context.
 * @private
 * @param {string} name - Name for new property.
 * @param {*} [value] - Value of new property.
 */
function addReadOnlyProperty(name, value) {
    Object.defineProperty(this, name, {
        value: value,
        writable: false,
        enumerable: true,
        configurable: false
    });
}

/**
 * @constructor Point
 *
 * @desc This object represents a single point in an abstract 2-dimensional matrix.
 *
 * The unit of measure is typically pixels.
 * (If used to model computer graphics, vertical coordinates are typically measured downwards
 * from the top of the window. This convention however is not inherent in this object.)
 *
 * Note: This object should be instantiated with the `new` keyword.
 *
 * @param {number} x - the new point's `x` property
 * @param {number} y - the new point's `y` property
 */
function Point(x, y) {

    /**
     * @name x
     * @type {number}
     * @summary This point's horizontal coordinate.
     * @desc Created upon instantiation by the {@link Point|constructor}.
     * @memberOf Point.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'x', Number(x) || 0);

    /**
     * @name y
     * @type {number}
     * @summary This point's vertical coordinate.
     * @desc Created upon instantiation by the {@link Point|constructor}.
     * @memberOf Point.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'y', Number(y) || 0);

}

Point.prototype = {

    /**
     * @returns {Point} A new point which is this point's position increased by coordinates of given `offset`.
     * @param {Point} offset - Horizontal and vertical values to add to this point's coordinates.
     * @memberOf Point.prototype
     */
    plus: function(offset) {
        return new Point(
            this.x + offset.x,
            this.y + offset.y
        );
    },

    /**
     * @returns {Point} A new point which is this point's position increased by given offsets.
     * @param {number} [offsetX=0] - Value to add to this point's horizontal coordinate.
     * @param {number} [offsetY=0] - Value to add to this point's horizontal coordinate.
     * @memberOf Point.prototype
     */
    plusXY: function(offsetX, offsetY) {
        return new Point(
            this.x + (offsetX || 0),
            this.y + (offsetY || 0)
        );
    },

    /**
     * @returns {Point} A new point which is this point's position decreased by coordinates of given `offset`.
     * @param {Point} offset - Horizontal and vertical values to subtract from this point's coordinates.
     * @memberOf Point.prototype
     */
    minus: function(offset) {
        return new Point(
            this.x - offset.x,
            this.y - offset.y
        );
    },

    /**
     * @returns {Point} A new `Point` positioned to least x and least y of this point and given `offset`.
     * @param {Point} point - A point to compare to this point.
     * @memberOf Point.prototype
     */
    min: function(point) {
        return new Point(
            Math.min(this.x, point.x),
            Math.min(this.y, point.y)
        );
    },

    /**
     * @returns {Point} A new `Point` positioned to greatest x and greatest y of this point and given `point`.
     * @param {Point} point - A point to compare to this point.
     * @memberOf Point.prototype
     */
    max: function(point) {
        return new Point(
            Math.max(this.x, point.x),
            Math.max(this.y, point.y)
        );
    },

    /**
     * @returns {number} Distance between given `point` and this point using Pythagorean Theorem formula.
     * @param {Point} point - A point from which to compute the distance to this point.
     * @memberOf Point.prototype
     */
    distance: function(point) {
        var deltaX = point.x - this.x,
            deltaY = point.y - this.y;

        return Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY
        );
    },

    /**
     * _(Formerly: `equal`.)_
     * @returns {boolean} `true` iff _both_ coordinates of this point are exactly equal to those of given `point`.
     * @param {Point} point - A point to compare to this point.
     * @memberOf Point.prototype
     */
    equals: function(point) {
        var result = false;

        if (point) {
            result =
                this.x === point.x &&
                this.y === point.y;
        }

        return result;
    },

    /**
     * @returns {boolean} `true` iff _both_ coordinates of this point are greater than those of given `point`.
     * @param {Point} point - A point to compare to this point
     * @memberOf Point.prototype
     */
    greaterThan: function(point) {
        return (
            this.x > point.x &&
            this.y > point.y
        );
    },

    /**
     * @returns {boolean} `true` iff _both_ coordinates of this point are less than those of given `point`.
     * @param {Point} point - A point to compare to this point
     * @memberOf Point.prototype
     */
    lessThan: function(point) {
        return (
            this.x < point.x &&
            this.y < point.y
        );
    },

    /**
     * _(Formerly `greaterThanEqualTo`.)_
     * @returns {boolean} `true` iff _both_ coordinates of this point are greater than or equal to those of given `point`.
     * @param {Point} point - A point to compare to this point
     * @memberOf Point.prototype
     */
    greaterThanOrEqualTo: function(point) {
        return (
            this.x >= point.x &&
            this.y >= point.y
        );
    },

    /**
     * _(Formerly `lessThanEqualTo`.)_
     * @returns {boolean} `true` iff _both_ coordinates of this point are less than or equal to those of given `point`.
     * @param {Point} point - A point to compare to this point.
     * @memberOf Point.prototype
     */
    lessThanOrEqualTo: function(point) {
        return (
            this.x <= point.x &&
            this.y <= point.y
        );
    },

    /**
     * _(Formerly `isContainedWithinRectangle`.)_
     * @param rect {Rectangle} - Rectangle to test this point against.
     * @returns {boolean} `true` iff this point is within given `rect`.
     * @memberOf Point.prototype
     */
    within: function(rect) {
        var minX = rect.origin.x,
            maxX = minX + rect.extent.x;
        var minY = rect.origin.y,
            maxY = minY + rect.extent.y;

        if (rect.extent.x < 0) {
            minX = maxX;
            maxX = rect.origin.x;
        }

        if (rect.extent.y < 0) {
            minY = maxY;
            maxY = rect.origin.y;
        }

        return (
            minX <= this.x && this.x < maxX &&
            minY <= this.y && this.y < maxY
        );
    }
};

Point.prototype.EQ = Point.prototype.equals;
Point.prototype.GT = Point.prototype.greaterThan;
Point.prototype.LT = Point.prototype.lessThan;
Point.prototype.GE = Point.prototype.greaterThanOrEqualTo;
Point.prototype.LE = Point.prototype.lessThanOrEqualTo;


/**
 * @constructor Rectangle
 *
 * @desc This object represents a rectangular area within an abstract 2-dimensional matrix.
 *
 * The unit of measure is typically pixels.
 * (If used to model computer graphics, vertical coordinates are typically measured downwards
 * from the top of the window. This convention however is not inherent in this object.)
 *
 * Normally, the `x` and `y` parameters to the constructor describe the upper left corner of the rect.
 * However, negative values of `width` and `height` will be added to the given `x` and `y`. That is,
 * a negative value of the `width` parameter will extend the rect to the left of the given `x` and
 * a negative value of the `height` parameter will extend the rect above the given `y`.
 * In any case, after instantiation the following are guaranteed to always be true:
 * * The `extent`, `width`, and `height` properties _always_ give positive values.
 * * The `origin`, `top`, and `left` properties _always_ reflect the upper left corner.
 * * The `corner`, `bottom`, and `right` properties _always_ reflect the lower right corner.
 *
 * Note: This object should be instantiated with the `new` keyword.
 *
 * @param {number} [x=0] - Horizontal coordinate of some corner of the rect.
 * @param {number} [y=0] - Vertical coordinate of some corner of the rect.
 * @param {number} [width=0] - Width of the new rect. May be negative (see above).
 * @param {number} [height=0] - Height of the new rect. May be negative (see above).
 */
function Rectangle(x, y, width, height) {

    x = Number(x) || 0;
    y = Number(y) || 0;
    width = Number(width) || 0;
    height = Number(height) || 0;

    if (width < 0) {
        x += width;
        width = -width;
    }

    if (height < 0) {
        y += height;
        height = -height;
    }

    /**
     * @name origin
     * @type {Point}
     * @summary Upper left corner of this rect.
     * @desc Created upon instantiation by the {@linkplain Rectangle|constructor}.
     * @memberOf Rectangle.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'origin', new Point(x, y));

    /**
     * @name extent
     * @type {Point}
     * @summary this rect's width and height.
     * @desc Unlike the other `Point` properties, `extent` is not a global coordinate pair; rather it consists of a _width_ (`x`, always positive) and a _height_ (`y`, always positive).
     *
     * This object might be more legitimately typed as something like `Area` with properties `width` and `height`; however we wanted it to be able to use it efficiently with a point's `plus` and `minus` methods (that is, without those methods having to check and branch on the type of its parameter).
     *
     * Created upon instantiation by the {@linkplain Rectangle|constructor}.
     * @see The {@link Rectangle#corner|corner} method.
     * @memberOf Rectangle.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'extent', new Point(width, height));

    /**
     * @name corner
     * @type {Point}
     * @summary Lower right corner of this rect.
     * @desc This is a calculated value created upon instantiation by the {@linkplain Rectangle|constructor}. It is `origin` offset by `extent`.
     *
     * **Note:** These coordinates actually point to the pixel one below and one to the right of the rect's actual lower right pixel.
     * @memberOf Rectangle.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'corner', new Point(x + width, y + height));

    /**
     * @name center
     * @type {Point}
     * @summary Center of this rect.
     * @desc Created upon instantiation by the {@linkplain Rectangle|constructor}.
     * @memberOf Rectangle.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'center', new Point(x + (width / 2), y + (height / 2)));

}

Rectangle.prototype = {

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Minimum vertical coordinate of this rect.
     * @memberOf Rectangle.prototype
     */
    get top() {
        return this.origin.y;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Minimum horizontal coordinate of this rect.
     * @memberOf Rectangle.prototype
     */
    get left() {
        return this.origin.x;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Maximum vertical coordinate of this rect + 1.
     * @memberOf Rectangle.prototype
     */
    get bottom() {
        return this.corner.y;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Maximum horizontal coordinate of this rect + 1.
     * @memberOf Rectangle.prototype
     */
    get right() {
        return this.corner.x;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Width of this rect (always positive).
     * @memberOf Rectangle.prototype
     */
    get width() {
        return this.extent.x;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Height of this rect (always positive).
     * @memberOf Rectangle.prototype
     */
    get height() {
        return this.extent.y;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Area of this rect.
     * @memberOf Rectangle.prototype
     */
    get area() {
        return this.width * this.height;
    },

    /**
     * @returns {Rectangle} A copy of this rect but with horizontal position reset to given `x` and no width.
     * @param {number} x - Horizontal coordinate of the new rect.
     * @memberOf Rectangle.prototype
     */
    flattenXAt: function(x) {
        return new Rectangle(x, this.origin.y, 0, this.extent.y);
    },

    /**
     * @returns {Rectangle} A copy of this rect but with vertical position reset to given `y` and no height.
     * @param {number} y - Vertical coordinate of the new rect.
     * @memberOf Rectangle.prototype
     */
    flattenYAt: function(y) {
        return new Rectangle(this.origin.x, y, this.extent.x, 0);
    },

    /**
     * @returns {boolean} `true` iff given `point` entirely contained within this rect.
     * @param {Point} pointOrRect - The point or rect to test for containment.
     * @memberOf Rectangle.prototype
     */
    contains: function(pointOrRect) {
        return pointOrRect.within(this);
    },

    /**
     * _(Formerly `isContainedWithinRectangle`.)_
     * @returns {boolean} `true` iff `this` rect is entirely contained within given `rect`.
     * @param {Rectangle} rect - Rectangle to test against this rect.
     * @memberOf Rectangle.prototype
     */
    within: function(rect) {
        return (
            rect.origin.lessThanOrEqualTo(this.origin) &&
            rect.corner.greaterThanOrEqualTo(this.corner)
        );
    },

    /**
     * _(Formerly: `insetBy`.)_
     * @returns {Rectangle} That is enlarged/shrunk by given `padding`.
     * @param {number} padding - Amount by which to increase (+) or decrease (-) this rect
     * @see The {@link Rectangle#shrinkBy|shrinkBy} method.
     * @memberOf Rectangle.prototype
     */
    growBy: function(padding) {
        return new Rectangle(
            this.origin.x + padding,
            this.origin.y + padding,
            this.extent.x - padding - padding,
            this.extent.y - padding - padding);
    },

    /**
     * @returns {Rectangle} That is enlarged/shrunk by given `padding`.
     * @param {number} padding - Amount by which to decrease (+) or increase (-) this rect.
     * @see The {@link Rectangle#growBy|growBy} method.
     * @memberOf Rectangle.prototype
     */
    shrinkBy: function(padding) {
        return this.growBy(-padding);
    },

    /**
     * @returns {Rectangle} Bounding rect that contains both this rect and the given `rect`.
     * @param {Rectangle} rect - The rectangle to union with this rect.
     * @memberOf Rectangle.prototype
     */
    union: function(rect) {
        var origin = this.origin.min(rect.origin),
            corner = this.corner.max(rect.corner),
            extent = corner.minus(origin);

        return new Rectangle(
            origin.x, origin.y,
            extent.x, extent.y
        );
    },

    /**
     * iterate over all points within this rect, invoking `iteratee` for each.
     * @param {function(number,number)} iteratee - Function to call for each point.
     * Bound to `context` when given; otherwise it is bound to this rect.
     * Each invocation of `iteratee` is called with two arguments:
     * the horizontal and vertical coordinates of the point.
     * @param {object} [context=this] - Context to bind to `iteratee` (when not `this`).
     * @memberOf Rectangle.prototype
     */
    forEach: function(iteratee, context) {
        context = context || this;
        for (var x = this.origin.x, x2 = this.corner.x; x < x2; x++) {
            for (var y = this.origin.y, y2 = this.corner.y; y < y2; y++) {
                iteratee.call(context, x, y);
            }
        }
    },

    /**
     * @returns {Rectangle} One of:
     * * _If this rect intersects with the given `rect`:_
     *      a new rect representing that intersection.
     * * _If it doesn't intersect and `ifNoneAction` defined:_
     *      result of calling `ifNoneAction`.
     * * _If it doesn't intersect and `ifNoneAction` undefined:_
     *      `null`.
     * @param {Rectangle} rect - The rectangle to intersect with this rect.
     * @param {function(Rectangle)} [ifNoneAction] - When no intersection, invoke and return result.
     * Bound to `context` when given; otherwise bound to this rect.
     * Invoked with `rect` as sole parameter.
     * @param {object} [context=this] - Context to bind to `ifNoneAction` (when not `this`).
     * @memberOf Rectangle.prototype
     */
    intersect: function(rect, ifNoneAction, context) {
        var result = null,
            origin = this.origin.max(rect.origin),
            corner = this.corner.min(rect.corner),
            extent = corner.minus(origin);

        if (extent.x > 0 && extent.y > 0) {
            result = new Rectangle(
                origin.x, origin.y,
                extent.x, extent.y
            );
        } else if (typeof ifNoneAction === 'function') {
            result = ifNoneAction.call(context || this, rect);
        }

        return result;
    },

    /**
     * @returns {boolean} `true` iff this rect overlaps with given `rect`.
     * @param {Rectangle} rect - The rectangle to intersect with this rect.
     * @memberOf Rectangle.prototype
     */
    intersects: function(rect) {
        return (
            rect.corner.x > this.origin.x &&
            rect.corner.y > this.origin.y &&
            rect.origin.x < this.corner.x &&
            rect.origin.y < this.corner.y
        );
    }
};

// Interface
exports.Point = Point;
exports.Rectangle = Rectangle;

},{}],2:[function(require,module,exports){
'use strict';

/* eslint-env node, browser */

if (!window.fin) {
    window.fin = {};
}

if (!window.fin.Canvas) {
    window.fin.Canvas = require('./');
}

},{"./":3}],3:[function(require,module,exports){
/* eslint-env browser */

'use strict';

var rectangular = require('rectangular');

var GraphicsContext = require('./js/GraphicsContext.js');

var RESIZE_POLLING_INTERVAL = 200,
    paintables = [],
    resizables = [],
    paintLoopRunning = true,
    resizeLoopRunning = true,
    charMap = makeCharMap();

function Canvas(div, component, options) {
    var self = this;

    this.div = div;
    this.component = component;

    options = options || {};
    this.doubleClickDelay = options.doubleClickDelay || 325;

    this.dragEndtime = Date.now();

    this.canvas = document.createElement('canvas');
    this.div.appendChild(this.canvas);

    this.canvas.style.outline = 'none';

    // this.focuser = document.createElement('button');
    // this.focuser.style.position = 'absolute';
    // this.focuser.style.top = '0px';
    // this.focuser.style.left = '0px';
    // this.focuser.style.zIndex = '-1';
    // this.focuser.style.outline = 'none';
    // this.div.appendChild(this.focuser);

    this.canvasCTX = this.canvas.getContext('2d');
    this.gc = new GraphicsContext(this.canvasCTX);

    this.buffer = document.createElement('canvas');
    this.bufferCTX = this.buffer.getContext('2d');
    this.bufferGC = new GraphicsContext(this.bufferCTX);

    this.mouseLocation = new rectangular.Point(-1, -1);
    this.dragstart = new rectangular.Point(-1, -1);
    //this.origin = new rectangular.Point(0, 0);
    this.bounds = new rectangular.Rectangle(0, 0, 0, 0);
    this.hasMouse = false;

    document.addEventListener('mousemove', function(e) {
        if (self.hasMouse || self.isDragging()) {
            self.finmousemove(e);
        }
    });
    document.addEventListener('mouseup', function(e) {
        self.finmouseup(e);
    });
    document.addEventListener('wheel', function(e) {
        self.finwheelmoved(e);
    });
    document.addEventListener('keydown', function(e) {
        self.finkeydown(e);
    });
    document.addEventListener('keyup', function(e) {
        self.finkeyup(e);
    });

    this.canvas.onmouseover = function() {
        self.hasMouse = true;
    };
    this.canvas.addEventListener('focus', function(e) {
        self.finfocusgained(e);
    });
    this.canvas.addEventListener('blur', function(e) {
        self.finfocuslost(e);
    });
    this.canvas.addEventListener('mousedown', function(e) {
        self.finmousedown(e);
    });
    this.canvas.addEventListener('mouseout', function(e) {
        self.hasMouse = false;
        self.finmouseout(e);
    });
    this.canvas.addEventListener('click', function(e) {
        self.finclick(e);
    });
    this.canvas.addEventListener('contextmenu', function(e) {
        self.fincontextmenu(e);
        e.preventDefault();
        return false;
    });

    this.canvas.setAttribute('tabindex', 0);
    this.canvas.contentEditable = true;

    this.resize();

    this.beginResizing();
    this.beginPainting();
}

Canvas.prototype = {
    constructor: Canvas.prototype.constructor,
    div: null,
    component: null,
    canvas: null,
    canvasCTX: null,
    focuser: null,
    buffer: null,
    ctx: null,
    mouseLocation: null,
    dragstart: null,
    origin: null,
    bounds: null,
    dirty: false,
    size: null,
    mousedown: false,
    dragging: false,
    repeatKeyCount: 0,
    repeatKey: null,
    repeatKeyStartTime: 0,
    currentKeys: [],
    hasMouse: false,
    lastDoubleClickTime: 0,
    dragEndTime: 0,
    lastRepaintTime: 0,
    currentPaintCount: 0,
    currentFPS: 0,
    lastFPSComputeTime: 0,

    addEventListener: function(name, callback) {
        this.canvas.addEventListener(name, callback);
    },

    stopPaintLoop: function() {
        paintLoopRunning = false;
    },

    restartPaintLoop: function() {
        if (paintLoopRunning) {
            return; // already running
        }
        paintLoopRunning = true;
        requestAnimationFrame(paintLoopFunction);
    },

    stopResizeLoop: function() {
        resizeLoopRunning = false;
    },

    restartResizeLoop: function() {
        if (resizeLoopRunning) {
            return; // already running
        }
        resizeLoopRunning = true;
        setInterval(resizablesLoopFunction, 200);
    },

    detached: function() {
        this.stopPainting();
        this.stopResizing();
    },

    useHiDPI: function() {
        return this.component.resolveProperty('useHiDPI');
    },

    useBitBlit: function() {
        return this.component.resolveProperty('useBitBlit');
    },

    getFPS: function() {
        var fps = this.component.resolveProperty('repaintIntervalRate');
        return fps ? parseInt(fps) : 0;
    },

    getEnableContinuousRepaint: function () {
        return this.component.resolveProperty('enableContinuousRepaint');
    },

    getCurrentFPS:function () {
        return this.currentFPS;
    },


    tickPaint: function(now) {
        var fps = this.getFPS();
        var isContinuousRepaint = this.getEnableContinuousRepaint();
        if (fps === 0) {
            return;
        }
        var interval = 1000 / fps;

        var elapsed = now - this.lastRepaintTime;
        if (elapsed > interval && (isContinuousRepaint || this.dirty)) {
            this.paintNow();
            this.lastRepaintTime = now;
            /* - (elapsed % interval);*/
            if (isContinuousRepaint) {
                this.currentPaintCount++;
                if (now - this.lastFPSComputeTime >= 1000) {
                    this.currentFPS = (this.currentPaintCount * 1000) / (now - this.lastFPSComputeTime);
                    this.currentPaintCount = 0;
                    this.lastFPSComputeTime = now;
                }
            }
        }
    },

    beginPainting: function() {
        var self = this;
        this.dirty = true;
        this.tickPainter = function(now) {
            self.tickPaint(now);
        };
        paintables.push(this);
    },

    stopPainting: function() {
        paintables.splice(paintables.indexOf(this), 1);
    },

    beginResizing: function() {
        var self = this;
        this.tickResizer = function() {
            self.checksize();
        };
        resizables.push(this);
    },

    stopResizing: function() {
        resizables.splice(resizables.indexOf(this), 1);
    },

    start: function() {
        this.beginPainting();
        this.beginResizing();
    },

    stop: function() {
        this.stopPainting();
        this.stopResizing();
    },

    checksize: function() {
        //this is expensive lets do it at some modulo
        var sizeNow = this.div.getBoundingClientRect();
        if (sizeNow.width !== this.size.width || sizeNow.height !== this.size.height) {
            this.sizeChangedNotification();
        }
    },

    sizeChangedNotification: function() {
        this.resize();
    },

    resize: function() {
        var box = this.size = this.div.getBoundingClientRect();

        this.width = box.width;
        this.height = box.height;

        //fix ala sir spinka, see
        //http://www.html5rocks.com/en/tutorials/canvas/hidpi/
        //just add 'hdpi' as an attribute to the fin-canvas tag
        var ratio = 1;
        var useBitBlit = this.useBitBlit();
        var isHIDPI = window.devicePixelRatio && this.useHiDPI();
        if (isHIDPI) {
            var devicePixelRatio = window.devicePixelRatio || 1;
            var backingStoreRatio = this.canvasCTX.webkitBackingStorePixelRatio ||
                this.canvasCTX.mozBackingStorePixelRatio ||
                this.canvasCTX.msBackingStorePixelRatio ||
                this.canvasCTX.oBackingStorePixelRatio ||
                this.canvasCTX.backingStorePixelRatio || 1;

            ratio = devicePixelRatio / backingStoreRatio;
            //this.canvasCTX.scale(ratio, ratio);
        }

        this.buffer.width = this.canvas.width = this.width * ratio;
        this.buffer.height = this.canvas.height = this.height * ratio;

        this.canvas.style.width = this.buffer.style.width = this.width + 'px';
        this.canvas.style.height = this.buffer.style.height = this.height + 'px';

        this.bufferCTX.scale(ratio, ratio);
        if (isHIDPI && !useBitBlit) {
            this.canvasCTX.scale(ratio, ratio);
        }

        //this.origin = new rectangular.Point(Math.round(this.size.left), Math.round(this.size.top));
        this.bounds = new rectangular.Rectangle(0, 0, this.width, this.height);
        //setTimeout(function() {
        var comp = this.component;
        if (comp) {
            comp.setBounds(this.bounds);
        }
        this.resizeNotification();
        this.paintNow();
        //});
    },

    resizeNotification: function() {
        //to be overridden
    },

    getBounds: function() {
        return this.bounds;
    },

    paintNow: function() {
        var self = this;
        this.safePaintImmediately(function(gc) {
            gc.clearRect(0, 0, self.width, self.height);

            var comp = self.component;
            if (comp) {
                comp.paint(gc);
            }

            self.dirty = false;
        });
    },

    safePaintImmediately: function(paintFunction) {
        var useBitBlit = this.useBitBlit(),
            gc = useBitBlit ? this.bufferGC : this.gc;
        try {
            gc.save();
            paintFunction(gc);
        } catch (e) {
            console.error(e);
        } finally {
            gc.restore();
        }
        if (useBitBlit) {
            this.flushBuffer();
        }
    },

    flushBuffer: function() {
        if (this.buffer.width > 0 && this.buffer.height > 0) {
            this.canvasCTX.drawImage(this.buffer, 0, 0);
        }
    },

    dispatchNewEvent: function(event, name, detail) {
        detail = {
            detail: detail || {}
        };
        detail.detail.primitiveEvent = event;
        return this.canvas.dispatchEvent(new CustomEvent(name, detail));
    },

    dispatchNewMouseKeysEvent: function(event, name, detail) {
        detail = detail || {};
        detail.mouse = this.mouseLocation;
        detail.keys = this.currentKeys;
        return this.dispatchNewEvent(event, name, detail);
    },

    finmousemove: function(e) {
        if (!this.isDragging() && this.mousedown) {
            this.beDragging();
            this.dispatchNewMouseKeysEvent(e, 'fin-canvas-dragstart', {
                isRightClick: this.isRightClick(e)
            });
            this.dragstart = new rectangular.Point(this.mouseLocation.x, this.mouseLocation.y);
        }
        this.mouseLocation = this.getLocal(e);
        //console.log(this.mouseLocation);
        if (this.isDragging()) {
            this.dispatchNewMouseKeysEvent(e, 'fin-canvas-drag', {
                dragstart: this.dragstart,
                isRightClick: this.isRightClick(e)
            });
        }
        if (this.bounds.contains(this.mouseLocation)) {
            this.dispatchNewMouseKeysEvent(e, 'fin-canvas-mousemove');
        }
    },

    finmousedown: function(e) {
        this.mouseLocation = this.mouseDownLocation = this.getLocal(e);
        this.mousedown = true;

        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-mousedown', {
            isRightClick: this.isRightClick(e)
        });
        this.takeFocus();
    },

    finmouseup: function(e) {
        if (this.isDragging()) {
            this.dispatchNewMouseKeysEvent(e, 'fin-canvas-dragend', {
                dragstart: this.dragstart,
                isRightClick: this.isRightClick(e)
            });
            this.beNotDragging();
            this.dragEndtime = Date.now();
        }
        this.mousedown = false;
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-mouseup', {
            isRightClick: this.isRightClick(e)
        });
        //this.mouseLocation = new rectangular.Point(-1, -1);
    },

    finmouseout: function(e) {
        if (!this.mousedown) {
            this.mouseLocation = new rectangular.Point(-1, -1);
        }
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-mouseout');
    },

    finwheelmoved: function(e) {
        if (this.isDragging() || !this.hasFocus()) {
            return;
        }
        e.preventDefault();
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-wheelmoved', {
            isRightClick: this.isRightClick(e)
        });
    },

    finclick: function(e) {
        if (this.doubleClickTimer && Date.now() - this.lastClickTime < this.doubleClickDelay) {
            //this is a double click...
            clearTimeout(this.doubleClickTimer); // prevent click event
            this.doubleClickTimer = undefined;
            this.findblclick(e);
        } else {
            this.lastClickTime = Date.now();

            this.doubleClickTimer = setTimeout(function() {
                this.doubleClickTimer = undefined;
                this.mouseLocation = this.getLocal(e);
                this.dispatchNewMouseKeysEvent(e, 'fin-canvas-click', {
                    isRightClick: this.isRightClick(e)
                });
            }.bind(this), this.doubleClickDelay);
        }
    },

    findblclick: function(e) {
        this.mouseLocation = this.getLocal(e);
        this.lastDoubleClickTime = Date.now();
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-dblclick', {
            isRightClick: this.isRightClick(e)
        });
        //console.log('dblclick', this.currentKeys);
    },

    getCharMap: function() { //TODO: This is static. Make it a property of the constructor.
        return charMap;
    },

    finkeydown: function(e) {
        if (!this.hasFocus()) {
            return;
        }

        //e.preventDefault();
        var keyChar = e.shiftKey ? charMap[e.keyCode][1] : charMap[e.keyCode][0];
        if (e.repeat) {
            if (this.repeatKey === keyChar) {
                this.repeatKeyCount++;
            } else {
                this.repeatKey = keyChar;
                this.repeatKeyStartTime = Date.now();
            }
        } else {
            this.repeatKey = null;
            this.repeatKeyCount = 0;
            this.repeatKeyStartTime = 0;
        }
        if (this.currentKeys.indexOf(keyChar) === -1) {
            this.currentKeys.push(keyChar);
        }
        //console.log(keyChar, e.keyCode);
        this.dispatchNewEvent(e, 'fin-canvas-keydown', {
            alt: e.altKey,
            ctrl: e.ctrlKey,
            char: keyChar,
            code: e.charCode,
            key: e.keyCode,
            meta: e.metaKey,
            repeatCount: this.repeatKeyCount,
            repeatStartTime: this.repeatKeyStartTime,
            shift: e.shiftKey,
            identifier: e.key,
            currentKeys: this.currentKeys.slice(0)
        });
    },

    finkeyup: function(e) {
        var keyChar = e.shiftKey ? charMap[e.keyCode][1] : charMap[e.keyCode][0];
        this.currentKeys.splice(this.currentKeys.indexOf(keyChar), 1);
        if (!this.hasFocus()) {
            return;
        }
        this.repeatKeyCount = 0;
        this.repeatKey = null;
        this.repeatKeyStartTime = 0;
        this.dispatchNewEvent(e, 'fin-canvas-keyup', {
            alt: e.altKey,
            ctrl: e.ctrlKey,
            char: keyChar,
            code: e.charCode,
            key: e.keyCode,
            meta: e.metaKey,
            repeat: e.repeat,
            shift: e.shiftKey,
            identifier: e.key,
            currentKeys: this.currentKeys.slice(0)
        });
    },

    finfocusgained: function(e) {
        this.dispatchNewEvent(e, 'fin-canvas-focus-gained');
    },

    finfocuslost: function(e) {
        this.dispatchNewEvent(e, 'fin-canvas-focus-lost');
    },

    fincontextmenu: function(e) {
        if (e.ctrlKey && this.currentKeys.indexOf('CTRL') === -1) {
            this.currentKeys.push('CTRL');
        }
        if (this.doubleRightClickTimer && Date.now() - this.lastClickTime < this.doubleClickDelay) {
            //this is a double click...
            clearTimeout(this.doubleRightClickTimer); // prevent context menu event
            this.doubleRightClickTimer = undefined;
            this.findblclick(e);
        } else {
            this.lastClickTime = Date.now();

            this.doubleRightClickTimer = setTimeout(function() {
                this.doubleRightClickTimer = undefined;
                this.dispatchNewMouseKeysEvent(e, 'fin-canvas-context-menu', {
                    isRightClick: this.isRightClick(e)
                });
            }.bind(this), this.doubleClickDelay);
        }
    },

    repaint: function() {
        var fps = this.getFPS();
        this.dirty = true;
        if (!paintLoopRunning || fps === 0) {
            this.paintNow();
        }
    },

    getMouseLocation: function() {
        return this.mouseLocation;
    },

    getOrigin: function() {
        var rect = this.canvas.getBoundingClientRect();
        var p = new rectangular.Point(rect.left, rect.top);
        return p;
    },

    getLocal: function(e) {
        var rect = this.canvas.getBoundingClientRect();
        var p = new rectangular.Point(e.clientX - rect.left, e.clientY - rect.top);
        return p;
    },

    hasFocus: function() {
        return document.activeElement === this.canvas;
    },

    takeFocus: function() {
        var self = this;
        if (!this.hasFocus()) {
            setTimeout(function() {
                self.canvas.focus();
            }, 10);
        }
    },

    beDragging: function() {
        this.dragging = true;
        this.disableDocumentElementSelection();
    },

    beNotDragging: function() {
        this.dragging = false;
        this.enableDocumentElementSelection();
    },

    isDragging: function() {
        return this.dragging;
    },

    disableDocumentElementSelection: function() {
        var style = document.body.style;
        style.cssText = style.cssText + '-webkit-user-select: none';
    },

    enableDocumentElementSelection: function() {
        var style = document.body.style;
        style.cssText = style.cssText.replace('-webkit-user-select: none', '');
    },

    setFocusable: function(truthy) {
        this.focuser.style.display = truthy ? '' : 'none';
    },

    isRightClick: function(e) {
        var isRightMB;
        e = e || window.event;

        if ('which' in e) { // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
            isRightMB = e.which === 3;
        } else if ('button' in e) { // IE, Opera
            isRightMB = e.button === 2;
        }
        return isRightMB;
    },

    dispatchEvent: function(e) {
        return this.canvas.dispatchEvent(e);
    }
};

function paintLoopFunction(now) {
    if (!paintLoopRunning) {
        return;
    }
    for (var i = 0; i < paintables.length; i++) {
        try {
            paintables[i].tickPainter(now);
        } catch (e) {
            console.error(e);
        }
    }
    requestAnimationFrame(paintLoopFunction);
}
requestAnimationFrame(paintLoopFunction);

function resizablesLoopFunction(now) {
    if (!resizeLoopRunning) {
        return;
    }
    for (var i = 0; i < resizables.length; i++) {
        try {
            resizables[i].tickResizer(now);
        } catch (e) {
            console.error(e);
        }
    }
}
setInterval(resizablesLoopFunction, RESIZE_POLLING_INTERVAL);

function makeCharMap() {
    var map = [];

    var empty = ['', ''];

    for (var i = 0; i < 256; i++) {
        map[i] = empty;
    }

    map[27] = ['ESC', 'ESCSHIFT'];
    map[192] = ['`', '~'];
    map[49] = ['1', '!'];
    map[50] = ['2', '@'];
    map[51] = ['3', '#'];
    map[52] = ['4', '$'];
    map[53] = ['5', '%'];
    map[54] = ['6', '^'];
    map[55] = ['7', '&'];
    map[56] = ['8', '*'];
    map[57] = ['9', '('];
    map[48] = ['0', ')'];
    map[189] = ['-', '_'];
    map[187] = ['=', '+'];
    map[8] = ['BACKSPACE', 'BACKSPACESHIFT'];
    map[46] = ['DELETE', 'DELETESHIFT'];
    map[9] = ['TAB', 'TABSHIFT'];
    map[81] = ['q', 'Q'];
    map[87] = ['w', 'W'];
    map[69] = ['e', 'E'];
    map[82] = ['r', 'R'];
    map[84] = ['t', 'T'];
    map[89] = ['y', 'Y'];
    map[85] = ['u', 'U'];
    map[73] = ['i', 'I'];
    map[79] = ['o', 'O'];
    map[80] = ['p', 'P'];
    map[219] = ['[', '{'];
    map[221] = [']', '}'];
    map[220] = ['\\', '|'];
    map[220] = ['CAPSLOCK', 'CAPSLOCKSHIFT'];
    map[65] = ['a', 'A'];
    map[83] = ['s', 'S'];
    map[68] = ['d', 'D'];
    map[70] = ['f', 'F'];
    map[71] = ['g', 'G'];
    map[72] = ['h', 'H'];
    map[74] = ['j', 'J'];
    map[75] = ['k', 'K'];
    map[76] = ['l', 'L'];
    map[186] = [';', ':'];
    map[222] = ['\'', '|'];
    map[13] = ['RETURN', 'RETURNSHIFT'];
    map[16] = ['SHIFT', 'SHIFT'];
    map[90] = ['z', 'Z'];
    map[88] = ['x', 'X'];
    map[67] = ['c', 'C'];
    map[86] = ['v', 'V'];
    map[66] = ['b', 'B'];
    map[78] = ['n', 'N'];
    map[77] = ['m', 'M'];
    map[188] = [',', '<'];
    map[190] = ['.', '>'];
    map[191] = ['/', '?'];
    map[16] = ['SHIFT', 'SHIFT'];
    map[17] = ['CTRL', 'CTRLSHIFT'];
    map[18] = ['ALT', 'ALTSHIFT'];
    map[91] = ['COMMANDLEFT', 'COMMANDLEFTSHIFT'];
    map[32] = ['SPACE', 'SPACESHIFT'];
    map[93] = ['COMMANDRIGHT', 'COMMANDRIGHTSHIFT'];
    map[18] = ['ALT', 'ALTSHIFT'];
    map[38] = ['UP', 'UPSHIFT'];
    map[37] = ['LEFT', 'LEFTSHIFT'];
    map[40] = ['DOWN', 'DOWNSHIFT'];
    map[39] = ['RIGHT', 'RIGHTSHIFT'];

    map[33] = ['PAGEUP', 'PAGEUPSHIFT'];
    map[34] = ['PAGEDOWN', 'PAGEDOWNSHIFT'];
    map[35] = ['PAGERIGHT', 'PAGERIGHTSHIFT']; // END
    map[36] = ['PAGELEFT', 'PAGELEFTSHIFT']; // HOME

    map[112] = ['F1', 'F1SHIFT'];
    map[113] = ['F2', 'F2SHIFT'];
    map[114] = ['F3', 'F3SHIFT'];
    map[115] = ['F4', 'F4SHIFT'];
    map[116] = ['F5', 'F5SHIFT'];
    map[117] = ['F6', 'F6SHIFT'];
    map[118] = ['F7', 'F7SHIFT'];
    map[119] = ['F8', 'F8SHIFT'];
    map[120] = ['F9', 'F9SHIFT'];
    map[121] = ['F10', 'F10SHIFT'];
    map[122] = ['F11', 'F1S1HIFT'];
    map[123] = ['F12', 'F121HIFT'];

    return map;
}

module.exports = Canvas;
},{"./js/GraphicsContext.js":4,"rectangular":1}],4:[function(require,module,exports){
'use strict';

var consoleLogger = require('./gc-console-logger');

/**
 * @constructor
 * @param gc - The 2-D graphics context from your canvas
 * @param {boolean|apiLogger} [logger=true]
 * * `true` uses `gc-console-logger` function bound to 'gc.' as prefix
 * * string uses `gc-console-logger` function bound to string
 * * function used as is
 */
function GraphicsContext(gc, logger) {
    this.gc = gc;

    var self = this;
    var reWEBKIT = /^webkit/;

    switch (typeof logger) {

        case 'string':
            logger =  consoleLogger.bind(undefined, logger + '.');
            break;

        case 'boolean':
            if (logger === true) {
                logger = consoleLogger.bind(undefined, 'gc.');
            }
            break;

        case 'function':
            if (logger.length !== 3) {
                throw 'GraphicsContext: User-supplied API logger function does not accept three parameters.';
            }
            break;

        default:
            logger = false;
    }

    // Stub out all the prototype members of the canvas 2D graphics context:
    Object.keys(Object.getPrototypeOf(gc)).forEach(MakeStub);

    // Some older browsers (e.g., Chrome 40) did not have all members of canvas
    // 2D graphics context in the prototype so we make this additional call:
    Object.keys(gc).forEach(MakeStub);

    function MakeStub(key) {
        if (key in GraphicsContext.prototype || reWEBKIT.test(key)) {
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
                set: function(value) {
                    gc[key] = logger ? logger(key, 'setter', value) : value;
                }
            });
        }
    }
}

module.exports = GraphicsContext;

},{"./gc-console-logger":5}],5:[function(require,module,exports){
'use strict';

var YIELDS = '\u27F9'; // LONG RIGHTWARDS DOUBLE ARROW

function consoleLogger(prefix, name, args, value) {
    var result = value;

    if (typeof value === 'string') {
        result = '"' + result + '"';
    }

    name = prefix + name;

    switch (args) {
        case 'getter':
            console.log(name, '=', result);
            break;

        case 'setter':
            console.log(name, YIELDS, result);
            break;

        default: // method call
            name += '(' + Array.prototype.slice.call(args).join(', ') + ')';
            if (result === undefined) {
                console.log(name);
            } else {
                console.log(name, YIELDS, result);
            }
    }

    return value;
}

module.exports = consoleLogger;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb25hdGhhbi9yZXBvcy9maW5jYW52YXMvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qb25hdGhhbi9yZXBvcy9maW5jYW52YXMvbm9kZV9tb2R1bGVzL3JlY3Rhbmd1bGFyL2luZGV4LmpzIiwiL1VzZXJzL2pvbmF0aGFuL3JlcG9zL2ZpbmNhbnZhcy9zcmMvZmFrZV8xYzJjYmZjNS5qcyIsIi9Vc2Vycy9qb25hdGhhbi9yZXBvcy9maW5jYW52YXMvc3JjL2luZGV4LmpzIiwiL1VzZXJzL2pvbmF0aGFuL3JlcG9zL2ZpbmNhbnZhcy9zcmMvanMvR3JhcGhpY3NDb250ZXh0LmpzIiwiL1VzZXJzL2pvbmF0aGFuL3JlcG9zL2ZpbmNhbnZhcy9zcmMvanMvZ2MtY29uc29sZS1sb2dnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4aUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdHZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQtZW52IG5vZGUsIGJyb3dzZXIgKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHJlYWQtb25seSBwcm9wZXJ0eSBhbmQgYXR0YWNoZXMgaXQgdG8gdGhlIHByb3ZpZGVkIGNvbnRleHQuXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBOYW1lIGZvciBuZXcgcHJvcGVydHkuXG4gKiBAcGFyYW0geyp9IFt2YWx1ZV0gLSBWYWx1ZSBvZiBuZXcgcHJvcGVydHkuXG4gKi9cbmZ1bmN0aW9uIGFkZFJlYWRPbmx5UHJvcGVydHkobmFtZSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0pO1xufVxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvciBQb2ludFxuICpcbiAqIEBkZXNjIFRoaXMgb2JqZWN0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9pbnQgaW4gYW4gYWJzdHJhY3QgMi1kaW1lbnNpb25hbCBtYXRyaXguXG4gKlxuICogVGhlIHVuaXQgb2YgbWVhc3VyZSBpcyB0eXBpY2FsbHkgcGl4ZWxzLlxuICogKElmIHVzZWQgdG8gbW9kZWwgY29tcHV0ZXIgZ3JhcGhpY3MsIHZlcnRpY2FsIGNvb3JkaW5hdGVzIGFyZSB0eXBpY2FsbHkgbWVhc3VyZWQgZG93bndhcmRzXG4gKiBmcm9tIHRoZSB0b3Agb2YgdGhlIHdpbmRvdy4gVGhpcyBjb252ZW50aW9uIGhvd2V2ZXIgaXMgbm90IGluaGVyZW50IGluIHRoaXMgb2JqZWN0LilcbiAqXG4gKiBOb3RlOiBUaGlzIG9iamVjdCBzaG91bGQgYmUgaW5zdGFudGlhdGVkIHdpdGggdGhlIGBuZXdgIGtleXdvcmQuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgbmV3IHBvaW50J3MgYHhgIHByb3BlcnR5XG4gKiBAcGFyYW0ge251bWJlcn0geSAtIHRoZSBuZXcgcG9pbnQncyBgeWAgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgeFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHN1bW1hcnkgVGhpcyBwb2ludCdzIGhvcml6b250YWwgY29vcmRpbmF0ZS5cbiAgICAgKiBAZGVzYyBDcmVhdGVkIHVwb24gaW5zdGFudGlhdGlvbiBieSB0aGUge0BsaW5rIFBvaW50fGNvbnN0cnVjdG9yfS5cbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgYWRkUmVhZE9ubHlQcm9wZXJ0eS5jYWxsKHRoaXMsICd4JywgTnVtYmVyKHgpIHx8IDApO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgeVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHN1bW1hcnkgVGhpcyBwb2ludCdzIHZlcnRpY2FsIGNvb3JkaW5hdGUuXG4gICAgICogQGRlc2MgQ3JlYXRlZCB1cG9uIGluc3RhbnRpYXRpb24gYnkgdGhlIHtAbGluayBQb2ludHxjb25zdHJ1Y3Rvcn0uXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGFkZFJlYWRPbmx5UHJvcGVydHkuY2FsbCh0aGlzLCAneScsIE51bWJlcih5KSB8fCAwKTtcblxufVxuXG5Qb2ludC5wcm90b3R5cGUgPSB7XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9IEEgbmV3IHBvaW50IHdoaWNoIGlzIHRoaXMgcG9pbnQncyBwb3NpdGlvbiBpbmNyZWFzZWQgYnkgY29vcmRpbmF0ZXMgb2YgZ2l2ZW4gYG9mZnNldGAuXG4gICAgICogQHBhcmFtIHtQb2ludH0gb2Zmc2V0IC0gSG9yaXpvbnRhbCBhbmQgdmVydGljYWwgdmFsdWVzIHRvIGFkZCB0byB0aGlzIHBvaW50J3MgY29vcmRpbmF0ZXMuXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqL1xuICAgIHBsdXM6IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KFxuICAgICAgICAgICAgdGhpcy54ICsgb2Zmc2V0LngsXG4gICAgICAgICAgICB0aGlzLnkgKyBvZmZzZXQueVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9IEEgbmV3IHBvaW50IHdoaWNoIGlzIHRoaXMgcG9pbnQncyBwb3NpdGlvbiBpbmNyZWFzZWQgYnkgZ2l2ZW4gb2Zmc2V0cy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29mZnNldFg9MF0gLSBWYWx1ZSB0byBhZGQgdG8gdGhpcyBwb2ludCdzIGhvcml6b250YWwgY29vcmRpbmF0ZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29mZnNldFk9MF0gLSBWYWx1ZSB0byBhZGQgdG8gdGhpcyBwb2ludCdzIGhvcml6b250YWwgY29vcmRpbmF0ZS5cbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICovXG4gICAgcGx1c1hZOiBmdW5jdGlvbihvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICAgICAgICB0aGlzLnggKyAob2Zmc2V0WCB8fCAwKSxcbiAgICAgICAgICAgIHRoaXMueSArIChvZmZzZXRZIHx8IDApXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtQb2ludH0gQSBuZXcgcG9pbnQgd2hpY2ggaXMgdGhpcyBwb2ludCdzIHBvc2l0aW9uIGRlY3JlYXNlZCBieSBjb29yZGluYXRlcyBvZiBnaXZlbiBgb2Zmc2V0YC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBvZmZzZXQgLSBIb3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCB2YWx1ZXMgdG8gc3VidHJhY3QgZnJvbSB0aGlzIHBvaW50J3MgY29vcmRpbmF0ZXMuXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqL1xuICAgIG1pbnVzOiBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludChcbiAgICAgICAgICAgIHRoaXMueCAtIG9mZnNldC54LFxuICAgICAgICAgICAgdGhpcy55IC0gb2Zmc2V0LnlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1BvaW50fSBBIG5ldyBgUG9pbnRgIHBvc2l0aW9uZWQgdG8gbGVhc3QgeCBhbmQgbGVhc3QgeSBvZiB0aGlzIHBvaW50IGFuZCBnaXZlbiBgb2Zmc2V0YC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludCAtIEEgcG9pbnQgdG8gY29tcGFyZSB0byB0aGlzIHBvaW50LlxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBtaW46IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICAgICAgICBNYXRoLm1pbih0aGlzLngsIHBvaW50LngpLFxuICAgICAgICAgICAgTWF0aC5taW4odGhpcy55LCBwb2ludC55KVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9IEEgbmV3IGBQb2ludGAgcG9zaXRpb25lZCB0byBncmVhdGVzdCB4IGFuZCBncmVhdGVzdCB5IG9mIHRoaXMgcG9pbnQgYW5kIGdpdmVuIGBwb2ludGAuXG4gICAgICogQHBhcmFtIHtQb2ludH0gcG9pbnQgLSBBIHBvaW50IHRvIGNvbXBhcmUgdG8gdGhpcyBwb2ludC5cbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICovXG4gICAgbWF4OiBmdW5jdGlvbihwb2ludCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KFxuICAgICAgICAgICAgTWF0aC5tYXgodGhpcy54LCBwb2ludC54KSxcbiAgICAgICAgICAgIE1hdGgubWF4KHRoaXMueSwgcG9pbnQueSlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge251bWJlcn0gRGlzdGFuY2UgYmV0d2VlbiBnaXZlbiBgcG9pbnRgIGFuZCB0aGlzIHBvaW50IHVzaW5nIFB5dGhhZ29yZWFuIFRoZW9yZW0gZm9ybXVsYS5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludCAtIEEgcG9pbnQgZnJvbSB3aGljaCB0byBjb21wdXRlIHRoZSBkaXN0YW5jZSB0byB0aGlzIHBvaW50LlxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBkaXN0YW5jZTogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgdmFyIGRlbHRhWCA9IHBvaW50LnggLSB0aGlzLngsXG4gICAgICAgICAgICBkZWx0YVkgPSBwb2ludC55IC0gdGhpcy55O1xuXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoXG4gICAgICAgICAgICBkZWx0YVggKiBkZWx0YVggK1xuICAgICAgICAgICAgZGVsdGFZICogZGVsdGFZXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIF8oRm9ybWVybHk6IGBlcXVhbGAuKV9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmZiBfYm90aF8gY29vcmRpbmF0ZXMgb2YgdGhpcyBwb2ludCBhcmUgZXhhY3RseSBlcXVhbCB0byB0aG9zZSBvZiBnaXZlbiBgcG9pbnRgLlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IC0gQSBwb2ludCB0byBjb21wYXJlIHRvIHRoaXMgcG9pbnQuXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqL1xuICAgIGVxdWFsczogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChwb2ludCkge1xuICAgICAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgICAgICB0aGlzLnggPT09IHBvaW50LnggJiZcbiAgICAgICAgICAgICAgICB0aGlzLnkgPT09IHBvaW50Lnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmZiBfYm90aF8gY29vcmRpbmF0ZXMgb2YgdGhpcyBwb2ludCBhcmUgZ3JlYXRlciB0aGFuIHRob3NlIG9mIGdpdmVuIGBwb2ludGAuXG4gICAgICogQHBhcmFtIHtQb2ludH0gcG9pbnQgLSBBIHBvaW50IHRvIGNvbXBhcmUgdG8gdGhpcyBwb2ludFxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBncmVhdGVyVGhhbjogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMueCA+IHBvaW50LnggJiZcbiAgICAgICAgICAgIHRoaXMueSA+IHBvaW50LnlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZmYgX2JvdGhfIGNvb3JkaW5hdGVzIG9mIHRoaXMgcG9pbnQgYXJlIGxlc3MgdGhhbiB0aG9zZSBvZiBnaXZlbiBgcG9pbnRgLlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IC0gQSBwb2ludCB0byBjb21wYXJlIHRvIHRoaXMgcG9pbnRcbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICovXG4gICAgbGVzc1RoYW46IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnggPCBwb2ludC54ICYmXG4gICAgICAgICAgICB0aGlzLnkgPCBwb2ludC55XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIF8oRm9ybWVybHkgYGdyZWF0ZXJUaGFuRXF1YWxUb2AuKV9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmZiBfYm90aF8gY29vcmRpbmF0ZXMgb2YgdGhpcyBwb2ludCBhcmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRob3NlIG9mIGdpdmVuIGBwb2ludGAuXG4gICAgICogQHBhcmFtIHtQb2ludH0gcG9pbnQgLSBBIHBvaW50IHRvIGNvbXBhcmUgdG8gdGhpcyBwb2ludFxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBncmVhdGVyVGhhbk9yRXF1YWxUbzogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMueCA+PSBwb2ludC54ICYmXG4gICAgICAgICAgICB0aGlzLnkgPj0gcG9pbnQueVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBfKEZvcm1lcmx5IGBsZXNzVGhhbkVxdWFsVG9gLilfXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZmYgX2JvdGhfIGNvb3JkaW5hdGVzIG9mIHRoaXMgcG9pbnQgYXJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aG9zZSBvZiBnaXZlbiBgcG9pbnRgLlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IC0gQSBwb2ludCB0byBjb21wYXJlIHRvIHRoaXMgcG9pbnQuXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqL1xuICAgIGxlc3NUaGFuT3JFcXVhbFRvOiBmdW5jdGlvbihwb2ludCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy54IDw9IHBvaW50LnggJiZcbiAgICAgICAgICAgIHRoaXMueSA8PSBwb2ludC55XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIF8oRm9ybWVybHkgYGlzQ29udGFpbmVkV2l0aGluUmVjdGFuZ2xlYC4pX1xuICAgICAqIEBwYXJhbSByZWN0IHtSZWN0YW5nbGV9IC0gUmVjdGFuZ2xlIHRvIHRlc3QgdGhpcyBwb2ludCBhZ2FpbnN0LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWZmIHRoaXMgcG9pbnQgaXMgd2l0aGluIGdpdmVuIGByZWN0YC5cbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICovXG4gICAgd2l0aGluOiBmdW5jdGlvbihyZWN0KSB7XG4gICAgICAgIHZhciBtaW5YID0gcmVjdC5vcmlnaW4ueCxcbiAgICAgICAgICAgIG1heFggPSBtaW5YICsgcmVjdC5leHRlbnQueDtcbiAgICAgICAgdmFyIG1pblkgPSByZWN0Lm9yaWdpbi55LFxuICAgICAgICAgICAgbWF4WSA9IG1pblkgKyByZWN0LmV4dGVudC55O1xuXG4gICAgICAgIGlmIChyZWN0LmV4dGVudC54IDwgMCkge1xuICAgICAgICAgICAgbWluWCA9IG1heFg7XG4gICAgICAgICAgICBtYXhYID0gcmVjdC5vcmlnaW4ueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWN0LmV4dGVudC55IDwgMCkge1xuICAgICAgICAgICAgbWluWSA9IG1heFk7XG4gICAgICAgICAgICBtYXhZID0gcmVjdC5vcmlnaW4ueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBtaW5YIDw9IHRoaXMueCAmJiB0aGlzLnggPCBtYXhYICYmXG4gICAgICAgICAgICBtaW5ZIDw9IHRoaXMueSAmJiB0aGlzLnkgPCBtYXhZXG4gICAgICAgICk7XG4gICAgfVxufTtcblxuUG9pbnQucHJvdG90eXBlLkVRID0gUG9pbnQucHJvdG90eXBlLmVxdWFscztcblBvaW50LnByb3RvdHlwZS5HVCA9IFBvaW50LnByb3RvdHlwZS5ncmVhdGVyVGhhbjtcblBvaW50LnByb3RvdHlwZS5MVCA9IFBvaW50LnByb3RvdHlwZS5sZXNzVGhhbjtcblBvaW50LnByb3RvdHlwZS5HRSA9IFBvaW50LnByb3RvdHlwZS5ncmVhdGVyVGhhbk9yRXF1YWxUbztcblBvaW50LnByb3RvdHlwZS5MRSA9IFBvaW50LnByb3RvdHlwZS5sZXNzVGhhbk9yRXF1YWxUbztcblxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvciBSZWN0YW5nbGVcbiAqXG4gKiBAZGVzYyBUaGlzIG9iamVjdCByZXByZXNlbnRzIGEgcmVjdGFuZ3VsYXIgYXJlYSB3aXRoaW4gYW4gYWJzdHJhY3QgMi1kaW1lbnNpb25hbCBtYXRyaXguXG4gKlxuICogVGhlIHVuaXQgb2YgbWVhc3VyZSBpcyB0eXBpY2FsbHkgcGl4ZWxzLlxuICogKElmIHVzZWQgdG8gbW9kZWwgY29tcHV0ZXIgZ3JhcGhpY3MsIHZlcnRpY2FsIGNvb3JkaW5hdGVzIGFyZSB0eXBpY2FsbHkgbWVhc3VyZWQgZG93bndhcmRzXG4gKiBmcm9tIHRoZSB0b3Agb2YgdGhlIHdpbmRvdy4gVGhpcyBjb252ZW50aW9uIGhvd2V2ZXIgaXMgbm90IGluaGVyZW50IGluIHRoaXMgb2JqZWN0LilcbiAqXG4gKiBOb3JtYWxseSwgdGhlIGB4YCBhbmQgYHlgIHBhcmFtZXRlcnMgdG8gdGhlIGNvbnN0cnVjdG9yIGRlc2NyaWJlIHRoZSB1cHBlciBsZWZ0IGNvcm5lciBvZiB0aGUgcmVjdC5cbiAqIEhvd2V2ZXIsIG5lZ2F0aXZlIHZhbHVlcyBvZiBgd2lkdGhgIGFuZCBgaGVpZ2h0YCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBnaXZlbiBgeGAgYW5kIGB5YC4gVGhhdCBpcyxcbiAqIGEgbmVnYXRpdmUgdmFsdWUgb2YgdGhlIGB3aWR0aGAgcGFyYW1ldGVyIHdpbGwgZXh0ZW5kIHRoZSByZWN0IHRvIHRoZSBsZWZ0IG9mIHRoZSBnaXZlbiBgeGAgYW5kXG4gKiBhIG5lZ2F0aXZlIHZhbHVlIG9mIHRoZSBgaGVpZ2h0YCBwYXJhbWV0ZXIgd2lsbCBleHRlbmQgdGhlIHJlY3QgYWJvdmUgdGhlIGdpdmVuIGB5YC5cbiAqIEluIGFueSBjYXNlLCBhZnRlciBpbnN0YW50aWF0aW9uIHRoZSBmb2xsb3dpbmcgYXJlIGd1YXJhbnRlZWQgdG8gYWx3YXlzIGJlIHRydWU6XG4gKiAqIFRoZSBgZXh0ZW50YCwgYHdpZHRoYCwgYW5kIGBoZWlnaHRgIHByb3BlcnRpZXMgX2Fsd2F5c18gZ2l2ZSBwb3NpdGl2ZSB2YWx1ZXMuXG4gKiAqIFRoZSBgb3JpZ2luYCwgYHRvcGAsIGFuZCBgbGVmdGAgcHJvcGVydGllcyBfYWx3YXlzXyByZWZsZWN0IHRoZSB1cHBlciBsZWZ0IGNvcm5lci5cbiAqICogVGhlIGBjb3JuZXJgLCBgYm90dG9tYCwgYW5kIGByaWdodGAgcHJvcGVydGllcyBfYWx3YXlzXyByZWZsZWN0IHRoZSBsb3dlciByaWdodCBjb3JuZXIuXG4gKlxuICogTm90ZTogVGhpcyBvYmplY3Qgc2hvdWxkIGJlIGluc3RhbnRpYXRlZCB3aXRoIHRoZSBgbmV3YCBrZXl3b3JkLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSAtIEhvcml6b250YWwgY29vcmRpbmF0ZSBvZiBzb21lIGNvcm5lciBvZiB0aGUgcmVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSAtIFZlcnRpY2FsIGNvb3JkaW5hdGUgb2Ygc29tZSBjb3JuZXIgb2YgdGhlIHJlY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dpZHRoPTBdIC0gV2lkdGggb2YgdGhlIG5ldyByZWN0LiBNYXkgYmUgbmVnYXRpdmUgKHNlZSBhYm92ZSkuXG4gKiBAcGFyYW0ge251bWJlcn0gW2hlaWdodD0wXSAtIEhlaWdodCBvZiB0aGUgbmV3IHJlY3QuIE1heSBiZSBuZWdhdGl2ZSAoc2VlIGFib3ZlKS5cbiAqL1xuZnVuY3Rpb24gUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcblxuICAgIHggPSBOdW1iZXIoeCkgfHwgMDtcbiAgICB5ID0gTnVtYmVyKHkpIHx8IDA7XG4gICAgd2lkdGggPSBOdW1iZXIod2lkdGgpIHx8IDA7XG4gICAgaGVpZ2h0ID0gTnVtYmVyKGhlaWdodCkgfHwgMDtcblxuICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgICAgeCArPSB3aWR0aDtcbiAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgICAgeSArPSBoZWlnaHQ7XG4gICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG5hbWUgb3JpZ2luXG4gICAgICogQHR5cGUge1BvaW50fVxuICAgICAqIEBzdW1tYXJ5IFVwcGVyIGxlZnQgY29ybmVyIG9mIHRoaXMgcmVjdC5cbiAgICAgKiBAZGVzYyBDcmVhdGVkIHVwb24gaW5zdGFudGlhdGlvbiBieSB0aGUge0BsaW5rcGxhaW4gUmVjdGFuZ2xlfGNvbnN0cnVjdG9yfS5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGFkZFJlYWRPbmx5UHJvcGVydHkuY2FsbCh0aGlzLCAnb3JpZ2luJywgbmV3IFBvaW50KHgsIHkpKTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGV4dGVudFxuICAgICAqIEB0eXBlIHtQb2ludH1cbiAgICAgKiBAc3VtbWFyeSB0aGlzIHJlY3QncyB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgICAqIEBkZXNjIFVubGlrZSB0aGUgb3RoZXIgYFBvaW50YCBwcm9wZXJ0aWVzLCBgZXh0ZW50YCBpcyBub3QgYSBnbG9iYWwgY29vcmRpbmF0ZSBwYWlyOyByYXRoZXIgaXQgY29uc2lzdHMgb2YgYSBfd2lkdGhfIChgeGAsIGFsd2F5cyBwb3NpdGl2ZSkgYW5kIGEgX2hlaWdodF8gKGB5YCwgYWx3YXlzIHBvc2l0aXZlKS5cbiAgICAgKlxuICAgICAqIFRoaXMgb2JqZWN0IG1pZ2h0IGJlIG1vcmUgbGVnaXRpbWF0ZWx5IHR5cGVkIGFzIHNvbWV0aGluZyBsaWtlIGBBcmVhYCB3aXRoIHByb3BlcnRpZXMgYHdpZHRoYCBhbmQgYGhlaWdodGA7IGhvd2V2ZXIgd2Ugd2FudGVkIGl0IHRvIGJlIGFibGUgdG8gdXNlIGl0IGVmZmljaWVudGx5IHdpdGggYSBwb2ludCdzIGBwbHVzYCBhbmQgYG1pbnVzYCBtZXRob2RzICh0aGF0IGlzLCB3aXRob3V0IHRob3NlIG1ldGhvZHMgaGF2aW5nIHRvIGNoZWNrIGFuZCBicmFuY2ggb24gdGhlIHR5cGUgb2YgaXRzIHBhcmFtZXRlcikuXG4gICAgICpcbiAgICAgKiBDcmVhdGVkIHVwb24gaW5zdGFudGlhdGlvbiBieSB0aGUge0BsaW5rcGxhaW4gUmVjdGFuZ2xlfGNvbnN0cnVjdG9yfS5cbiAgICAgKiBAc2VlIFRoZSB7QGxpbmsgUmVjdGFuZ2xlI2Nvcm5lcnxjb3JuZXJ9IG1ldGhvZC5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGFkZFJlYWRPbmx5UHJvcGVydHkuY2FsbCh0aGlzLCAnZXh0ZW50JywgbmV3IFBvaW50KHdpZHRoLCBoZWlnaHQpKTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGNvcm5lclxuICAgICAqIEB0eXBlIHtQb2ludH1cbiAgICAgKiBAc3VtbWFyeSBMb3dlciByaWdodCBjb3JuZXIgb2YgdGhpcyByZWN0LlxuICAgICAqIEBkZXNjIFRoaXMgaXMgYSBjYWxjdWxhdGVkIHZhbHVlIGNyZWF0ZWQgdXBvbiBpbnN0YW50aWF0aW9uIGJ5IHRoZSB7QGxpbmtwbGFpbiBSZWN0YW5nbGV8Y29uc3RydWN0b3J9LiBJdCBpcyBgb3JpZ2luYCBvZmZzZXQgYnkgYGV4dGVudGAuXG4gICAgICpcbiAgICAgKiAqKk5vdGU6KiogVGhlc2UgY29vcmRpbmF0ZXMgYWN0dWFsbHkgcG9pbnQgdG8gdGhlIHBpeGVsIG9uZSBiZWxvdyBhbmQgb25lIHRvIHRoZSByaWdodCBvZiB0aGUgcmVjdCdzIGFjdHVhbCBsb3dlciByaWdodCBwaXhlbC5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGFkZFJlYWRPbmx5UHJvcGVydHkuY2FsbCh0aGlzLCAnY29ybmVyJywgbmV3IFBvaW50KHggKyB3aWR0aCwgeSArIGhlaWdodCkpO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgY2VudGVyXG4gICAgICogQHR5cGUge1BvaW50fVxuICAgICAqIEBzdW1tYXJ5IENlbnRlciBvZiB0aGlzIHJlY3QuXG4gICAgICogQGRlc2MgQ3JlYXRlZCB1cG9uIGluc3RhbnRpYXRpb24gYnkgdGhlIHtAbGlua3BsYWluIFJlY3RhbmdsZXxjb25zdHJ1Y3Rvcn0uXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBhZGRSZWFkT25seVByb3BlcnR5LmNhbGwodGhpcywgJ2NlbnRlcicsIG5ldyBQb2ludCh4ICsgKHdpZHRoIC8gMiksIHkgKyAoaGVpZ2h0IC8gMikpKTtcblxufVxuXG5SZWN0YW5nbGUucHJvdG90eXBlID0ge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVzYyBfKEZvcm1lcmx5IGEgZnVuY3Rpb247IG5vdyBhIGdldHRlci4pX1xuICAgICAqIEBzdW1tYXJ5IE1pbmltdW0gdmVydGljYWwgY29vcmRpbmF0ZSBvZiB0aGlzIHJlY3QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBnZXQgdG9wKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW4ueTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVzYyBfKEZvcm1lcmx5IGEgZnVuY3Rpb247IG5vdyBhIGdldHRlci4pX1xuICAgICAqIEBzdW1tYXJ5IE1pbmltdW0gaG9yaXpvbnRhbCBjb29yZGluYXRlIG9mIHRoaXMgcmVjdC5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGdldCBsZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW4ueDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVzYyBfKEZvcm1lcmx5IGEgZnVuY3Rpb247IG5vdyBhIGdldHRlci4pX1xuICAgICAqIEBzdW1tYXJ5IE1heGltdW0gdmVydGljYWwgY29vcmRpbmF0ZSBvZiB0aGlzIHJlY3QgKyAxLlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgZ2V0IGJvdHRvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ybmVyLnk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlc2MgXyhGb3JtZXJseSBhIGZ1bmN0aW9uOyBub3cgYSBnZXR0ZXIuKV9cbiAgICAgKiBAc3VtbWFyeSBNYXhpbXVtIGhvcml6b250YWwgY29vcmRpbmF0ZSBvZiB0aGlzIHJlY3QgKyAxLlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgZ2V0IHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3JuZXIueDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVzYyBfKEZvcm1lcmx5IGEgZnVuY3Rpb247IG5vdyBhIGdldHRlci4pX1xuICAgICAqIEBzdW1tYXJ5IFdpZHRoIG9mIHRoaXMgcmVjdCAoYWx3YXlzIHBvc2l0aXZlKS5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGdldCB3aWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZW50Lng7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlc2MgXyhGb3JtZXJseSBhIGZ1bmN0aW9uOyBub3cgYSBnZXR0ZXIuKV9cbiAgICAgKiBAc3VtbWFyeSBIZWlnaHQgb2YgdGhpcyByZWN0IChhbHdheXMgcG9zaXRpdmUpLlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgZ2V0IGhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZW50Lnk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlc2MgXyhGb3JtZXJseSBhIGZ1bmN0aW9uOyBub3cgYSBnZXR0ZXIuKV9cbiAgICAgKiBAc3VtbWFyeSBBcmVhIG9mIHRoaXMgcmVjdC5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGdldCBhcmVhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UmVjdGFuZ2xlfSBBIGNvcHkgb2YgdGhpcyByZWN0IGJ1dCB3aXRoIGhvcml6b250YWwgcG9zaXRpb24gcmVzZXQgdG8gZ2l2ZW4gYHhgIGFuZCBubyB3aWR0aC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCAtIEhvcml6b250YWwgY29vcmRpbmF0ZSBvZiB0aGUgbmV3IHJlY3QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBmbGF0dGVuWEF0OiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHgsIHRoaXMub3JpZ2luLnksIDAsIHRoaXMuZXh0ZW50LnkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UmVjdGFuZ2xlfSBBIGNvcHkgb2YgdGhpcyByZWN0IGJ1dCB3aXRoIHZlcnRpY2FsIHBvc2l0aW9uIHJlc2V0IHRvIGdpdmVuIGB5YCBhbmQgbm8gaGVpZ2h0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVmVydGljYWwgY29vcmRpbmF0ZSBvZiB0aGUgbmV3IHJlY3QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBmbGF0dGVuWUF0OiBmdW5jdGlvbih5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHRoaXMub3JpZ2luLngsIHksIHRoaXMuZXh0ZW50LngsIDApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmZiBnaXZlbiBgcG9pbnRgIGVudGlyZWx5IGNvbnRhaW5lZCB3aXRoaW4gdGhpcyByZWN0LlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50T3JSZWN0IC0gVGhlIHBvaW50IG9yIHJlY3QgdG8gdGVzdCBmb3IgY29udGFpbm1lbnQuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBjb250YWluczogZnVuY3Rpb24ocG9pbnRPclJlY3QpIHtcbiAgICAgICAgcmV0dXJuIHBvaW50T3JSZWN0LndpdGhpbih0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXyhGb3JtZXJseSBgaXNDb250YWluZWRXaXRoaW5SZWN0YW5nbGVgLilfXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZmYgYHRoaXNgIHJlY3QgaXMgZW50aXJlbHkgY29udGFpbmVkIHdpdGhpbiBnaXZlbiBgcmVjdGAuXG4gICAgICogQHBhcmFtIHtSZWN0YW5nbGV9IHJlY3QgLSBSZWN0YW5nbGUgdG8gdGVzdCBhZ2FpbnN0IHRoaXMgcmVjdC5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIHdpdGhpbjogZnVuY3Rpb24ocmVjdCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcmVjdC5vcmlnaW4ubGVzc1RoYW5PckVxdWFsVG8odGhpcy5vcmlnaW4pICYmXG4gICAgICAgICAgICByZWN0LmNvcm5lci5ncmVhdGVyVGhhbk9yRXF1YWxUbyh0aGlzLmNvcm5lcilcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXyhGb3JtZXJseTogYGluc2V0QnlgLilfXG4gICAgICogQHJldHVybnMge1JlY3RhbmdsZX0gVGhhdCBpcyBlbmxhcmdlZC9zaHJ1bmsgYnkgZ2l2ZW4gYHBhZGRpbmdgLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYWRkaW5nIC0gQW1vdW50IGJ5IHdoaWNoIHRvIGluY3JlYXNlICgrKSBvciBkZWNyZWFzZSAoLSkgdGhpcyByZWN0XG4gICAgICogQHNlZSBUaGUge0BsaW5rIFJlY3RhbmdsZSNzaHJpbmtCeXxzaHJpbmtCeX0gbWV0aG9kLlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgZ3Jvd0J5OiBmdW5jdGlvbihwYWRkaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKFxuICAgICAgICAgICAgdGhpcy5vcmlnaW4ueCArIHBhZGRpbmcsXG4gICAgICAgICAgICB0aGlzLm9yaWdpbi55ICsgcGFkZGluZyxcbiAgICAgICAgICAgIHRoaXMuZXh0ZW50LnggLSBwYWRkaW5nIC0gcGFkZGluZyxcbiAgICAgICAgICAgIHRoaXMuZXh0ZW50LnkgLSBwYWRkaW5nIC0gcGFkZGluZyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtSZWN0YW5nbGV9IFRoYXQgaXMgZW5sYXJnZWQvc2hydW5rIGJ5IGdpdmVuIGBwYWRkaW5nYC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFkZGluZyAtIEFtb3VudCBieSB3aGljaCB0byBkZWNyZWFzZSAoKykgb3IgaW5jcmVhc2UgKC0pIHRoaXMgcmVjdC5cbiAgICAgKiBAc2VlIFRoZSB7QGxpbmsgUmVjdGFuZ2xlI2dyb3dCeXxncm93Qnl9IG1ldGhvZC5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIHNocmlua0J5OiBmdW5jdGlvbihwYWRkaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyb3dCeSgtcGFkZGluZyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtSZWN0YW5nbGV9IEJvdW5kaW5nIHJlY3QgdGhhdCBjb250YWlucyBib3RoIHRoaXMgcmVjdCBhbmQgdGhlIGdpdmVuIGByZWN0YC5cbiAgICAgKiBAcGFyYW0ge1JlY3RhbmdsZX0gcmVjdCAtIFRoZSByZWN0YW5nbGUgdG8gdW5pb24gd2l0aCB0aGlzIHJlY3QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICB1bmlvbjogZnVuY3Rpb24ocmVjdCkge1xuICAgICAgICB2YXIgb3JpZ2luID0gdGhpcy5vcmlnaW4ubWluKHJlY3Qub3JpZ2luKSxcbiAgICAgICAgICAgIGNvcm5lciA9IHRoaXMuY29ybmVyLm1heChyZWN0LmNvcm5lciksXG4gICAgICAgICAgICBleHRlbnQgPSBjb3JuZXIubWludXMob3JpZ2luKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShcbiAgICAgICAgICAgIG9yaWdpbi54LCBvcmlnaW4ueSxcbiAgICAgICAgICAgIGV4dGVudC54LCBleHRlbnQueVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpdGVyYXRlIG92ZXIgYWxsIHBvaW50cyB3aXRoaW4gdGhpcyByZWN0LCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvciBlYWNoLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcil9IGl0ZXJhdGVlIC0gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBwb2ludC5cbiAgICAgKiBCb3VuZCB0byBgY29udGV4dGAgd2hlbiBnaXZlbjsgb3RoZXJ3aXNlIGl0IGlzIGJvdW5kIHRvIHRoaXMgcmVjdC5cbiAgICAgKiBFYWNoIGludm9jYXRpb24gb2YgYGl0ZXJhdGVlYCBpcyBjYWxsZWQgd2l0aCB0d28gYXJndW1lbnRzOlxuICAgICAqIHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBjb29yZGluYXRlcyBvZiB0aGUgcG9pbnQuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtjb250ZXh0PXRoaXNdIC0gQ29udGV4dCB0byBiaW5kIHRvIGBpdGVyYXRlZWAgKHdoZW4gbm90IGB0aGlzYCkuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBmb3JFYWNoOiBmdW5jdGlvbihpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCB0aGlzO1xuICAgICAgICBmb3IgKHZhciB4ID0gdGhpcy5vcmlnaW4ueCwgeDIgPSB0aGlzLmNvcm5lci54OyB4IDwgeDI7IHgrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IHRoaXMub3JpZ2luLnksIHkyID0gdGhpcy5jb3JuZXIueTsgeSA8IHkyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRlZS5jYWxsKGNvbnRleHQsIHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtSZWN0YW5nbGV9IE9uZSBvZjpcbiAgICAgKiAqIF9JZiB0aGlzIHJlY3QgaW50ZXJzZWN0cyB3aXRoIHRoZSBnaXZlbiBgcmVjdGA6X1xuICAgICAqICAgICAgYSBuZXcgcmVjdCByZXByZXNlbnRpbmcgdGhhdCBpbnRlcnNlY3Rpb24uXG4gICAgICogKiBfSWYgaXQgZG9lc24ndCBpbnRlcnNlY3QgYW5kIGBpZk5vbmVBY3Rpb25gIGRlZmluZWQ6X1xuICAgICAqICAgICAgcmVzdWx0IG9mIGNhbGxpbmcgYGlmTm9uZUFjdGlvbmAuXG4gICAgICogKiBfSWYgaXQgZG9lc24ndCBpbnRlcnNlY3QgYW5kIGBpZk5vbmVBY3Rpb25gIHVuZGVmaW5lZDpfXG4gICAgICogICAgICBgbnVsbGAuXG4gICAgICogQHBhcmFtIHtSZWN0YW5nbGV9IHJlY3QgLSBUaGUgcmVjdGFuZ2xlIHRvIGludGVyc2VjdCB3aXRoIHRoaXMgcmVjdC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFJlY3RhbmdsZSl9IFtpZk5vbmVBY3Rpb25dIC0gV2hlbiBubyBpbnRlcnNlY3Rpb24sIGludm9rZSBhbmQgcmV0dXJuIHJlc3VsdC5cbiAgICAgKiBCb3VuZCB0byBgY29udGV4dGAgd2hlbiBnaXZlbjsgb3RoZXJ3aXNlIGJvdW5kIHRvIHRoaXMgcmVjdC5cbiAgICAgKiBJbnZva2VkIHdpdGggYHJlY3RgIGFzIHNvbGUgcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbY29udGV4dD10aGlzXSAtIENvbnRleHQgdG8gYmluZCB0byBgaWZOb25lQWN0aW9uYCAod2hlbiBub3QgYHRoaXNgKS5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGludGVyc2VjdDogZnVuY3Rpb24ocmVjdCwgaWZOb25lQWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgb3JpZ2luID0gdGhpcy5vcmlnaW4ubWF4KHJlY3Qub3JpZ2luKSxcbiAgICAgICAgICAgIGNvcm5lciA9IHRoaXMuY29ybmVyLm1pbihyZWN0LmNvcm5lciksXG4gICAgICAgICAgICBleHRlbnQgPSBjb3JuZXIubWludXMob3JpZ2luKTtcblxuICAgICAgICBpZiAoZXh0ZW50LnggPiAwICYmIGV4dGVudC55ID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFJlY3RhbmdsZShcbiAgICAgICAgICAgICAgICBvcmlnaW4ueCwgb3JpZ2luLnksXG4gICAgICAgICAgICAgICAgZXh0ZW50LngsIGV4dGVudC55XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpZk5vbmVBY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGlmTm9uZUFjdGlvbi5jYWxsKGNvbnRleHQgfHwgdGhpcywgcmVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmZiB0aGlzIHJlY3Qgb3ZlcmxhcHMgd2l0aCBnaXZlbiBgcmVjdGAuXG4gICAgICogQHBhcmFtIHtSZWN0YW5nbGV9IHJlY3QgLSBUaGUgcmVjdGFuZ2xlIHRvIGludGVyc2VjdCB3aXRoIHRoaXMgcmVjdC5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGludGVyc2VjdHM6IGZ1bmN0aW9uKHJlY3QpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHJlY3QuY29ybmVyLnggPiB0aGlzLm9yaWdpbi54ICYmXG4gICAgICAgICAgICByZWN0LmNvcm5lci55ID4gdGhpcy5vcmlnaW4ueSAmJlxuICAgICAgICAgICAgcmVjdC5vcmlnaW4ueCA8IHRoaXMuY29ybmVyLnggJiZcbiAgICAgICAgICAgIHJlY3Qub3JpZ2luLnkgPCB0aGlzLmNvcm5lci55XG4gICAgICAgICk7XG4gICAgfVxufTtcblxuLy8gSW50ZXJmYWNlXG5leHBvcnRzLlBvaW50ID0gUG9pbnQ7XG5leHBvcnRzLlJlY3RhbmdsZSA9IFJlY3RhbmdsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50LWVudiBub2RlLCBicm93c2VyICovXG5cbmlmICghd2luZG93LmZpbikge1xuICAgIHdpbmRvdy5maW4gPSB7fTtcbn1cblxuaWYgKCF3aW5kb3cuZmluLkNhbnZhcykge1xuICAgIHdpbmRvdy5maW4uQ2FudmFzID0gcmVxdWlyZSgnLi8nKTtcbn1cbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciByZWN0YW5ndWxhciA9IHJlcXVpcmUoJ3JlY3Rhbmd1bGFyJyk7XG5cbnZhciBHcmFwaGljc0NvbnRleHQgPSByZXF1aXJlKCcuL2pzL0dyYXBoaWNzQ29udGV4dC5qcycpO1xuXG52YXIgUkVTSVpFX1BPTExJTkdfSU5URVJWQUwgPSAyMDAsXG4gICAgcGFpbnRhYmxlcyA9IFtdLFxuICAgIHJlc2l6YWJsZXMgPSBbXSxcbiAgICBwYWludExvb3BSdW5uaW5nID0gdHJ1ZSxcbiAgICByZXNpemVMb29wUnVubmluZyA9IHRydWUsXG4gICAgY2hhck1hcCA9IG1ha2VDaGFyTWFwKCk7XG5cbmZ1bmN0aW9uIENhbnZhcyhkaXYsIGNvbXBvbmVudCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZGl2ID0gZGl2O1xuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5kb3VibGVDbGlja0RlbGF5ID0gb3B0aW9ucy5kb3VibGVDbGlja0RlbGF5IHx8IDMyNTtcblxuICAgIHRoaXMuZHJhZ0VuZHRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5vdXRsaW5lID0gJ25vbmUnO1xuXG4gICAgLy8gdGhpcy5mb2N1c2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgLy8gdGhpcy5mb2N1c2VyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAvLyB0aGlzLmZvY3VzZXIuc3R5bGUudG9wID0gJzBweCc7XG4gICAgLy8gdGhpcy5mb2N1c2VyLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAvLyB0aGlzLmZvY3VzZXIuc3R5bGUuekluZGV4ID0gJy0xJztcbiAgICAvLyB0aGlzLmZvY3VzZXIuc3R5bGUub3V0bGluZSA9ICdub25lJztcbiAgICAvLyB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLmZvY3VzZXIpO1xuXG4gICAgdGhpcy5jYW52YXNDVFggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuZ2MgPSBuZXcgR3JhcGhpY3NDb250ZXh0KHRoaXMuY2FudmFzQ1RYKTtcblxuICAgIHRoaXMuYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5idWZmZXJDVFggPSB0aGlzLmJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuYnVmZmVyR0MgPSBuZXcgR3JhcGhpY3NDb250ZXh0KHRoaXMuYnVmZmVyQ1RYKTtcblxuICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IG5ldyByZWN0YW5ndWxhci5Qb2ludCgtMSwgLTEpO1xuICAgIHRoaXMuZHJhZ3N0YXJ0ID0gbmV3IHJlY3Rhbmd1bGFyLlBvaW50KC0xLCAtMSk7XG4gICAgLy90aGlzLm9yaWdpbiA9IG5ldyByZWN0YW5ndWxhci5Qb2ludCgwLCAwKTtcbiAgICB0aGlzLmJvdW5kcyA9IG5ldyByZWN0YW5ndWxhci5SZWN0YW5nbGUoMCwgMCwgMCwgMCk7XG4gICAgdGhpcy5oYXNNb3VzZSA9IGZhbHNlO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoc2VsZi5oYXNNb3VzZSB8fCBzZWxmLmlzRHJhZ2dpbmcoKSkge1xuICAgICAgICAgICAgc2VsZi5maW5tb3VzZW1vdmUoZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmZpbm1vdXNldXAoZSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmlud2hlZWxtb3ZlZChlKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmZpbmtleWRvd24oZSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmlua2V5dXAoZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLmhhc01vdXNlID0gdHJ1ZTtcbiAgICB9O1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmZpbmZvY3VzZ2FpbmVkKGUpO1xuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmluZm9jdXNsb3N0KGUpO1xuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5maW5tb3VzZWRvd24oZSk7XG4gICAgfSk7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuaGFzTW91c2UgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5maW5tb3VzZW91dChlKTtcbiAgICB9KTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5maW5jbGljayhlKTtcbiAgICB9KTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5maW5jb250ZXh0bWVudShlKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGhpcy5jYW52YXMuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcblxuICAgIHRoaXMucmVzaXplKCk7XG5cbiAgICB0aGlzLmJlZ2luUmVzaXppbmcoKTtcbiAgICB0aGlzLmJlZ2luUGFpbnRpbmcoKTtcbn1cblxuQ2FudmFzLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ2FudmFzLnByb3RvdHlwZS5jb25zdHJ1Y3RvcixcbiAgICBkaXY6IG51bGwsXG4gICAgY29tcG9uZW50OiBudWxsLFxuICAgIGNhbnZhczogbnVsbCxcbiAgICBjYW52YXNDVFg6IG51bGwsXG4gICAgZm9jdXNlcjogbnVsbCxcbiAgICBidWZmZXI6IG51bGwsXG4gICAgY3R4OiBudWxsLFxuICAgIG1vdXNlTG9jYXRpb246IG51bGwsXG4gICAgZHJhZ3N0YXJ0OiBudWxsLFxuICAgIG9yaWdpbjogbnVsbCxcbiAgICBib3VuZHM6IG51bGwsXG4gICAgZGlydHk6IGZhbHNlLFxuICAgIHNpemU6IG51bGwsXG4gICAgbW91c2Vkb3duOiBmYWxzZSxcbiAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgcmVwZWF0S2V5Q291bnQ6IDAsXG4gICAgcmVwZWF0S2V5OiBudWxsLFxuICAgIHJlcGVhdEtleVN0YXJ0VGltZTogMCxcbiAgICBjdXJyZW50S2V5czogW10sXG4gICAgaGFzTW91c2U6IGZhbHNlLFxuICAgIGxhc3REb3VibGVDbGlja1RpbWU6IDAsXG4gICAgZHJhZ0VuZFRpbWU6IDAsXG4gICAgbGFzdFJlcGFpbnRUaW1lOiAwLFxuICAgIGN1cnJlbnRQYWludENvdW50OiAwLFxuICAgIGN1cnJlbnRGUFM6IDAsXG4gICAgbGFzdEZQU0NvbXB1dGVUaW1lOiAwLFxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBjYWxsYmFjayk7XG4gICAgfSxcblxuICAgIHN0b3BQYWludExvb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYWludExvb3BSdW5uaW5nID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHJlc3RhcnRQYWludExvb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocGFpbnRMb29wUnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IHJ1bm5pbmdcbiAgICAgICAgfVxuICAgICAgICBwYWludExvb3BSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhaW50TG9vcEZ1bmN0aW9uKTtcbiAgICB9LFxuXG4gICAgc3RvcFJlc2l6ZUxvb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNpemVMb29wUnVubmluZyA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICByZXN0YXJ0UmVzaXplTG9vcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChyZXNpemVMb29wUnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBhbHJlYWR5IHJ1bm5pbmdcbiAgICAgICAgfVxuICAgICAgICByZXNpemVMb29wUnVubmluZyA9IHRydWU7XG4gICAgICAgIHNldEludGVydmFsKHJlc2l6YWJsZXNMb29wRnVuY3Rpb24sIDIwMCk7XG4gICAgfSxcblxuICAgIGRldGFjaGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wUGFpbnRpbmcoKTtcbiAgICAgICAgdGhpcy5zdG9wUmVzaXppbmcoKTtcbiAgICB9LFxuXG4gICAgdXNlSGlEUEk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQucmVzb2x2ZVByb3BlcnR5KCd1c2VIaURQSScpO1xuICAgIH0sXG5cbiAgICB1c2VCaXRCbGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LnJlc29sdmVQcm9wZXJ0eSgndXNlQml0QmxpdCcpO1xuICAgIH0sXG5cbiAgICBnZXRGUFM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZnBzID0gdGhpcy5jb21wb25lbnQucmVzb2x2ZVByb3BlcnR5KCdyZXBhaW50SW50ZXJ2YWxSYXRlJyk7XG4gICAgICAgIHJldHVybiBmcHMgPyBwYXJzZUludChmcHMpIDogMDtcbiAgICB9LFxuXG4gICAgZ2V0RW5hYmxlQ29udGludW91c1JlcGFpbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LnJlc29sdmVQcm9wZXJ0eSgnZW5hYmxlQ29udGludW91c1JlcGFpbnQnKTtcbiAgICB9LFxuXG4gICAgZ2V0Q3VycmVudEZQUzpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRGUFM7XG4gICAgfSxcblxuXG4gICAgdGlja1BhaW50OiBmdW5jdGlvbihub3cpIHtcbiAgICAgICAgdmFyIGZwcyA9IHRoaXMuZ2V0RlBTKCk7XG4gICAgICAgIHZhciBpc0NvbnRpbnVvdXNSZXBhaW50ID0gdGhpcy5nZXRFbmFibGVDb250aW51b3VzUmVwYWludCgpO1xuICAgICAgICBpZiAoZnBzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGludGVydmFsID0gMTAwMCAvIGZwcztcblxuICAgICAgICB2YXIgZWxhcHNlZCA9IG5vdyAtIHRoaXMubGFzdFJlcGFpbnRUaW1lO1xuICAgICAgICBpZiAoZWxhcHNlZCA+IGludGVydmFsICYmIChpc0NvbnRpbnVvdXNSZXBhaW50IHx8IHRoaXMuZGlydHkpKSB7XG4gICAgICAgICAgICB0aGlzLnBhaW50Tm93KCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RSZXBhaW50VGltZSA9IG5vdztcbiAgICAgICAgICAgIC8qIC0gKGVsYXBzZWQgJSBpbnRlcnZhbCk7Ki9cbiAgICAgICAgICAgIGlmIChpc0NvbnRpbnVvdXNSZXBhaW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFpbnRDb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChub3cgLSB0aGlzLmxhc3RGUFNDb21wdXRlVGltZSA+PSAxMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEZQUyA9ICh0aGlzLmN1cnJlbnRQYWludENvdW50ICogMTAwMCkgLyAobm93IC0gdGhpcy5sYXN0RlBTQ29tcHV0ZVRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWludENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RlBTQ29tcHV0ZVRpbWUgPSBub3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJlZ2luUGFpbnRpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLnRpY2tQYWludGVyID0gZnVuY3Rpb24obm93KSB7XG4gICAgICAgICAgICBzZWxmLnRpY2tQYWludChub3cpO1xuICAgICAgICB9O1xuICAgICAgICBwYWludGFibGVzLnB1c2godGhpcyk7XG4gICAgfSxcblxuICAgIHN0b3BQYWludGluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhaW50YWJsZXMuc3BsaWNlKHBhaW50YWJsZXMuaW5kZXhPZih0aGlzKSwgMSk7XG4gICAgfSxcblxuICAgIGJlZ2luUmVzaXppbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMudGlja1Jlc2l6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuY2hlY2tzaXplKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlc2l6YWJsZXMucHVzaCh0aGlzKTtcbiAgICB9LFxuXG4gICAgc3RvcFJlc2l6aW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzaXphYmxlcy5zcGxpY2UocmVzaXphYmxlcy5pbmRleE9mKHRoaXMpLCAxKTtcbiAgICB9LFxuXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJlZ2luUGFpbnRpbmcoKTtcbiAgICAgICAgdGhpcy5iZWdpblJlc2l6aW5nKCk7XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0b3BQYWludGluZygpO1xuICAgICAgICB0aGlzLnN0b3BSZXNpemluZygpO1xuICAgIH0sXG5cbiAgICBjaGVja3NpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL3RoaXMgaXMgZXhwZW5zaXZlIGxldHMgZG8gaXQgYXQgc29tZSBtb2R1bG9cbiAgICAgICAgdmFyIHNpemVOb3cgPSB0aGlzLmRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKHNpemVOb3cud2lkdGggIT09IHRoaXMuc2l6ZS53aWR0aCB8fCBzaXplTm93LmhlaWdodCAhPT0gdGhpcy5zaXplLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5zaXplQ2hhbmdlZE5vdGlmaWNhdGlvbigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNpemVDaGFuZ2VkTm90aWZpY2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9LFxuXG4gICAgcmVzaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJveCA9IHRoaXMuc2l6ZSA9IHRoaXMuZGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSBib3gud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gYm94LmhlaWdodDtcblxuICAgICAgICAvL2ZpeCBhbGEgc2lyIHNwaW5rYSwgc2VlXG4gICAgICAgIC8vaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvY2FudmFzL2hpZHBpL1xuICAgICAgICAvL2p1c3QgYWRkICdoZHBpJyBhcyBhbiBhdHRyaWJ1dGUgdG8gdGhlIGZpbi1jYW52YXMgdGFnXG4gICAgICAgIHZhciByYXRpbyA9IDE7XG4gICAgICAgIHZhciB1c2VCaXRCbGl0ID0gdGhpcy51c2VCaXRCbGl0KCk7XG4gICAgICAgIHZhciBpc0hJRFBJID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gJiYgdGhpcy51c2VIaURQSSgpO1xuICAgICAgICBpZiAoaXNISURQSSkge1xuICAgICAgICAgICAgdmFyIGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgICAgICAgICAgdmFyIGJhY2tpbmdTdG9yZVJhdGlvID0gdGhpcy5jYW52YXNDVFgud2Via2l0QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ1RYLm1vekJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0NUWC5tc0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0NUWC5vQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ1RYLmJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHwgMTtcblxuICAgICAgICAgICAgcmF0aW8gPSBkZXZpY2VQaXhlbFJhdGlvIC8gYmFja2luZ1N0b3JlUmF0aW87XG4gICAgICAgICAgICAvL3RoaXMuY2FudmFzQ1RYLnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1ZmZlci53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aCAqIHJhdGlvO1xuICAgICAgICB0aGlzLmJ1ZmZlci5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodCAqIHJhdGlvO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gdGhpcy5idWZmZXIuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJ3B4JztcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5idWZmZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYnVmZmVyQ1RYLnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gICAgICAgIGlmIChpc0hJRFBJICYmICF1c2VCaXRCbGl0KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0NUWC5zY2FsZShyYXRpbywgcmF0aW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90aGlzLm9yaWdpbiA9IG5ldyByZWN0YW5ndWxhci5Qb2ludChNYXRoLnJvdW5kKHRoaXMuc2l6ZS5sZWZ0KSwgTWF0aC5yb3VuZCh0aGlzLnNpemUudG9wKSk7XG4gICAgICAgIHRoaXMuYm91bmRzID0gbmV3IHJlY3Rhbmd1bGFyLlJlY3RhbmdsZSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIC8vc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbXAgPSB0aGlzLmNvbXBvbmVudDtcbiAgICAgICAgaWYgKGNvbXApIHtcbiAgICAgICAgICAgIGNvbXAuc2V0Qm91bmRzKHRoaXMuYm91bmRzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2l6ZU5vdGlmaWNhdGlvbigpO1xuICAgICAgICB0aGlzLnBhaW50Tm93KCk7XG4gICAgICAgIC8vfSk7XG4gICAgfSxcblxuICAgIHJlc2l6ZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdG8gYmUgb3ZlcnJpZGRlblxuICAgIH0sXG5cbiAgICBnZXRCb3VuZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3VuZHM7XG4gICAgfSxcblxuICAgIHBhaW50Tm93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLnNhZmVQYWludEltbWVkaWF0ZWx5KGZ1bmN0aW9uKGdjKSB7XG4gICAgICAgICAgICBnYy5jbGVhclJlY3QoMCwgMCwgc2VsZi53aWR0aCwgc2VsZi5oZWlnaHQpO1xuXG4gICAgICAgICAgICB2YXIgY29tcCA9IHNlbGYuY29tcG9uZW50O1xuICAgICAgICAgICAgaWYgKGNvbXApIHtcbiAgICAgICAgICAgICAgICBjb21wLnBhaW50KGdjKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2FmZVBhaW50SW1tZWRpYXRlbHk6IGZ1bmN0aW9uKHBhaW50RnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIHVzZUJpdEJsaXQgPSB0aGlzLnVzZUJpdEJsaXQoKSxcbiAgICAgICAgICAgIGdjID0gdXNlQml0QmxpdCA/IHRoaXMuYnVmZmVyR0MgOiB0aGlzLmdjO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZ2Muc2F2ZSgpO1xuICAgICAgICAgICAgcGFpbnRGdW5jdGlvbihnYyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBnYy5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZUJpdEJsaXQpIHtcbiAgICAgICAgICAgIHRoaXMuZmx1c2hCdWZmZXIoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmbHVzaEJ1ZmZlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlci53aWR0aCA+IDAgJiYgdGhpcy5idWZmZXIuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDVFguZHJhd0ltYWdlKHRoaXMuYnVmZmVyLCAwLCAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkaXNwYXRjaE5ld0V2ZW50OiBmdW5jdGlvbihldmVudCwgbmFtZSwgZGV0YWlsKSB7XG4gICAgICAgIGRldGFpbCA9IHtcbiAgICAgICAgICAgIGRldGFpbDogZGV0YWlsIHx8IHt9XG4gICAgICAgIH07XG4gICAgICAgIGRldGFpbC5kZXRhaWwucHJpbWl0aXZlRXZlbnQgPSBldmVudDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KG5hbWUsIGRldGFpbCkpO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50OiBmdW5jdGlvbihldmVudCwgbmFtZSwgZGV0YWlsKSB7XG4gICAgICAgIGRldGFpbCA9IGRldGFpbCB8fCB7fTtcbiAgICAgICAgZGV0YWlsLm1vdXNlID0gdGhpcy5tb3VzZUxvY2F0aW9uO1xuICAgICAgICBkZXRhaWwua2V5cyA9IHRoaXMuY3VycmVudEtleXM7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoTmV3RXZlbnQoZXZlbnQsIG5hbWUsIGRldGFpbCk7XG4gICAgfSxcblxuICAgIGZpbm1vdXNlbW92ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZygpICYmIHRoaXMubW91c2Vkb3duKSB7XG4gICAgICAgICAgICB0aGlzLmJlRHJhZ2dpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdNb3VzZUtleXNFdmVudChlLCAnZmluLWNhbnZhcy1kcmFnc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgaXNSaWdodENsaWNrOiB0aGlzLmlzUmlnaHRDbGljayhlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRyYWdzdGFydCA9IG5ldyByZWN0YW5ndWxhci5Qb2ludCh0aGlzLm1vdXNlTG9jYXRpb24ueCwgdGhpcy5tb3VzZUxvY2F0aW9uLnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYWwoZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5tb3VzZUxvY2F0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtZHJhZycsIHtcbiAgICAgICAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZHJhZ3N0YXJ0LFxuICAgICAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvdW5kcy5jb250YWlucyh0aGlzLm1vdXNlTG9jYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtbW91c2Vtb3ZlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmlubW91c2Vkb3duOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IHRoaXMubW91c2VEb3duTG9jYXRpb24gPSB0aGlzLmdldExvY2FsKGUpO1xuICAgICAgICB0aGlzLm1vdXNlZG93biA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLW1vdXNlZG93bicsIHtcbiAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGFrZUZvY3VzKCk7XG4gICAgfSxcblxuICAgIGZpbm1vdXNldXA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtZHJhZ2VuZCcsIHtcbiAgICAgICAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZHJhZ3N0YXJ0LFxuICAgICAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5iZU5vdERyYWdnaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbmR0aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtbW91c2V1cCcsIHtcbiAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgfSk7XG4gICAgICAgIC8vdGhpcy5tb3VzZUxvY2F0aW9uID0gbmV3IHJlY3Rhbmd1bGFyLlBvaW50KC0xLCAtMSk7XG4gICAgfSxcblxuICAgIGZpbm1vdXNlb3V0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghdGhpcy5tb3VzZWRvd24pIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IG5ldyByZWN0YW5ndWxhci5Qb2ludCgtMSwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdNb3VzZUtleXNFdmVudChlLCAnZmluLWNhbnZhcy1tb3VzZW91dCcpO1xuICAgIH0sXG5cbiAgICBmaW53aGVlbG1vdmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcoKSB8fCAhdGhpcy5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtd2hlZWxtb3ZlZCcsIHtcbiAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGZpbmNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh0aGlzLmRvdWJsZUNsaWNrVGltZXIgJiYgRGF0ZS5ub3coKSAtIHRoaXMubGFzdENsaWNrVGltZSA8IHRoaXMuZG91YmxlQ2xpY2tEZWxheSkge1xuICAgICAgICAgICAgLy90aGlzIGlzIGEgZG91YmxlIGNsaWNrLi4uXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kb3VibGVDbGlja1RpbWVyKTsgLy8gcHJldmVudCBjbGljayBldmVudFxuICAgICAgICAgICAgdGhpcy5kb3VibGVDbGlja1RpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5maW5kYmxjbGljayhlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGFzdENsaWNrVGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZG91YmxlQ2xpY2tUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3VibGVDbGlja1RpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYWwoZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLWNsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICBpc1JpZ2h0Q2xpY2s6IHRoaXMuaXNSaWdodENsaWNrKGUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMuZG91YmxlQ2xpY2tEZWxheSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmluZGJsY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5tb3VzZUxvY2F0aW9uID0gdGhpcy5nZXRMb2NhbChlKTtcbiAgICAgICAgdGhpcy5sYXN0RG91YmxlQ2xpY2tUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLWRibGNsaWNrJywge1xuICAgICAgICAgICAgaXNSaWdodENsaWNrOiB0aGlzLmlzUmlnaHRDbGljayhlKVxuICAgICAgICB9KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGJsY2xpY2snLCB0aGlzLmN1cnJlbnRLZXlzKTtcbiAgICB9LFxuXG4gICAgZ2V0Q2hhck1hcDogZnVuY3Rpb24oKSB7IC8vVE9ETzogVGhpcyBpcyBzdGF0aWMuIE1ha2UgaXQgYSBwcm9wZXJ0eSBvZiB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgIHJldHVybiBjaGFyTWFwO1xuICAgIH0sXG5cbiAgICBmaW5rZXlkb3duOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL2UucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGtleUNoYXIgPSBlLnNoaWZ0S2V5ID8gY2hhck1hcFtlLmtleUNvZGVdWzFdIDogY2hhck1hcFtlLmtleUNvZGVdWzBdO1xuICAgICAgICBpZiAoZS5yZXBlYXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlcGVhdEtleSA9PT0ga2V5Q2hhcikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVwZWF0S2V5Q291bnQrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRLZXkgPSBrZXlDaGFyO1xuICAgICAgICAgICAgICAgIHRoaXMucmVwZWF0S2V5U3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0S2V5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0S2V5Q291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5yZXBlYXRLZXlTdGFydFRpbWUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRLZXlzLmluZGV4T2Yoa2V5Q2hhcikgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRLZXlzLnB1c2goa2V5Q2hhcik7XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhrZXlDaGFyLCBlLmtleUNvZGUpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3RXZlbnQoZSwgJ2Zpbi1jYW52YXMta2V5ZG93bicsIHtcbiAgICAgICAgICAgIGFsdDogZS5hbHRLZXksXG4gICAgICAgICAgICBjdHJsOiBlLmN0cmxLZXksXG4gICAgICAgICAgICBjaGFyOiBrZXlDaGFyLFxuICAgICAgICAgICAgY29kZTogZS5jaGFyQ29kZSxcbiAgICAgICAgICAgIGtleTogZS5rZXlDb2RlLFxuICAgICAgICAgICAgbWV0YTogZS5tZXRhS2V5LFxuICAgICAgICAgICAgcmVwZWF0Q291bnQ6IHRoaXMucmVwZWF0S2V5Q291bnQsXG4gICAgICAgICAgICByZXBlYXRTdGFydFRpbWU6IHRoaXMucmVwZWF0S2V5U3RhcnRUaW1lLFxuICAgICAgICAgICAgc2hpZnQ6IGUuc2hpZnRLZXksXG4gICAgICAgICAgICBpZGVudGlmaWVyOiBlLmtleSxcbiAgICAgICAgICAgIGN1cnJlbnRLZXlzOiB0aGlzLmN1cnJlbnRLZXlzLnNsaWNlKDApXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBmaW5rZXl1cDogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIga2V5Q2hhciA9IGUuc2hpZnRLZXkgPyBjaGFyTWFwW2Uua2V5Q29kZV1bMV0gOiBjaGFyTWFwW2Uua2V5Q29kZV1bMF07XG4gICAgICAgIHRoaXMuY3VycmVudEtleXMuc3BsaWNlKHRoaXMuY3VycmVudEtleXMuaW5kZXhPZihrZXlDaGFyKSwgMSk7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXBlYXRLZXlDb3VudCA9IDA7XG4gICAgICAgIHRoaXMucmVwZWF0S2V5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZXBlYXRLZXlTdGFydFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3RXZlbnQoZSwgJ2Zpbi1jYW52YXMta2V5dXAnLCB7XG4gICAgICAgICAgICBhbHQ6IGUuYWx0S2V5LFxuICAgICAgICAgICAgY3RybDogZS5jdHJsS2V5LFxuICAgICAgICAgICAgY2hhcjoga2V5Q2hhcixcbiAgICAgICAgICAgIGNvZGU6IGUuY2hhckNvZGUsXG4gICAgICAgICAgICBrZXk6IGUua2V5Q29kZSxcbiAgICAgICAgICAgIG1ldGE6IGUubWV0YUtleSxcbiAgICAgICAgICAgIHJlcGVhdDogZS5yZXBlYXQsXG4gICAgICAgICAgICBzaGlmdDogZS5zaGlmdEtleSxcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IGUua2V5LFxuICAgICAgICAgICAgY3VycmVudEtleXM6IHRoaXMuY3VycmVudEtleXMuc2xpY2UoMClcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGZpbmZvY3VzZ2FpbmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdFdmVudChlLCAnZmluLWNhbnZhcy1mb2N1cy1nYWluZWQnKTtcbiAgICB9LFxuXG4gICAgZmluZm9jdXNsb3N0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdFdmVudChlLCAnZmluLWNhbnZhcy1mb2N1cy1sb3N0Jyk7XG4gICAgfSxcblxuICAgIGZpbmNvbnRleHRtZW51OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgdGhpcy5jdXJyZW50S2V5cy5pbmRleE9mKCdDVFJMJykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRLZXlzLnB1c2goJ0NUUkwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kb3VibGVSaWdodENsaWNrVGltZXIgJiYgRGF0ZS5ub3coKSAtIHRoaXMubGFzdENsaWNrVGltZSA8IHRoaXMuZG91YmxlQ2xpY2tEZWxheSkge1xuICAgICAgICAgICAgLy90aGlzIGlzIGEgZG91YmxlIGNsaWNrLi4uXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kb3VibGVSaWdodENsaWNrVGltZXIpOyAvLyBwcmV2ZW50IGNvbnRleHQgbWVudSBldmVudFxuICAgICAgICAgICAgdGhpcy5kb3VibGVSaWdodENsaWNrVGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmZpbmRibGNsaWNrKGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYXN0Q2xpY2tUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgdGhpcy5kb3VibGVSaWdodENsaWNrVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG91YmxlUmlnaHRDbGlja1RpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdNb3VzZUtleXNFdmVudChlLCAnZmluLWNhbnZhcy1jb250ZXh0LW1lbnUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5kb3VibGVDbGlja0RlbGF5KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXBhaW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZwcyA9IHRoaXMuZ2V0RlBTKCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICBpZiAoIXBhaW50TG9vcFJ1bm5pbmcgfHwgZnBzID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhaW50Tm93KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0TW91c2VMb2NhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdXNlTG9jYXRpb247XG4gICAgfSxcblxuICAgIGdldE9yaWdpbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBwID0gbmV3IHJlY3Rhbmd1bGFyLlBvaW50KHJlY3QubGVmdCwgcmVjdC50b3ApO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9LFxuXG4gICAgZ2V0TG9jYWw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHAgPSBuZXcgcmVjdGFuZ3VsYXIuUG9pbnQoZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH0sXG5cbiAgICBoYXNGb2N1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLmNhbnZhcztcbiAgICB9LFxuXG4gICAgdGFrZUZvY3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuaGFzRm9jdXMoKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNhbnZhcy5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJlRHJhZ2dpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kaXNhYmxlRG9jdW1lbnRFbGVtZW50U2VsZWN0aW9uKCk7XG4gICAgfSxcblxuICAgIGJlTm90RHJhZ2dpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5hYmxlRG9jdW1lbnRFbGVtZW50U2VsZWN0aW9uKCk7XG4gICAgfSxcblxuICAgIGlzRHJhZ2dpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcmFnZ2luZztcbiAgICB9LFxuXG4gICAgZGlzYWJsZURvY3VtZW50RWxlbWVudFNlbGVjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmJvZHkuc3R5bGU7XG4gICAgICAgIHN0eWxlLmNzc1RleHQgPSBzdHlsZS5jc3NUZXh0ICsgJy13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmUnO1xuICAgIH0sXG5cbiAgICBlbmFibGVEb2N1bWVudEVsZW1lbnRTZWxlY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5ib2R5LnN0eWxlO1xuICAgICAgICBzdHlsZS5jc3NUZXh0ID0gc3R5bGUuY3NzVGV4dC5yZXBsYWNlKCctd2Via2l0LXVzZXItc2VsZWN0OiBub25lJywgJycpO1xuICAgIH0sXG5cbiAgICBzZXRGb2N1c2FibGU6IGZ1bmN0aW9uKHRydXRoeSkge1xuICAgICAgICB0aGlzLmZvY3VzZXIuc3R5bGUuZGlzcGxheSA9IHRydXRoeSA/ICcnIDogJ25vbmUnO1xuICAgIH0sXG5cbiAgICBpc1JpZ2h0Q2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGlzUmlnaHRNQjtcbiAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG4gICAgICAgIGlmICgnd2hpY2gnIGluIGUpIHsgLy8gR2Vja28gKEZpcmVmb3gpLCBXZWJLaXQgKFNhZmFyaS9DaHJvbWUpICYgT3BlcmFcbiAgICAgICAgICAgIGlzUmlnaHRNQiA9IGUud2hpY2ggPT09IDM7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2J1dHRvbicgaW4gZSkgeyAvLyBJRSwgT3BlcmFcbiAgICAgICAgICAgIGlzUmlnaHRNQiA9IGUuYnV0dG9uID09PSAyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1JpZ2h0TUI7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gcGFpbnRMb29wRnVuY3Rpb24obm93KSB7XG4gICAgaWYgKCFwYWludExvb3BSdW5uaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWludGFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYWludGFibGVzW2ldLnRpY2tQYWludGVyKG5vdyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhaW50TG9vcEZ1bmN0aW9uKTtcbn1cbnJlcXVlc3RBbmltYXRpb25GcmFtZShwYWludExvb3BGdW5jdGlvbik7XG5cbmZ1bmN0aW9uIHJlc2l6YWJsZXNMb29wRnVuY3Rpb24obm93KSB7XG4gICAgaWYgKCFyZXNpemVMb29wUnVubmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzaXphYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzaXphYmxlc1tpXS50aWNrUmVzaXplcihub3cpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuc2V0SW50ZXJ2YWwocmVzaXphYmxlc0xvb3BGdW5jdGlvbiwgUkVTSVpFX1BPTExJTkdfSU5URVJWQUwpO1xuXG5mdW5jdGlvbiBtYWtlQ2hhck1hcCgpIHtcbiAgICB2YXIgbWFwID0gW107XG5cbiAgICB2YXIgZW1wdHkgPSBbJycsICcnXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAgbWFwW2ldID0gZW1wdHk7XG4gICAgfVxuXG4gICAgbWFwWzI3XSA9IFsnRVNDJywgJ0VTQ1NISUZUJ107XG4gICAgbWFwWzE5Ml0gPSBbJ2AnLCAnfiddO1xuICAgIG1hcFs0OV0gPSBbJzEnLCAnISddO1xuICAgIG1hcFs1MF0gPSBbJzInLCAnQCddO1xuICAgIG1hcFs1MV0gPSBbJzMnLCAnIyddO1xuICAgIG1hcFs1Ml0gPSBbJzQnLCAnJCddO1xuICAgIG1hcFs1M10gPSBbJzUnLCAnJSddO1xuICAgIG1hcFs1NF0gPSBbJzYnLCAnXiddO1xuICAgIG1hcFs1NV0gPSBbJzcnLCAnJiddO1xuICAgIG1hcFs1Nl0gPSBbJzgnLCAnKiddO1xuICAgIG1hcFs1N10gPSBbJzknLCAnKCddO1xuICAgIG1hcFs0OF0gPSBbJzAnLCAnKSddO1xuICAgIG1hcFsxODldID0gWyctJywgJ18nXTtcbiAgICBtYXBbMTg3XSA9IFsnPScsICcrJ107XG4gICAgbWFwWzhdID0gWydCQUNLU1BBQ0UnLCAnQkFDS1NQQUNFU0hJRlQnXTtcbiAgICBtYXBbNDZdID0gWydERUxFVEUnLCAnREVMRVRFU0hJRlQnXTtcbiAgICBtYXBbOV0gPSBbJ1RBQicsICdUQUJTSElGVCddO1xuICAgIG1hcFs4MV0gPSBbJ3EnLCAnUSddO1xuICAgIG1hcFs4N10gPSBbJ3cnLCAnVyddO1xuICAgIG1hcFs2OV0gPSBbJ2UnLCAnRSddO1xuICAgIG1hcFs4Ml0gPSBbJ3InLCAnUiddO1xuICAgIG1hcFs4NF0gPSBbJ3QnLCAnVCddO1xuICAgIG1hcFs4OV0gPSBbJ3knLCAnWSddO1xuICAgIG1hcFs4NV0gPSBbJ3UnLCAnVSddO1xuICAgIG1hcFs3M10gPSBbJ2knLCAnSSddO1xuICAgIG1hcFs3OV0gPSBbJ28nLCAnTyddO1xuICAgIG1hcFs4MF0gPSBbJ3AnLCAnUCddO1xuICAgIG1hcFsyMTldID0gWydbJywgJ3snXTtcbiAgICBtYXBbMjIxXSA9IFsnXScsICd9J107XG4gICAgbWFwWzIyMF0gPSBbJ1xcXFwnLCAnfCddO1xuICAgIG1hcFsyMjBdID0gWydDQVBTTE9DSycsICdDQVBTTE9DS1NISUZUJ107XG4gICAgbWFwWzY1XSA9IFsnYScsICdBJ107XG4gICAgbWFwWzgzXSA9IFsncycsICdTJ107XG4gICAgbWFwWzY4XSA9IFsnZCcsICdEJ107XG4gICAgbWFwWzcwXSA9IFsnZicsICdGJ107XG4gICAgbWFwWzcxXSA9IFsnZycsICdHJ107XG4gICAgbWFwWzcyXSA9IFsnaCcsICdIJ107XG4gICAgbWFwWzc0XSA9IFsnaicsICdKJ107XG4gICAgbWFwWzc1XSA9IFsnaycsICdLJ107XG4gICAgbWFwWzc2XSA9IFsnbCcsICdMJ107XG4gICAgbWFwWzE4Nl0gPSBbJzsnLCAnOiddO1xuICAgIG1hcFsyMjJdID0gWydcXCcnLCAnfCddO1xuICAgIG1hcFsxM10gPSBbJ1JFVFVSTicsICdSRVRVUk5TSElGVCddO1xuICAgIG1hcFsxNl0gPSBbJ1NISUZUJywgJ1NISUZUJ107XG4gICAgbWFwWzkwXSA9IFsneicsICdaJ107XG4gICAgbWFwWzg4XSA9IFsneCcsICdYJ107XG4gICAgbWFwWzY3XSA9IFsnYycsICdDJ107XG4gICAgbWFwWzg2XSA9IFsndicsICdWJ107XG4gICAgbWFwWzY2XSA9IFsnYicsICdCJ107XG4gICAgbWFwWzc4XSA9IFsnbicsICdOJ107XG4gICAgbWFwWzc3XSA9IFsnbScsICdNJ107XG4gICAgbWFwWzE4OF0gPSBbJywnLCAnPCddO1xuICAgIG1hcFsxOTBdID0gWycuJywgJz4nXTtcbiAgICBtYXBbMTkxXSA9IFsnLycsICc/J107XG4gICAgbWFwWzE2XSA9IFsnU0hJRlQnLCAnU0hJRlQnXTtcbiAgICBtYXBbMTddID0gWydDVFJMJywgJ0NUUkxTSElGVCddO1xuICAgIG1hcFsxOF0gPSBbJ0FMVCcsICdBTFRTSElGVCddO1xuICAgIG1hcFs5MV0gPSBbJ0NPTU1BTkRMRUZUJywgJ0NPTU1BTkRMRUZUU0hJRlQnXTtcbiAgICBtYXBbMzJdID0gWydTUEFDRScsICdTUEFDRVNISUZUJ107XG4gICAgbWFwWzkzXSA9IFsnQ09NTUFORFJJR0hUJywgJ0NPTU1BTkRSSUdIVFNISUZUJ107XG4gICAgbWFwWzE4XSA9IFsnQUxUJywgJ0FMVFNISUZUJ107XG4gICAgbWFwWzM4XSA9IFsnVVAnLCAnVVBTSElGVCddO1xuICAgIG1hcFszN10gPSBbJ0xFRlQnLCAnTEVGVFNISUZUJ107XG4gICAgbWFwWzQwXSA9IFsnRE9XTicsICdET1dOU0hJRlQnXTtcbiAgICBtYXBbMzldID0gWydSSUdIVCcsICdSSUdIVFNISUZUJ107XG5cbiAgICBtYXBbMzNdID0gWydQQUdFVVAnLCAnUEFHRVVQU0hJRlQnXTtcbiAgICBtYXBbMzRdID0gWydQQUdFRE9XTicsICdQQUdFRE9XTlNISUZUJ107XG4gICAgbWFwWzM1XSA9IFsnUEFHRVJJR0hUJywgJ1BBR0VSSUdIVFNISUZUJ107IC8vIEVORFxuICAgIG1hcFszNl0gPSBbJ1BBR0VMRUZUJywgJ1BBR0VMRUZUU0hJRlQnXTsgLy8gSE9NRVxuXG4gICAgbWFwWzExMl0gPSBbJ0YxJywgJ0YxU0hJRlQnXTtcbiAgICBtYXBbMTEzXSA9IFsnRjInLCAnRjJTSElGVCddO1xuICAgIG1hcFsxMTRdID0gWydGMycsICdGM1NISUZUJ107XG4gICAgbWFwWzExNV0gPSBbJ0Y0JywgJ0Y0U0hJRlQnXTtcbiAgICBtYXBbMTE2XSA9IFsnRjUnLCAnRjVTSElGVCddO1xuICAgIG1hcFsxMTddID0gWydGNicsICdGNlNISUZUJ107XG4gICAgbWFwWzExOF0gPSBbJ0Y3JywgJ0Y3U0hJRlQnXTtcbiAgICBtYXBbMTE5XSA9IFsnRjgnLCAnRjhTSElGVCddO1xuICAgIG1hcFsxMjBdID0gWydGOScsICdGOVNISUZUJ107XG4gICAgbWFwWzEyMV0gPSBbJ0YxMCcsICdGMTBTSElGVCddO1xuICAgIG1hcFsxMjJdID0gWydGMTEnLCAnRjFTMUhJRlQnXTtcbiAgICBtYXBbMTIzXSA9IFsnRjEyJywgJ0YxMjFISUZUJ107XG5cbiAgICByZXR1cm4gbWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbnZhczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjb25zb2xlTG9nZ2VyID0gcmVxdWlyZSgnLi9nYy1jb25zb2xlLWxvZ2dlcicpO1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIGdjIC0gVGhlIDItRCBncmFwaGljcyBjb250ZXh0IGZyb20geW91ciBjYW52YXNcbiAqIEBwYXJhbSB7Ym9vbGVhbnxhcGlMb2dnZXJ9IFtsb2dnZXI9dHJ1ZV1cbiAqICogYHRydWVgIHVzZXMgYGdjLWNvbnNvbGUtbG9nZ2VyYCBmdW5jdGlvbiBib3VuZCB0byAnZ2MuJyBhcyBwcmVmaXhcbiAqICogc3RyaW5nIHVzZXMgYGdjLWNvbnNvbGUtbG9nZ2VyYCBmdW5jdGlvbiBib3VuZCB0byBzdHJpbmdcbiAqICogZnVuY3Rpb24gdXNlZCBhcyBpc1xuICovXG5mdW5jdGlvbiBHcmFwaGljc0NvbnRleHQoZ2MsIGxvZ2dlcikge1xuICAgIHRoaXMuZ2MgPSBnYztcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmVXRUJLSVQgPSAvXndlYmtpdC87XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBsb2dnZXIpIHtcblxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgbG9nZ2VyID0gIGNvbnNvbGVMb2dnZXIuYmluZCh1bmRlZmluZWQsIGxvZ2dlciArICcuJyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIGlmIChsb2dnZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIgPSBjb25zb2xlTG9nZ2VyLmJpbmQodW5kZWZpbmVkLCAnZ2MuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICBpZiAobG9nZ2VyLmxlbmd0aCAhPT0gMykge1xuICAgICAgICAgICAgICAgIHRocm93ICdHcmFwaGljc0NvbnRleHQ6IFVzZXItc3VwcGxpZWQgQVBJIGxvZ2dlciBmdW5jdGlvbiBkb2VzIG5vdCBhY2NlcHQgdGhyZWUgcGFyYW1ldGVycy4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGxvZ2dlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFN0dWIgb3V0IGFsbCB0aGUgcHJvdG90eXBlIG1lbWJlcnMgb2YgdGhlIGNhbnZhcyAyRCBncmFwaGljcyBjb250ZXh0OlxuICAgIE9iamVjdC5rZXlzKE9iamVjdC5nZXRQcm90b3R5cGVPZihnYykpLmZvckVhY2goTWFrZVN0dWIpO1xuXG4gICAgLy8gU29tZSBvbGRlciBicm93c2VycyAoZS5nLiwgQ2hyb21lIDQwKSBkaWQgbm90IGhhdmUgYWxsIG1lbWJlcnMgb2YgY2FudmFzXG4gICAgLy8gMkQgZ3JhcGhpY3MgY29udGV4dCBpbiB0aGUgcHJvdG90eXBlIHNvIHdlIG1ha2UgdGhpcyBhZGRpdGlvbmFsIGNhbGw6XG4gICAgT2JqZWN0LmtleXMoZ2MpLmZvckVhY2goTWFrZVN0dWIpO1xuXG4gICAgZnVuY3Rpb24gTWFrZVN0dWIoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgaW4gR3JhcGhpY3NDb250ZXh0LnByb3RvdHlwZSB8fCByZVdFQktJVC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGdjW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHNlbGZba2V5XSA9ICFsb2dnZXIgPyBnY1trZXldLmJpbmQoZ2MpIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvZ2dlcihrZXksIGFyZ3VtZW50cywgZ2Nba2V5XS5hcHBseShnYywgYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGtleSwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBnY1trZXldO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9nZ2VyID8gbG9nZ2VyKGtleSwgJ2dldHRlcicsIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGdjW2tleV0gPSBsb2dnZXIgPyBsb2dnZXIoa2V5LCAnc2V0dGVyJywgdmFsdWUpIDogdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NDb250ZXh0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgWUlFTERTID0gJ1xcdTI3RjknOyAvLyBMT05HIFJJR0hUV0FSRFMgRE9VQkxFIEFSUk9XXG5cbmZ1bmN0aW9uIGNvbnNvbGVMb2dnZXIocHJlZml4LCBuYW1lLCBhcmdzLCB2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSB2YWx1ZTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3VsdCA9ICdcIicgKyByZXN1bHQgKyAnXCInO1xuICAgIH1cblxuICAgIG5hbWUgPSBwcmVmaXggKyBuYW1lO1xuXG4gICAgc3dpdGNoIChhcmdzKSB7XG4gICAgICAgIGNhc2UgJ2dldHRlcic6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lLCAnPScsIHJlc3VsdCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdzZXR0ZXInOlxuICAgICAgICAgICAgY29uc29sZS5sb2cobmFtZSwgWUlFTERTLCByZXN1bHQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDogLy8gbWV0aG9kIGNhbGxcbiAgICAgICAgICAgIG5hbWUgKz0gJygnICsgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncykuam9pbignLCAnKSArICcpJztcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lLCBZSUVMRFMsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnNvbGVMb2dnZXI7XG4iXX0=
