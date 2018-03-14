/**
 * Make a class with method to save/get instances
 **/
'use strict';

const _       = require('lodash');
const assert  = require('assert');
const debug   = require('debug')('save-instance');


const DEFAULT_OPTION = {
    defaultName: null,
    map: null,
    preprocessArguments() {},
    preprocessInstanceWithOriginalArgs: true,
    preprocessInstance() {},
};


function mapName(map, name) {
    if (map instanceof Map && map.has(name)) {
        return map.get(name);
    }
    if (map instanceof Object && map.hasOwnProperty(name)) {
        return map[name];
    }
    return name;
}


function savable(options = {}) {
    debug('create savable decorator');
    assert(options instanceof Object, 'Invalid type of options, should be an object');
    options = _.chain(options)
        .cloneDeep()
        .defaultsDeep(DEFAULT_OPTION)
        .pick(Object.keys(DEFAULT_OPTION))
        .value();

    function createInstance(Class, name, ...args) {
        let preparedArguments = options.preprocessArguments(name, ...args);
        if (undefined === preparedArguments) {
            preparedArguments = args;
        }
        let instance = new Class(...preparedArguments);
        const argsForPreprocessInstance = options.preprocessInstanceWithOriginalArgs
            ? args : preparedArguments;
        instance = options.preprocessInstance(instance, name, ...argsForPreprocessInstance) || instance;
        assert(instance instanceof Class, `options.preprocessInstance must return a instance of ${Class}`);
        return instance;
    }

    const defaultName = options.defaultName || Symbol();

    function decorator(Class) {
        debug('decorating');
        const instances = {};

        if (Class.saveInstance || Class.prototype.saveInstance || Class.getInstance
            || Class.allInstances || Class.removeInstance || Class.removeAllInstances
            || Class.create || Class.defaultInstanceName) {
            const className = Class.name; // || Class.constructor.name || Class;
            throw new Error('Can not decorate class ' + className + ' due to duplicated properties');
        }
        Class.defaultInstanceName = () => {
            return defaultName;
        };

        Class.saveInstance = (name = defaultName, ...args) => {
            name = mapName(options.map, name);
            return createInstance(Class, name, ...args).saveInstance(name);
        };

        Class.prototype.saveInstance = function (name = defaultName) {
            name = mapName(options.map, name);
            assert(!instances.hasOwnProperty(name), `Instance [${'string' === typeof name ? name : '#default#'}] already exists`);
            instances[name] = this;
            return this;
        };

        Class.saveLazyInstance = (name = defaultName, ...args) => {
            name = mapName(options.map, name);
            let instance = null;
            instances.__defineGetter__(name, () => {
                instance = instance || createInstance(Class, name, ...args);
                return instance;
            });
            /*
            instances.__defineSetter__(name, value => {
                delete instances[name];
                instances[name] = value;
                return value;
            });
            */
        };

        Class.getInstance = (name = defaultName, ...args) => {
            name = mapName(options.map, name);
            const instance = instances[name];
            if (name !== defaultName || args.length === 0 || instance) {
                return instance;
            }
            return Class.saveInstance(name, ...args);
        };

        Class.allInstances = () => {
            return _.assign({}, instances);
        };

        Class.removeAllInstances = () => {
            for (const name in instances) {
                delete instances[name];
            }
            return Class;
        };
        Class.removeInstance = (name = defaultName) => {
            if (name instanceof Object) {
                const instance = name;
                for (const key in instances) {
                    if (instances[key] === instance) {
                        delete instances[key];
                    }
                }
                return name;
            }
            name = mapName(options.map, name);
            const instance = instances[name];
            delete instances[name];
            return instance;
        };
        Class.create = (...args) => {
            return new Class(...args);
        };

        return Class;
    }

    return decorator;
}


module.exports = savable;
