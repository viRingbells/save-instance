/**
 * Example of how to use
 **/
'use strict';

const debug     = require('debug')('save-instance.example');
const assert    = require('assert');
const savable   = require('save-instance');

/**
 * save-instance is supposed to be used as a decorator
 * yet it has not been implemented till this node version
 * so use it as a common function directly
 **/
const Test = savable()
(class {
    constructor (name) {
        this.name = name;
    }
});

const testA = new Test('Test Name A').saveInstance('A');

assert(Test.getInstance('A') === testA, 'getInstance() should return the exactly the same instance for name A');

const testB = new Test('Test Name B').saveInstance('B');

const TestC = new Test('Test Name C').saveInstance();

assert(Test.getInstance('B') === testB, 'getInstance() should return the exactly the same instance for name B');
assert(Test.getInstance('A') !== testB && Test.getInstance('B') !== testA, 'getInstance() should not return a wrong instance');

const testD = Test.create('Test Name D');
