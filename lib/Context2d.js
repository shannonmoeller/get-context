'use strict';

var Context = require('./Context');

// Whether the methods for a 3D canvas context object have been wrapped.
var isReady2d = false;

/**
 * Provides a friendlier interface for working with a 2D rendering context.
 *
 * @class Context2d
 * @param {HTMLCanvasElement} canvas
 * @constructor
 */
function Context2d(canvas) {
    var context = canvas && canvas.getContext('2d');

    Context.call(this, context);

    if (!isReady2d) {
        isReady2d = this._setup(Context2d.prototype);
    }
}

Context2d.prototype = Object.create(Context.prototype);
Context2d.prototype.constructor = Context2d;

module.exports = Context2d;
