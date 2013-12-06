'use strict';

var GetContext = require('./GetContext');
var GetContext2d = require('./GetContext2d');
var GetContext3d = require('./GetContext3d');

/**
 * A canvas wrapper maker function.
 *
 * @type Function
 * @param {HTMLElement} canvas
 * @param {String} [type='2d']
 * @return GetContext
 */
var getContext = function (canvas, type) {
    if (type === 'webgl') {
        // 3D Context
        return new GetContext3d(canvas);
    } else {
        // 2D Context
        return new GetContext2d(canvas);
    }
};

getContext.GetContext = GetContext;
getContext.GetContext2d = GetContext2d;
getContext.GetContext3d = GetContext3d;

module.exports = getContext;
