/**
 * Test of using options
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const savable   = require('save-instance');

const decorate = savable({
    preprocessArguments(name, ...args) {
        return [name, ...args];
    }
});

class Test {
    constructor(name) {
        this.name = name;
    }
}
decorate(Test);

describe('save-instance with args preprocessed', async () => {
    const test = Test.getInstance('foo');
    test.name.should.be.exactly('foo');
});
