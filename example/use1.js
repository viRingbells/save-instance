/**
 * Example of getting instances
 **/
'use strict';

import _debug   from 'debug';
import Foo      from './Foo';

const debug = _debug("save-instance");

export default () => {
    debug("Example-Use1: use instance 'viRingbells' of Foo");
    console.log(Foo.instance('viRingbells'));
};
