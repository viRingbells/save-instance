/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const instances = require('..');

class Test {}
instances(Test);

describe('save-instance', () => {
    const originA = new Test();
    const originB = new Test();

    it('should save the instance', done => {
        originA.saveInstance('A');
        originB.saveInstance('B');

        const instances = Test.allInstances();
        Object.keys(instances).length.should.be.exactly(2);
        instances.A.should.be.exactly(originA);
        instances.B.should.be.exactly(originB);

        done();
    });

    it('should return the right instance', done => {
        Test.getInstance('A').should.be.exactly(originA);
        Test.getInstance('B').should.be.exactly(originB);

        done();
    });
});

