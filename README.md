# `get-context`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

Chainable canvas context api wrapper.

## Install

With [Node.js](http://nodejs.org):

    $ npm install get-context

With [Bower](http://bower.io):

    $ bower install shannonmoeller/get-context

With [Component](http://component.io):

    $ component install shannonmoeller/get-context

## API

### `getContext(element, type)`

Creates an instance of a chainable canvas context api wrapper. The `type` argument may be `'2d'` or `'webgl'`. Defaults to `'2d'`.

```js
var canvas = document.createElement('canvas');
var context = require('get-context')(canvas);

context
    .set({
        strokeStyle: '#0000ff',
        lineCap: 'round'
    })
    .beginPath()
        .arc(75, 75, 50, 0, Math.PI * 2, true) // Outer circle
        .moveTo(110, 75)
        .arc(75, 75, 35, 0, Math.PI, false)    // Mouth (clockwise)
        .moveTo(65,65)
        .arc(60, 65, 5, 0, Math.PI * 2, true)  // Left eye
        .moveTo(95,65)
        .arc(90, 65, 5, 0, Math.PI * 2, true)  // Right eye
    .stroke();
```

### `.get(key)`

Gets a single context property.

```js
context.get('fillStyle');
// returns #000000
```

### `.get(array)`

Gets multiple context properties.

```js
context.get(['fillStyle', 'strokeStyle']);
// returns { fillStyle: '#000000', strokeStyle: '#000000' }
```

### `.set(key, value)`

Sets a single context property.

```js
context.set('fillStyle', '#FF0000');
// returns context
```

### `.set(object)`

Sets multiple context properties.

```js
context.set({
    fillStyle: '#FF0000',
    strokeStyle: '#00FF00'
});
// returns context
```

## Test

    $ npm test

----

© 2015 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/get-context/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/get-context
[downloads-img]: http://img.shields.io/npm/dm/get-context.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/gitter-join_chat-1dce73.svg?style=flat-square
[gitter-url]:    https://gitter.im/shannonmoeller/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/get-context.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/get-context
[travis-img]:    http://img.shields.io/travis/shannonmoeller/get-context.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/get-context
[waffle-img]:    http://img.shields.io/github/issues/shannonmoeller/get-context.svg?style=flat-square
[waffle-url]:    http://waffle.io/shannonmoeller/get-context
