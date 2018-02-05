/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const instances = require('..');

describe('save-instance', () => {
    it('should throw error if class has duplicated functions', done => {
        let error = {};
        class Test {
            static getInstance () {}
        }
        try {
            instances(Test);
        }
        catch (e) {
            error = e;
        }
        error.should.be.an.instanceOf(Error).with.property('message', 'Can not decorate class ' + Test.name + ' due to duplicated properties');

        done();
    });

});

