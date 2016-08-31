/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const instances = require('..');

class Test {}
instances(Test);

const instance = new Test().saveInstance();

describe('save-instance singleton', () => {
    it('should remove instances', done => {
        Test.getInstance().should.be.exactly(instance);

        class Test2 {}
        instances(Test2);

        Test2.getInstance(Test2.defaultInstanceName(), 'A', 'B').should.be.an.instanceOf(Test2);
        Test2.getInstance(Test2.defaultInstanceName(), 'A', 'B').should.be.exactly(Test2.getInstance());

        done();
    });
});

describe('save-instance remove singleton', () => {
    it('should remove all instances', done => {
        Test.removeInstance();
        Object.keys(Test.allInstances()).length.should.be.exactly(0);

        done();
    });
});

describe('save-instance create object', () => {
    it('should create an instance by Class.create', done => {
        Test.create().should.be.an.instanceOf(Test);
        done();
    });
});
