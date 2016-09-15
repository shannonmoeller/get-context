'use strict';

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Provides a friendlier interface for working with a canvas rendering context.
 *
 * @class Context
 * @param {CanvasRenderingContext} context
 * @constructor
 */
function Context(context) {
    if (!context) {
        throw new Error('Missing required `context` object.');
    }

    /**
     * @property {HTMLCanvasElement} canvas
     */
    this.canvas = context.canvas;

    /**
     * @property {CanvasRenderingContext} context
     */
    this.context = context;
}

/**
 * Clears the canvas of any image data.
 *
 * @method clear
 * @chainable
 */
Context.prototype.clear = function () {
    var canvas = this.canvas;

    return this
        .save()
        .setTransform(1, 0, 0, 1, 0, 0)
        .clearRect(0, 0, canvas.width, canvas.height)
        .restore();
};

/**
 * Gets one or more canvas property values.
 *
 * @method get
 * @param {String|Array} key A property key, or an array of property keys.
 * @return {Any|Object} A property value, or an object of property-value pairs.
 */
Context.prototype.get = function (key) {
    var value = null;
    var length = null;
    var i = null;

    // Single value
    if (key !== null && typeof key !== 'object') {
        return this.context[key];
    }

    // Multiple values
    value = {};
    length = key.length;
    i = 0;

    for (; i < length; i++) {
        value[key[i]] = this.get(key[i]);
    }

    return value;
};

/**
 * @method getPixelRatio
 * @return {Number}
 */
Context.prototype.getPixelRatio = function () {
    if (typeof window === 'undefined') {
        return 1;
    }

    return Math.max(1, window.devicePixelRatio || 0);
};

/**
 * Resizes the canvas element the way you expect.
 *
 * @method resize
 * @param {Number} width
 * @param {Number} height
 * @param {Number?} scale
 * @chainable
 */
Context.prototype.resize = function (width, height, scale) {
    var canvas = this.canvas;
    var ratio = scale || this.getPixelRatio();
    var scaledWidth = width * ratio;
    var scaledHeight = height * ratio;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    return this;
};

/**
 * Sets one or more canvas properties.
 *
 * @method set
 * @param {String|Object} key
 * @param {Any} [value]
 * @chainable
 */
Context.prototype.set = function (key, value) {
    // Single value
    if (key !== null && typeof key !== 'object') {
        this.context[key] = value;

        return this;
    }

    // Multiple values
    value = key;
    key = null;

    for (key in value) {
        if (hasOwn.call(value, key)) {
            this.set(key, value[key]);
        }
    }

    return this;
};

/**
 * Wraps context object methods with chainable wrappers where appropriate.
 *
 * @method _setup
 * @param {Object} proto
 * @param {CanvasRenderingContext} context
 * @return Boolean Whether wrapping was successful
 * @private
 */
Context.prototype._setup = function (proto) {
    var context = this.context;

    var wrap = function (key) {
        if ((/^(webkit|moz|ms)/).test(key)) {
            // Ignore vendor-specific properties
            return;
        }

        if (typeof context[key] !== 'function') {
            // Nothing to do
            return;
        }

        proto[key] = function () {
            var ctx = this.context;
            var ret = ctx[key].apply(ctx, arguments);

            // Pass through return value
            if (ret !== undefined) {
                return ret;
            }

            // Make chainable
            return this;
        };
    };

    Object
        .keys(context.constructor.prototype)
        .forEach(wrap);

    return true;
};

module.exports = Context;
