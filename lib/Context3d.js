'use strict';

var Context = require('./Context');

// Whether the methods for a 3D canvas context object have been wrapped.
var isReady3d = false;

/**
 * Provides a friendlier interface for working with a 3D rendering context.
 *
 * @class Context3d
 * @param {HTMLCanvasElement} canvas
 * @constructor
 */
function Context3d(canvas) {
    var context = canvas && canvas.getContext('webgl');

    Context.call(this, context);

    if (!isReady3d) {
        isReady3d = this._setup(Context3d.prototype);
    }
}

Context3d.prototype = Object.create(Context.prototype);
Context3d.prototype.constructor = Context3d;

module.exports = Context3d;
