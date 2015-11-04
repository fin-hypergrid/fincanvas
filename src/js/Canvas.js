/*global requestAnimationFrame, document, CustomEvent, window */

'use strict';

var gestures = require('../libs/polymergestures.dev.js');
var GraphicsContext = require('./GraphicsContext.js');
var rectangles = require('rectangular');

var paintables = [];
var resizables = [];
var paintLoopRunning = true;
var resizeLoopRunning = true;

var paintLoopFunction = function(now) {
    if (!paintLoopRunning) {
        return;
    }
    for (var i = 0; i < paintables.length; i++) {
        try {
            paintables[i](now);
        } catch (e) {
            console.error(e);
        }
    }
    requestAnimationFrame(paintLoopFunction);
};
requestAnimationFrame(paintLoopFunction);


var resizablesLoopFunction = function(now) {
    if (!resizeLoopRunning) {
        return;
    }
    for (var i = 0; i < resizables.length; i++) {
        try {
            resizables[i](now);
        } catch (e) {
            console.error(e);
        }
    }
};
setInterval(resizablesLoopFunction, 200);

var charMap = [];
var empty = ['', ''];
for (var i = 0; i < 256; i++) {
    charMap[i] = empty;
}

charMap[27] = ['ESC', 'ESCSHIFT'];
charMap[192] = ['`', '~'];
charMap[49] = ['1', '!'];
charMap[50] = ['2', '@'];
charMap[51] = ['3', '#'];
charMap[52] = ['4', '$'];
charMap[53] = ['5', '%'];
charMap[54] = ['6', '^'];
charMap[55] = ['7', '&'];
charMap[56] = ['8', '*'];
charMap[57] = ['9', '('];
charMap[48] = ['0', ')'];
charMap[189] = ['-', '_'];
charMap[187] = ['=', '+'];
charMap[8] = ['DELETE', 'DELETESHIFT'];
charMap[9] = ['TAB', 'TABSHIFT'];
charMap[81] = ['q', 'Q'];
charMap[87] = ['w', 'W'];
charMap[69] = ['e', 'E'];
charMap[82] = ['r', 'R'];
charMap[84] = ['t', 'T'];
charMap[89] = ['y', 'Y'];
charMap[85] = ['u', 'U'];
charMap[73] = ['i', 'I'];
charMap[79] = ['o', 'O'];
charMap[80] = ['p', 'P'];
charMap[219] = ['[', '{'];
charMap[221] = [']', '}'];
charMap[220] = ['\\', '|'];
charMap[220] = ['CAPSLOCK', 'CAPSLOCKSHIFT'];
charMap[65] = ['a', 'A'];
charMap[83] = ['s', 'S'];
charMap[68] = ['d', 'D'];
charMap[70] = ['f', 'F'];
charMap[71] = ['g', 'G'];
charMap[72] = ['h', 'H'];
charMap[74] = ['j', 'J'];
charMap[75] = ['k', 'K'];
charMap[76] = ['l', 'L'];
charMap[186] = [';', ':'];
charMap[222] = ['\'', '|'];
charMap[13] = ['RETURN', 'RETURNSHIFT'];
charMap[16] = ['SHIFT', 'SHIFT'];
charMap[90] = ['z', 'Z'];
charMap[88] = ['x', 'X'];
charMap[67] = ['c', 'C'];
charMap[86] = ['v', 'V'];
charMap[66] = ['b', 'B'];
charMap[78] = ['n', 'N'];
charMap[77] = ['m', 'M'];
charMap[188] = [',', '<'];
charMap[190] = ['.', '>'];
charMap[191] = ['/', '?'];
charMap[16] = ['SHIFT', 'SHIFT'];
charMap[17] = ['CTRL', 'CTRLSHIFT'];
charMap[18] = ['ALT', 'ALTSHIFT'];
charMap[91] = ['COMMANDLEFT', 'COMMANDLEFTSHIFT'];
charMap[32] = ['SPACE', 'SPACESHIFT'];
charMap[93] = ['COMMANDRIGHT', 'COMMANDRIGHTSHIFT'];
charMap[18] = ['ALT', 'ALTSHIFT'];
charMap[38] = ['UP', 'UPSHIFT'];
charMap[37] = ['LEFT', 'LEFTSHIFT'];
charMap[40] = ['DOWN', 'DOWNSHIFT'];
charMap[39] = ['RIGHT', 'RIGHTSHIFT'];

