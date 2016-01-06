/**
 * Example main
 **/
'use strict';

import _debug   from 'debug';
import init     from './init';
import use1     from './use1';
import use2     from './use2';

const debug = _debug("save-instance");

debug("Example-Main: init");
init();

debug("Example-Main: use1");
use1();

debug("Example-Main: use2");
use2();

debug("Example-Main: load");
