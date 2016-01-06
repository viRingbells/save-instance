/**
 * Example main
 **/
'use strict';

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _use = require('./use1');

var _use2 = _interopRequireDefault(_use);

var _use3 = require('./use2');

var _use4 = _interopRequireDefault(_use3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)("save-instance");

debug("Example-Main: init");
(0, _init2.default)();

debug("Example-Main: use1");
(0, _use2.default)();

debug("Example-Main: use2");
(0, _use4.default)();

debug("Example-Main: load");