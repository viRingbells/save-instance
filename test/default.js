/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const savable   = require('save-instance');

const Test = savable()(class {});

const instance = new Test().saveInstance();

describe('save-instance singleton', () => {
    it('should remove instances', async () => {
        Test.getInstance().should.be.exactly(instance);

        class Test2 {}
        Test2 = savable()(Test2);

        Test2.getInstance(Test2.defaultInstanceName(), 'A', 'B').should.be.an.instanceOf(Test2);
        Test2.getInstance(Test2.defaultInstanceName(), 'A', 'B').should.be.exactly(Test2.getInstance());

        const Test3 = savable()(
        class Test3 {
            constructor(name) {
                this.name = name;
            }
        });
        Test3.getInstance('foo', 'bar').should.be.an.instanceOf(Test3).with.property('name', 'bar');
        Test3.getInstance('foo', 'baz').should.be.an.instanceOf(Test3).with.property('name', 'bar');
    });
});

describe('save-instance remove singleton', () => {
    it('should remove all instances', async () => {
        Test.removeInstance();
        Object.keys(Test.allInstances()).length.should.be.exactly(0);
    });
});

describe('save-instance create object', () => {
    it('should create an instance by Class.create', async () => {
        Test.create().should.be.an.instanceOf(Test);
    });
});