charMap[33] = ['PAGEUP', 'PAGEUPSHIFT'];
charMap[34] = ['PAGEDOWN', 'PAGEDOWNSHIFT'];
charMap[35] = ['PAGERIGHT', 'PAGERIGHTSHIFT'];
charMap[36] = ['PAGELEFT', 'PAGELEFTSHIFT'];

function Canvas(div, component) {
    this.div = div;
    this.component = component;
    this.initialize();
}

Canvas.prototype = {};
Canvas.prototype.constructor = Canvas;

Canvas.prototype.g = null;

Canvas.prototype.div = null;

Canvas.prototype.canvas = null;

Canvas.prototype.canvasCTX = null;

Canvas.prototype.focuser = null;

Canvas.prototype.buffer = null;

Canvas.prototype.ctx = null;

Canvas.prototype.mouseLocation = null;

Canvas.prototype.holdPulseCount = -1;

Canvas.prototype.dragstart = null;

Canvas.prototype.origin = null;

Canvas.prototype.bounds = null;

Canvas.prototype.repaintNow = false;

Canvas.prototype.size = null;

Canvas.prototype.mousedown = false;

Canvas.prototype.dragging = false;

Canvas.prototype.repeatKeyCount = 0;

Canvas.prototype.repeatKey = null;

Canvas.prototype.repeatKeyStartTime = 0;

Canvas.prototype.currentKeys = [];

Canvas.prototype.hasMouse = false;

Canvas.prototype.lastDoubleClickTime = 0;
Canvas.prototype.dragEndTime = 0;

