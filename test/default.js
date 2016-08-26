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
