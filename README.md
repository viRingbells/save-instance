# save-instance

![npm version](https://img.shields.io/npm/v/save-instance.svg)
![build status](https://travis-ci.org/viRingbells/save-instance.svg?branch=master)

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
@instances
class Test {...}
```

Yet decorator is not implemented till current version (v6.4), use it like

```
class Test {...}
instances(Test);
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
