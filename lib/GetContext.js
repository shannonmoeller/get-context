'use strict';

/**
 * Provides a friendlier interface for working with a canvas rendering context.
 *
 * @class GetContext
 * @param {HTMLElement} canvas
 * @param {CanvasRenderingContext} context
 * @constructor
 */
var GetContext = function (canvas, context) {
    if (!canvas) {
        throw new Error('Missing required `canvas` element.');
    }

    if (!context) {
        throw new Error('Missing required `context` object.');
    }

    /**
     *
     */
    this.canvas = canvas;

    /**
     *
     */
    this.context = context;
};

/**
 * Gets one or more canvas property values.
 *
 * @method get
 * @param {String|Array} key A property key, or an array of property keys.
 * @return {Any|Object} A property value, or an object of property-value pairs.
 */
GetContext.prototype.get = function (key) {
    var value = null;
    var length = null;
    var i = null;

    if (typeof key === 'object') {
        // Multiple values
        value = {};
        length = key.length;
        i = 0;

        for (; i < length; i++) {
            value[key[i]] = this.get(key[i]);
        }
    } else {
        // Single value
        value = this.context[key];
    }

    return value;
};

/**
 * Resizes the canvas element the way you expect.
 *
 * @method resize
 * @param {Number} width
 * @param {Number} height
 * @chainable
 */
GetContext.prototype.resize = function (width, height) {
    var canvas = this.canvas;
    var context = this.context;

    canvas.width = width;
    canvas.height = height;
    context.width = width;
    context.height = height;

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
GetContext.prototype.set = function (key, value) {
    if (typeof key === 'object') {
        // Multiple values
        value = key;
        key = null;

        for (key in value) {
            if (value.hasOwnProperty(key)) {
                this.set(key, value[key]);
            }
        }
    } else {
        // Single value
        this.context[key] = value;
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
GetContext.prototype._setup = function (proto) {
    var context = this.context;

    var wrap = function (key) {
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

module.exports = GetContext;
