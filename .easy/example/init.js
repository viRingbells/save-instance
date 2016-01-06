/**
 * Example of saving instances
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _Foo = require('./Foo');

var _Foo2 = _interopRequireDefault(_Foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)("save-instance");

debug("Example-Init: load");

exports.default = () => {
    debug("Example-Init: creating and saving instances");
    const fooInstance = new _Foo2.default("foo").saveInstance("viRingbells");
    const foo2Instance = new _Foo2.default("bar").saveInstance("vi-ringbells");
};