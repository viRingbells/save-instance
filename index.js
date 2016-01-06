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
    if (target._saved_instances || 
        (target.prototype && target.prototype.saveInstance) || 
        target.getInstance || target.instance) {
        throw new Error("Can not make this class savable");
    }
    target._saved_instances = {};
    target.prototype.saveInstance = function (name = 'default') {
        target._saved_instances[name] = this;
        return this;
    };
    target.getInstance = target.instance = (name = 'default') => {
        if (!target._saved_instances[name]) {
            throw new Error('No instance named ' + name + ' found');
        }
        return target._saved_instances[name];
    }
}

debug("Savable: load");
export default savable;
