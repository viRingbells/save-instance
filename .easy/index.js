/**
 * Save instance - main file
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)("save-instance");

function savable(target) {
    if (!target || !(target instanceof Function)) {
        throw new Error("Param for savable must be a class");
    }
    if (target.prototype && target.prototype.saveInstance || target.getInstance || target.instance) {
        throw new Error("Can not make this class savable");
    }
    const saved_instances = {};
    target.prototype.saveInstance = function () {
        let name = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];
        let options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (saved_instances[name]) {
            oldOptions = saved_instances[name].options;
            if (options.readonly) {
                throw new Error('Can not save to rewrite read only Instance ' + name + ' !');
            }
        }
        saved_instances[name] = {
            instance: this,
            options: options
        };
        return this;
    };
    target.getInstance = target.instance = function () {
        let name = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];

        if (!saved_instances[name] || !saved_instances[name].instance) {
            throw new Error('No instance named ' + name + ' found');
        }
        return saved_instances[name].instance;
    };
}

debug("Savable: load");
exports.default = savable;
