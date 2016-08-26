/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const instances = require('..');

class Test {}
instances(Test);

describe('save-instance remove', () => {
    it('should remove instances', done => {
        Test.saveInstance('A');
        Test.saveInstance('B');

        let instances = null;
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(2);

        Test.removeInstance('A');
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(1);
        (instances.B).should.be.an.instanceOf(Test);

        Test.removeInstance('B');
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(0);

        done();
    });
});

describe('save-instance remove all', () => {
    it('should remove all instances', done => {
        const testA = Test.saveInstance('A');
        const testB = Test.saveInstance('B');

        let instances = null;
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(2);

        Test.removeAllInstances();
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(0);

        done();
    });
});
