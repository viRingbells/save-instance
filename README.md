# save-instance

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

## Why save-instance

If you have a class like:

```
class Test {
    constructor (...args) {}
}
```

And you initialize some instances in a module (ie. a bootstrap module), like:

```
const a = new Test(...args);
```

Since you don't know what module would use them, you should export them by `exports` or `global`

Yet both `exports` and `global` seems not perfect for this case.
* For `exports`, you should require that bootstrap module to use the instances, which is puzzle
* For `global`, you should handle the namespace problem carefully

Maybe a better way is to bind the instances with the class itself, like:

```
const a1 = Test.getInstance('A');
```

Now it seems more reasonable, as _"to get the Test instance named 'A' "_

Of course, you should initalize and name it before using.

```
new Test(...args).saveInstance('A');
// or
Test.saveInstance('A', ...args);
```

## How to use

_Decoration_ is supposed as the best way to use this

```
const savable = require('save-instance');

@savable()
class Test {...}
```

Yet decorator is not implemented till current version (v7.6), use it like

```
class Test {...}
savable()(Test);
```

## Other uses

### Lazy mode

Maybe we want instances initialized in a lazy mode. Just use it like this:

```
Test.saveLazyInstance('A', ...args);
```

### Singleton

Use default name '' to pretend as a singleton instance

```
new Test(...args).saveInstance();
const test =  Test.getInstance();
```

### Options

If you want to preprocess arguments, use `options.preprocessArguments(name, ...args)`

```
@savable({
    preprocessArguments(name, ...args) {
        return ['arg1', 'arg2', 'arg3'];
    }
})
class Test {}
```

If you want to preprocess instance, use `options.preprocessInstance(instance, name, ...args)`

```
@savable({
    preprocessInstance(instance, name) {
        instance.name = name;
        return instance;
    }
})
class Test {}
```

If you want to set a default name, or want to map some names into one, use `options.defaultName` and `options.map`

```
@savable({
    defaultName: 'foo',
    map: {
        'bar': 'foo',
        'baz': 'foo',
    },
})
class Test {}
```

Notice that the default name is `undefined` and maps `null` to `undefined`.


[npm-image]: https://img.shields.io/npm/v/save-instance.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/save-instance
[travis-image]: https://img.shields.io/travis/viRingbells/save-instance/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/viRingbells/save-instance
[coveralls-image]: https://img.shields.io/codecov/c/github/viRingbells/save-instance.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/viRingbells/save-instance?branch=master
