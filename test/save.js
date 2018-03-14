/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const savable   = require('save-instance');

class Test {}
Test = savable()(Test);

describe('save-instance', () => {
    const originA = new Test();
    const originB = new Test();

    it('should save the instance', async () => {
        originA.saveInstance('A');
        originB.saveInstance('B');

        const instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(2);
        instances.A.should.be.exactly(originA);
        instances.B.should.be.exactly(originB);
    });

    it('should return the right instance', async () => {
        Test.getInstance('A').should.be.exactly(originA);
        Test.getInstance('B').should.be.exactly(originB);
    });
});