Canvas.prototype.initialize = function() {

    var self = this;
    this.dragEndtime = Date.now();
    this.g = rectangles;

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

    this.mouseLocation = new this.g.Point(-1, -1);
    this.dragstart = new this.g.Point(-1, -1);
    //this.origin = new this.g.Point(0, 0);
    this.bounds = new this.g.Rectangle(0, 0, 0, 0);
    this.hasMouse = false;

    this.canvas.onmouseover = function() {
        self.hasMouse = true;
    };

    document.addEventListener('mousemove', function(e) {
        if (!self.hasMouse && !self.isDragging()) {
            return;
        }
        self.finmousemove(e);
    });
    document.addEventListener('mouseup', function(e) {
        self.finmouseup(e);
    });
    document.addEventListener('wheel', function(e) {
        self.finwheelmoved(e);
    });

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
    document.addEventListener('keydown', function(e) {
        self.finkeydown(e);
    });
    document.addEventListener('keyup', function(e) {
        self.finkeyup(e);
    });
    this.canvas.addEventListener('click', function(e) {
        self.finclick(e);
    });

    gestures.addEventListener(this.canvas, 'tap', function(e) {
        self.fintap(e);
    });

    gestures.addEventListener(this.canvas, 'holdpulse', function(e) {
        self.finholdpulse(e);
    });

    gestures.addEventListener(this.canvas, 'flick', function(e) {
        self.finflick(e);
    });

    gestures.addEventListener(this.canvas, 'release', function(e) {
        self.finrelease(e);
    });

    gestures.addEventListener(this.canvas, 'trackstart', function(e) {
        self.fintrackstart(e);
    });

    gestures.addEventListener(this.canvas, 'track', function(e) {
        self.fintrack(e);
    });

    gestures.addEventListener(this.canvas, 'trackend', function(e) {
        self.fintrackend(e);
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

};

Canvas.prototype.addEventListener = function(name, callback) {
    this.canvas.addEventListener(name, callback);
};

Canvas.prototype.stopPaintThread = function() {
    paintLoopRunning = false;
};

Canvas.prototype.restartPaintThread = function() {
    if (paintLoopRunning) {
        return; // already running
    }
    paintLoopRunning = true;
    requestAnimationFrame(paintLoopFunction);
};

Canvas.prototype.stopResizeThread = function() {
    resizeLoopRunning = false;
};

Canvas.prototype.restartResizeThread = function() {
    if (resizeLoopRunning) {
        return; // already running
    }
    resizeLoopRunning = true;
    setInterval(resizablesLoopFunction, 200);
};

Canvas.prototype.detached = function() {
    this.stopPainting();
    this.stopResizing();
};

Canvas.prototype.isHiDPI = function() {
    return this.canvas.getAttribute('hidpi') !== null;
};

Canvas.prototype.useBitBlit = function() {
    return this.canvas.getAttribute('bitblit') !== 'false';
};

Canvas.prototype.getFPS = function() {
    var fps = this.canvas.getAttribute('fps');
    if (fps === 0 || !fps) {
        fps = 0;
    }
    fps = parseInt(fps);
    return fps;

};

Canvas.prototype.getComponent = function() {
    var comp = this.component;
    return comp;
};

Canvas.prototype.tickPaint = function(now) {
    var fps = this.getFPS();
    if (fps === 0) {
        return;
    }
    var interval = 1000 / fps;
    var lastRepaintTime = 0;

    var delta = now - lastRepaintTime;
    if (delta > interval && this.repaintNow) {
        lastRepaintTime = now - (delta % interval);
        this.paintNow();
    }
};

Canvas.prototype.beginPainting = function() {
    var self = this;
    this.repaintNow = true;
    this.tickPainter = function(now) {
        self.tickPaint(now);
    };
    paintables.push(this.tickPainter);
};

Canvas.prototype.stopPainting = function() {
    paintables.splice(paintables.indexOf(this.tickPainter), 1);
};

Canvas.prototype.beginResizing = function() {
    var self = this;
    this.tickResizer = function() {
        self.checksize();
    };
    resizables.push(this.tickResizer);
};

Canvas.prototype.stopResizing = function() {
    resizables.splice(resizables.indexOf(this.tickResizer), 1);
};

Canvas.prototype.checksize = function() {

    //this is expensize lets do it at some modulo
    var sizeNow = this.div.getBoundingClientRect();
    if (sizeNow.width !== this.size.width || sizeNow.height !== this.size.height) {
        this.sizeChangedNotification();
    }
};

Canvas.prototype.sizeChangedNotification = function() {
    this.resize();
};

Canvas.prototype.resize = function() {
    this.size = this.div.getBoundingClientRect();

    this.canvas.width = this.div.clientWidth;
    this.canvas.height = this.div.clientHeight;

    this.buffer.width = this.div.clientWidth;
    this.buffer.height = this.div.clientHeight;

    //fix ala sir spinka, see
    //http://www.html5rocks.com/en/tutorials/canvas/hidpi/
    //just add 'hdpi' as an attribute to the fin-canvas tag
    var ratio = 1;
    var useBitBlit = this.useBitBlit();
    var isHIDPI = window.devicePixelRatio && this.isHiDPI();
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
    var width = this.canvas.getAttribute('width');
    var height = this.canvas.getAttribute('height');
    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;
    this.buffer.width = width * ratio;
    this.buffer.height = height * ratio;

    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.buffer.style.width = width + 'px';
    this.buffer.style.height = height + 'px';

    this.bufferCTX.scale(ratio, ratio);
    if (isHIDPI && !useBitBlit) {
        this.canvasCTX.scale(ratio, ratio);
    }

    //this.origin = new this.g.Point(Math.round(this.size.left), Math.round(this.size.top));
    this.bounds = new this.g.Rectangle(0, 0, this.size.width, this.size.height);
    //setTimeout(function() {
    var comp = this.getComponent();
    if (comp) {
        comp.setBounds(this.bounds);
    }
    this.resizeNotification();
    this.paintNow();
    //});
};

Canvas.prototype.resizeNotification = function() {
    //to be overridden
};

Canvas.prototype.getBounds = function() {
    return this.bounds;
};

Canvas.prototype.paintNow = function() {
    var self = this;
    this.safePaintImmediately(function(gc) {
        gc.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.paint(gc);
        self.repaintNow = false;
    });
};

Canvas.prototype.safePaintImmediately = function(paintFunction) {
    var useBitBlit = this.useBitBlit();
    var gc = useBitBlit ? this.bufferCTX : this.canvasCTX;
    try {
        gc.save();
        paintFunction(gc);
    } finally {
        gc.restore();
    }
    if (useBitBlit) {
        this.flushBuffer();
    }
};

Canvas.prototype.flushBuffer = function() {
    if (this.buffer.width > 0 && this.buffer.height > 0) {
        this.canvasCTX.drawImage(this.buffer, 0, 0);
    }
};

Canvas.prototype.paint = function(gc) {
    var comp = this.getComponent();
    if (comp) {
        comp._paint(gc);
    }
};

Canvas.prototype.finmousemove = function(e) {
    if (!this.isDragging() && this.mousedown) {
        this.beDragging();
        this.canvas.dispatchEvent(new CustomEvent('fin-canvas-dragstart', {
            detail: {
                primitiveEvent: e,
                mouse: this.mouseLocation,
                keys: this.currentKeys,
                isRightClick: this.isRightClick(e)
            }
        }));
        this.dragstart = new this.g.Point(this.mouseLocation.x, this.mouseLocation.y);
    }
    this.mouseLocation = this.getLocal(e);
    if (this.isDragging()) {
        this.canvas.dispatchEvent(new CustomEvent('fin-canvas-drag', {
            detail: {
                primitiveEvent: e,
                mouse: this.mouseLocation,
                dragstart: this.dragstart,
                keys: this.currentKeys,
                isRightClick: this.isRightClick(e)
            }
        }));
    }
    if (this.bounds.contains(this.mouseLocation)) {
        this.canvas.dispatchEvent(new CustomEvent('fin-canvas-mousemove', {
            detail: {
                primitiveEvent: e,
                mouse: this.mouseLocation,
                keys: this.currentKeys
            }
        }));
    }
};

Canvas.prototype.finmousedown = function(e) {

    this.mouseLocation = this.getLocal(e);
    this.mousedown = true;

    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-mousedown', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            isRightClick: this.isRightClick(e)
        }
    }));
    this.takeFocus();

};

