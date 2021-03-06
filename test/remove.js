/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const savable   = require('save-instance');

class Test {}
Test = savable()(Test);

describe('save-instance remove', () => {
    it('should remove instances', async () => {
        Test.saveInstance('A');
        Test.saveInstance('B');
        Test.saveInstance('C');

        let instances = null;
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(3);

        Test.removeInstance('A');
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(2);
        (instances.B).should.be.an.instanceOf(Test);
        (instances.C).should.be.an.instanceOf(Test);

        Test.removeInstance(instances.B);
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(1);

        (instances.C).should.be.an.instanceOf(Test);
    });
});

describe('save-instance remove all', () => {
    it('should remove all instances', async () => {
        const testA = Test.saveInstance('A');
        const testB = Test.saveInstance('B');

        let instances = null;
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(3);

        Test.removeAllInstances();
        instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(0);
    });
});
