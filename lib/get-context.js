'use strict';

var Context = require('./Context');
var Context2d = require('./Context2d');
var Context3d = require('./Context3d');

/**
 * Canvas context factory.
 *
 * @method getContext
 * @param {HTMLCanvasElement} canvas
 * @param {String} [type='2d']
 * @return Context
 */
function getContext(canvas, type) {
    if (type === 'webgl') {
        // 3D Context
        return new Context3d(canvas);
    }

    // 2D Context
    return new Context2d(canvas);
}

getContext.Context = Context;
getContext.Context2d = Context2d;
getContext.Context3d = Context3d;

module.exports = getContext;
