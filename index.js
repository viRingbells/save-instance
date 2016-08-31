/**
 * Make a class with method to save/get instances
 **/
'use strict';

const $       = require('lodash');
const debug   = require('debug')('save-instance.main');

debug('main:loading ...');

module.exports = (Class) => {
    const instances = {};
    const defaultSymbol = Symbol();


    if (Class.saveInstance || Class.prototype.saveInstance || Class.getInstance
        || Class.allInstances || Class.removeInstance || Class.removeAllInstances
        || Class.create || Class.defaultInstanceName) {
        const className = Class.name; // || Class.constructor.name || Class;
        throw new Error('Can not decorate class ' + className + ' due to duplicated properties');
    }
    Class.defaultInstanceName = () => {
        return defaultSymbol;
    };

    Class.saveInstance = (name, ...args) => {
        return new Class(...args).saveInstance(name);
    };

    Class.prototype.saveInstance = function (name = defaultSymbol) {
        instances[name] = this;
        return this;
    };

    Class.saveLazyInstance = (name = defaultSymbol, ...args) => {
        let instance = null;
        instances.__defineGetter__(name, () => {
            instance = instance || new Class(...args);
            return instance;
        });
        instances.__defineSetter__(name, value => {
            delete instances[name];
            instances[name] = value;
            return value;
        });
    };

    Class.getInstance = (name = defaultSymbol, ...args) => {
        const instance = instances[name];
        if (name === defaultSymbol && !instance) {
            return Class.create(...args).saveInstance();
        }
        return instance;
    };

    Class.allInstances = () => {
        return $.assign({}, instances);
    };

    Class.removeAllInstances = () => {
        for (const name in instances) {
            delete instances[name];
        }
        return Class;
    };
    Class.removeInstance = (name = defaultSymbol) => {
        const instance = instances[name];
        delete instances[name];
        return instance;
    };
    Class.create = (...args) => {
        return new Class(...args);
    };
};

debug('main:loaded!');