Canvas.prototype.finmouseup = function(e) {
    if (this.isDragging()) {
        this.canvas.dispatchEvent(new CustomEvent('fin-canvas-dragend', {
            detail: {
                primitiveEvent: e,
                mouse: this.mouseLocation,
                dragstart: this.dragstart,
                keys: this.currentKeys,
                isRightClick: this.isRightClick(e)
            }
        }));
        this.beNotDragging();
        this.dragEndtime = Date.now();
    }
    this.mousedown = false;
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-mouseup', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            isRightClick: this.isRightClick(e)
        }
    }));
    //this.mouseLocation = new this.g.Point(-1, -1);
};

Canvas.prototype.finmouseout = function(e) {
    if (!this.mousedown) {
        this.mouseLocation = new this.g.Point(-1, -1);
    }
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-mouseout', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys
        }
    }));
};

Canvas.prototype.finwheelmoved = function(e) {
    if (this.isDragging() || !this.hasFocus()) {
        return;
    }
    e.preventDefault();
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-wheelmoved', {
        detail: {
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            primitiveEvent: e,
            isRightClick: this.isRightClick(e)
        }
    }));
};

Canvas.prototype.finclick = function(e) {
    if (Date.now() - this.lastClickTime < 250) {
        //this is a double click...
        this.findblclick(e);
        return;
    }
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-click', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            isRightClick: this.isRightClick(e)
        }
    }));
    this.lastClickTime = Date.now();
};

Canvas.prototype.finrelease = function(e) {
    this.holdPulseCount = 0;
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-release', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys
        }
    }));
};

Canvas.prototype.finflick = function(e) {
    if (!this.hasFocus()) {
        return;
    }
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-flick', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            isRightClick: this.isRightClick(e)
        }
    }));
};

Canvas.prototype.fintrackstart = function(e) {
    if (!this.hasFocus()) {
        return;
    }
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-trackstart', {
        detail: {
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            primitiveEvent: e
        }
    }));
};

Canvas.prototype.fintrack = function(e) {
    if (!this.hasFocus()) {
        return;
    }
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-track', {
        detail: {
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            primitiveEvent: e
        }
    }));
};

Canvas.prototype.fintrackend = function(e) {
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-trackend', {
        detail: {
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            primitiveEvent: e
        }
    }));
};

Canvas.prototype.finhold = function(e) {
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-hold', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            isRightClick: this.isRightClick(e)
        }
    }));
};

Canvas.prototype.finholdpulse = function(e) {
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-holdpulse', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            count: this.holdPulseCount++
        }
    }));
};

Canvas.prototype.fintap = function(e) {
    //this nonsense is to hold a tap if it's really a double click
    var self = this;
    var now = Date.now();
    var dif = now - this.lastDoubleClickTime;
    if (dif < 300) {
        return;
    }
    //dragend is also causing a tap
    //lets fix this here
    if (now - this.dragEndtime < 100) {
        return;
    }
    setTimeout(function() {
        self._fintap(e);
    }, 180);
};

Canvas.prototype._fintap = function(e) {
    //this nonsense is to hold a tap if it's really a double click
    var now = Date.now();
    var dif = now - this.lastDoubleClickTime;
    if (dif < 300) {
        return;
    }
    this.mouseLocation = this.getLocal(e);
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-tap', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            isRightClick: this.isRightClick(e)
        }
    }));
};

Canvas.prototype.findblclick = function(e) {
    this.mouseLocation = this.getLocal(e);
    this.lastDoubleClickTime = Date.now();
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-dblclick', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            isRightClick: this.isRightClick(e)
        }
    }));
    //console.log('dblclick', this.currentKeys);
};

