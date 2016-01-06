/**
 * Example of saving instances
 **/
'use strict';

import _debug   from 'debug';
import savable  from '..';

const debug = _debug("save-instance");

debug("Example-Foo: Creating class Foo as Savable");

//Expected is using "@savable", but babel 6.x has not implemented it yet
class Foo {
    constructor (name = 'NOT SET YET') {
        this._name = name;
    }
    get name () {
        return this._name;
    }
}
savable(Foo);

debug("Example-Foo: load");
export default Foo;
