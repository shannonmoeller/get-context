/*global beforeEach, describe, it */
'use strict';

var assert = require('assert');
var getContext = require('../lib/get-context');

var Image = global.Image;
var document = global.document;
var body = document && document.body;

var MockContext = function () {
    this.fillStyle = '#000000';
    this.strokeStyle = '#000000';
};

MockContext.prototype = {
    constructor: MockContext,
    drawImage: function () {},
    fillRect: function () {},
    strokeRect: function () {}
};

var MockCanvas = function () {};

MockCanvas.prototype = {
    constructor: MockCanvas,
    getContext: function () {
        return new MockContext();
    }
};

describe('getContext', function () {
    var canvas = null;

    beforeEach(function () {
        if (document) {
            canvas = document.createElement('canvas');
        } else {
            canvas = new MockCanvas();
        }
    });

    it('it should get values', function () {
        var ctx = getContext(canvas);

        // Single
        assert.equal(ctx.get('fillStyle'), '#000000');

        // Multiple
        assert.deepEqual(
            ctx.get(['fillStyle', 'strokeStyle']),
            { fillStyle: '#000000', strokeStyle: '#000000' }
        );
    });

    it('it should set values', function () {
        var ctx = getContext(canvas);

        // Single
        ctx.set('fillStyle', '#ff0000');
        assert.equal(ctx.get('fillStyle'), '#ff0000');

        // Multiple
        ctx.set({ fillStyle: '#0000ff', strokeStyle: '#0000ff' });
        assert.deepEqual(
            ctx.get(['fillStyle', 'strokeStyle']),
            { fillStyle: '#0000ff', strokeStyle: '#0000ff' }
        );
    });

    it('it should wrap native methods', function (done) {
        var img = null;
        var ctx = getContext(canvas);

        var onload = function () {
            ctx
                .resize(500, 500)
                .set({
                    fillStyle: 'green',
                    strokeStyle: 'blue',
                    lineWidth: 10
                })
                .fillRect(0, 0, 500, 500)
                .strokeRect(150, 300, 240, 160)
                .set('globalCompositeOperation', 'destination-atop');

            if (img) {
                ctx.drawImage(img, 0, 0);
            }

            done();
        };

        if (body) {
            body.appendChild(canvas);
        }

        if (Image) {
            img = new Image();
            img.onload = onload;
            img.src = 'mask.png';
            return;
        }

        onload();
    });
});
