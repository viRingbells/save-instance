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


let lastMapFunc = null;
let lastMapFuncArgName = null;
let lastMapResult = null;
function mapName(map, name) {
    if (map instanceof Map && map.has(name)) {
        return map.get(name);
    }
    if (map instanceof Object && map.hasOwnProperty(name)) {
        return map[name];
    }
    if (map instanceof Function) {
        if (lastMapFunc === map && lastMapFuncArgName === name) {
            return lastMapResult;
        }
        lastMapFunc = map;
        lastMapFuncArgName = name;
        lastMapResult = map(name);
        return lastMapResult;
    }
    return name;
}


function savable(options = {}) {
    debug('create savable decorate');
    assert(options instanceof Object, 'Invalid type of options, should be an object');
    options = _.chain(options)
        .cloneDeep()
        .defaultsDeep(DEFAULT_OPTION)
        .pick(Object.keys(DEFAULT_OPTION))
        .value();

    function createInstance(Savable, name, ...args) {
        debug(`create instance ${'string' === typeof name ? name : '[no-string]'}`);
        let preparedArguments = options.preprocessArguments(name, ...args);
        if (undefined === preparedArguments) {
            preparedArguments = args;
        }
        let instance = new Savable(...preparedArguments);
        const argsForPreprocessInstance = options.preprocessInstanceWithOriginalArgs
            ? args : preparedArguments;
        instance = options.preprocessInstance(instance, name, ...argsForPreprocessInstance) || instance;
        assert(instance instanceof Savable, `options.preprocessInstance must return a instance of ${Savable}`);
        return instance;
    }

    const defaultName = options.defaultName;

    function decorate(Class) {
        debug('decorating');
        const instances = {};

        if (Class.saveInstance || Class.prototype.saveInstance || Class.getInstance
            || Class.allInstances || Class.removeInstance || Class.removeAllInstances
            || Class.create || Class.defaultInstanceName) {
            const className = Class.name; // || Class.constructor.name || Class;
            throw new Error('Can not decorate class ' + className + ' due to duplicated properties');
        }

        class Savable extends Class {
            static defaultInstanceName() {
                return defaultName;
            }

            static saveInstance(name = defaultName, ...args) {
                const targetName = mapName(options.map, name);
                return createInstance(Savable, targetName, ...args).saveInstance(name);
            }

            saveInstance(name = defaultName) {
                const targetName = mapName(options.map, name);
                assert(!instances.hasOwnProperty(targetName), `Instance [${'string' === typeof name ? name : '#default#'}] already exists`);
                instances[targetName] = this;
                return this;
            }

            static saveLazyInstance(name = defaultName, ...args) {
                debug(`save lazy instance ${'string' === typeof name ? name : '[no-string]'}`);
                const targetName = mapName(options.map, name);
                let instance = null;
                instances.__defineGetter__(targetName, () => {
                    if (instance instanceof Savable) {
                        return instance;
                    }
                    debug(`create lazy instance ${'string' === typeof name ? name : '[no-string]'}`);
                    instance = createInstance(Savable, targetName, ...args);
                    return instance;
                });
            }

            static getInstance(name = defaultName, ...args) {
                debug(`get instance ${'string' === typeof name ? name : '[no-string]'}`);
                const targetName = mapName(options.map, name);
                const instance = instances[targetName];
                if (instance) {
                    return instance;
                }
                return Savable.saveInstance(name, ...args);
            }

            static allInstances() {
                return _.assign({}, instances);
            }

            static removeAllInstances() {
                for (const name in instances) {
                    delete instances[name];
                }
                return Savable;
            }

            static removeInstance(name = defaultName) {
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
            }

            static create(...args) {
                return new Savable(...args);
            }
        }

        return Savable;
    }

    return decorate;
}


module.exports = savable;
