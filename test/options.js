/**
 * Test of using options
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const savable   = require('save-instance');

const decorate = savable({
    defaultName: 'haohao',
    map: {
        null: 'haohao'
    },
    preprocessArguments(name, ...args) {
        return [name, ...args];
    },
    preprocessInstance(instance, name) {
        instance.instanceName = 'Instance - ' + name;
    },
});

class Test {
    constructor(name) {
        this.name = name;
    }
}
decorate(Test);

describe('save-instance with options', () => {
    it('should use default name', async () => {
        const test = Test.saveInstance();
        test.name.should.be.exactly('haohao');
    });

    it('should use default name for null', async () => {
        const test = Test.getInstance(null);
        test.name.should.be.exactly('haohao');
    });

    it('should have args preprocessed', async () => {
        const test = Test.saveInstance('foo');
        test.name.should.be.exactly('foo');
    });

    it('should return instance preprocessed', async () => {
        const test = Test.saveInstance('Foo');
        test.instanceName.should.be.exactly('Instance - Foo');
    });
});
