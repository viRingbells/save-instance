/**
 * Save instance - main file
 **/
'use strict';

import _debug     from 'debug';

const debug = _debug("save-instance");

function savable (target) {
    if (!target || !(target instanceof Function)) {
        throw new Error("Param for savable must be a class");
    }
    if ((target.prototype && target.prototype.saveInstance) || 
        target.getInstance || target.instance) {
        throw new Error("Can not make this class savable");
    }
    const saved_instances = {};
    target.prototype.saveInstance = function (name = 'default', options = {}) {
        if (saved_instances[name]) {
            oldOptions = saved_instances[name].options;
            if (options.readonly) {
                throw new Error('Can not save to rewrite read only Instance ' + name + ' !');
            }
        }
        saved_instances[name] = {
            instance: this,
            options:  options,
        };
        return this;
    };
    target.getInstance = target.instance = (name = 'default') => {
        if (!saved_instances[name] || !saved_instances[name].instance) {
            throw new Error('No instance named ' + name + ' found');
        }
        return saved_instances[name].instance;
    }
}

debug("Savable: load");
export default savable;
