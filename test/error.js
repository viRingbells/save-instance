/**
 * Test of save-instance
 **/
'use strict';

const debug     = require('debug')('save-instance.test');
const savable   = require('save-instance');

describe('save-instance', () => {
    it('should throw error if class has duplicated functions', async () => {
        let error = {};
        class Test {
            static getInstance () {}
        }
        try {
            savable()(Test);
        }
        catch (e) {
            error = e;
        }
        error.should.be.an.instanceOf(Error).with.property('message', 'Can not decorate class ' + Test.name + ' due to duplicated properties');
    });

});

