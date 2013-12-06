'use strict';

var GetContext = require('./GetContext');
var util = require('util');

/**
 * Whether the methods for a 3D canvas context object have been wrapped.
 *
 * @type Boolean
 * @default false
 */
var isReady3d = false;


/**
 * Provides a friendlier interface for working with a 3D canvas rendering context.
 *
 * @class GetContext3d
 * @param {HTMLElement} canvas
 * @constructor
 */
var GetContext3d = function (canvas) {
    var context = canvas && canvas.getContext('webgl');

    GetContext.call(this, canvas, context);

    if (!isReady3d) {
        isReady3d = this._setup(GetContext3d.prototype);
    }
};

util.inherits(GetContext3d, GetContext);

module.exports = GetContext3d;
