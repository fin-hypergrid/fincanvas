# fincanvas

Openfin's HTML canvas++ wrapper.

> v1.1.0 - For the *fin-canvas-keydown* and *fin-canvas-keyup* events' parameter `event.detail.char`, added a new value `'BACKSPACE'` to refer to the backspace key. (`'DELETE'` now refers to the actual delete key.) Also added new values `'F1'`..`'F12'` for the function keys.

> v1.1.1 - Increased double-click polling delay from 250 to 325 msecs and made it an option (`doubleClickDelay`). Event `fin-canvas-click` will no longer fire on the first click of a double click; it will only fire once the polling delay has elapsed and there was no second click.

> v1.2.1 - Changed renderer "component" public interface method `_paint()` to `paint()` (breaking change).

> v1.3.0 - Removed gesture support.

[API](http://openfin.github.io/fincanvas)

[Demo](http://openfin.github.io/fincanvas/demo.html)

### Stand-alone versions

If you prefer to include directly, reference one or the other of the following browserified versions in a `<script>` tag:

* [`fincanvas.js`](http://openfin.github.io/fincanvas/fincanvas.js) _(unminified version with symbol map)_
* [`fincanvas.min.js`](http://openfin.github.io/fincanvas/fincanvas.min.js) _(minified version without symbol map)_

```javascript
<script src='http://openfin.github.io/fincanvas/fincanvas.js'></script>
<script src='http://openfin.github.io/fincanvas/fincanvas.min.js'></script>
```