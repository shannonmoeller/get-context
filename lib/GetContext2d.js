'use strict';

var GetContext = require('./GetContext');
var util = require('util');

/**
 * Whether the methods for a 2D canvas context object have been wrapped.
 *
 * @type Boolean
 * @default false
 */
var isReady2d = false;

/**
 * Provides a friendlier interface for working with a 2D canvas rendering context.
 *
 * @class GetContext2d
 * @param {HTMLElement} canvas
 * @constructor
 */
var GetContext2d = function (canvas) {
    var context = canvas && canvas.getContext('2d');

    GetContext.call(this, canvas, context);

    if (!isReady2d) {
        isReady2d = this._setup(GetContext2d.prototype);
    }
};

util.inherits(GetContext2d, GetContext);

module.exports = GetContext2d;
