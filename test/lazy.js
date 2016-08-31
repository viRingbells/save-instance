/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const instances = require('..');

describe('save-instance lazy mode', () => {
    it('should be intialized in the first use', done => {
        let initialized = 0;
        class Test {
            constructor () {
                initialized++;
            }
        }
        instances(Test);

        Test.saveLazyInstance("A");
        Test.saveLazyInstance("B");

        initialized.should.be.exactly(0);
        Test.getInstance('A');
        initialized.should.be.exactly(1);

        Test.getInstance('B');
        Test.getInstance('B');
        initialized.should.be.exactly(2);

        Test.saveInstance("B");
        initialized.should.be.exactly(3);

        Test.saveLazyInstance(Test.defaultInstanceName());
        initialized.should.be.exactly(3);

        Object.keys(Test.allInstances()).length.should.be.exactly(2);

        done();
    });
});

