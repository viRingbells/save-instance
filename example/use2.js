/**
 * Example of getting instances
 **/
'use strict';

import _debug   from 'debug';
import Foo      from './Foo';

const debug = _debug("save-instance");

export default () => {
    debug("Example-Use2: use instance 'vi-ringbells' of Foo");
    console.log(Foo.instance('vi-ringbells'));
};
