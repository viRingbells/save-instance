/**
 * Example of getting instances
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

exports.default = () => {
  debug("Example-Use2: use instance 'vi-ringbells' of Foo");
  console.log(_Foo2.default.instance('vi-ringbells'));
};