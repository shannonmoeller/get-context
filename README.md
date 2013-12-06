# get-context

> Chainable canvas context api wrapper.

[![Build Status](https://travis-ci.org/shannonmoeller/get-context.png?branch=master)](https://travis-ci.org/shannonmoeller/get-context)
[![NPM version](https://badge.fury.io/js/get-context.png)](http://badge.fury.io/js/get-context)
[![Dependency Status](https://gemnasium.com/shannonmoeller/get-context.png)](https://gemnasium.com/shannonmoeller/get-context)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/shannonmoeller/get-context/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

## Install

With [Node.js](http://nodejs.org):

    $ npm install get-context

With [Bower](http://bower.io):

    $ bower install shannonmoeller/get-context

With [Component](http://component.io):

    $ component install shannonmoeller/get-context

## API

### `getContext(element, type)`

Creates an instance of a chainable canvas 2D-context api wrapper.

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

```sh
$ npm test
```

[![browser support](http://ci.testling.com/shannonmoeller/get-context.png)](http://ci.testling.com/shannonmoeller/get-context)

## License

  MIT
