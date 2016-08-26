/**
 * Example of how to use
 **/
'use strict';

const debug     = require('debug')('save-instance.example');
const assert    = require('assert');
const instances = require('..');

debug('main:loading ...');

/**
 * save-instance is supposed to be used as a decorator
 * yet it has not been implemented till this node version
 * so use it as a common function directly
 **/
// @instances
class Test {
    constructor (name) {
        this.name = name;
    }
}
instances(Test);

const testA = new Test('Test Name A').saveInstance('A');

assert(Test.getInstance('A') === testA, 'getInstance() should return the exactly the same instance for name A');

const testB = new Test('Test Name B').saveInstance('B');

assert(Test.getInstance('B') === testB, 'getInstance() should return the exactly the same instance for name B');
assert(Test.getInstance('A') !== testB && Test.getInstance('B') !== testA, 'getInstance() should not return a wrong instance');
