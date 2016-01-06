/**
 * Example of saving instances
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)("save-instance");

debug("Example-Foo: Creating class Foo as Savable");

//Expected is using "@savable", but babel 6.x has not implemented it yet
class Foo {
    constructor() {
        let name = arguments.length <= 0 || arguments[0] === undefined ? 'NOT SET YET' : arguments[0];

        this._name = name;
    }
    get name() {
        return this._name;
    }
}
(0, _2.default)(Foo);

debug("Example-Foo: load");
exports.default = Foo;