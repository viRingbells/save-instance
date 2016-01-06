/**
 * Example of saving instances
 **/
'use strict';

import _debug   from 'debug';
import Foo      from './Foo';

const debug = _debug("save-instance");

debug("Example-Init: load");
export default () => {
    debug("Example-Init: creating and saving instances");
    const fooInstance  = new Foo("foo").saveInstance("viRingbells");
    const foo2Instance = new Foo("bar").saveInstance("vi-ringbells");
};