Canvas.prototype.getCharMap = function() {
    return charMap;
};

Canvas.prototype.finkeydown = function(e) {
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
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-keydown', {
        detail: {
            primitiveEvent: e,
            alt: e.altKey,
            ctrl: e.ctrlKey,
            char: keyChar,
            code: e.charCode,
            key: e.keyCode,
            meta: e.metaKey,
            repeatCount: this.repeatKeyCount,
            repeatStartTime: this.repeatKeyStartTime,
            shift: e.shiftKey,
            identifier: e.keyIdentifier,
            currentKeys: this.currentKeys.slice(0)
        }
    }));
};

Canvas.prototype.finkeyup = function(e) {
    var keyChar = e.shiftKey ? charMap[e.keyCode][1] : charMap[e.keyCode][0];
    this.currentKeys.splice(this.currentKeys.indexOf(keyChar), 1);
    if (!this.hasFocus()) {
        return;
    }
    this.repeatKeyCount = 0;
    this.repeatKey = null;
    this.repeatKeyStartTime = 0;
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-keyup', {
        detail: {
            primitiveEvent: e,
            alt: e.altKey,
            ctrl: e.ctrlKey,
            char: keyChar,
            code: e.charCode,
            key: e.keyCode,
            meta: e.metaKey,
            repeat: e.repeat,
            shift: e.shiftKey,
            identifier: e.keyIdentifier,
            currentKeys: this.currentKeys.slice(0)
        }
    }));
};

Canvas.prototype.finfocusgained = function(e) {
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-focus-gained', {
        detail: {
            primitiveEvent: e
        }
    }));
};

Canvas.prototype.finfocuslost = function(e) {
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-focus-lost', {
        detail: {
            primitiveEvent: e
        }
    }));
};

Canvas.prototype.fincontextmenu = function(e) {
    if (e.ctrlKey && this.currentKeys.indexOf('CTRL') === -1) {
        this.currentKeys.push('CTRL');
    }
    if (Date.now() - this.lastClickTime < 250) {
        //this is a double click...
        this.findblclick(e);
        return;
    }
    this.canvas.dispatchEvent(new CustomEvent('fin-canvas-context-menu', {
        detail: {
            primitiveEvent: e,
            mouse: this.mouseLocation,
            keys: this.currentKeys,
            isRightClick: this.isRightClick(e)
        }
    }));
    this.lastClickTime = Date.now();
};

Canvas.prototype.repaint = function() {
    var fps = this.getFPS();
    this.repaintNow = true;
    if (!paintLoopRunning || fps === 0) {
        this.paintNow();
    }
};

Canvas.prototype.getMouseLocation = function() {
    return this.mouseLocation;
};

Canvas.prototype.getOrigin = function() {
    var rect = this.canvas.getBoundingClientRect();
    var p = new this.g.Point(rect.left, rect.top);
    return p;
};

Canvas.prototype.getLocal = function(e) {
    var rect = this.canvas.getBoundingClientRect();
    var p = new this.g.Point((e.x || e.clientX) - rect.left, (e.y || e.clientY) - rect.top);
    return p;
};

Canvas.prototype.hasFocus = function() {
    return document.activeElement === this.canvas;
};

Canvas.prototype.takeFocus = function() {
    var self = this;
    if (!this.hasFocus()) {
        setTimeout(function() {
            self.canvas.focus();
        }, 10);
    }
};

Canvas.prototype.beDragging = function() {
    this.dragging = true;
    this.disableDocumentElementSelection();
};

Canvas.prototype.beNotDragging = function() {
    this.dragging = false;
    this.enableDocumentElementSelection();
};

Canvas.prototype.isDragging = function() {
    return this.dragging;
};

Canvas.prototype.disableDocumentElementSelection = function() {
    var style = document.body.style;
    style.cssText = style.cssText + '-webkit-user-select: none';
};

Canvas.prototype.enableDocumentElementSelection = function() {
    var style = document.body.style;
    style.cssText = style.cssText.replace('-webkit-user-select: none', '');
};

Canvas.prototype.setFocusable = function(boolean) {
    if (boolean === true) {
        this.focuser.style.display = '';
    } else {
        this.focuser.style.display = 'none';
    }

};

Canvas.prototype.isRightClick = function(e) {
    var isRightMB;
    e = e || window.event;

    if ('which' in e) { // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which === 3;
    } else if ('button' in e) { // IE, Opera
        isRightMB = e.button === 2;
    }
    return isRightMB;
};

Canvas.prototype.gestures = gestures;

module.exports = Canvas;