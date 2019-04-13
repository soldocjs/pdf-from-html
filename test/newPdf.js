const expect = require('expect.js');
const { generatePDF } = require('../src/index');


describe('MapComments', () => {
    const filePath = 'test/example.html';

    describe('generate with success', () => {
        it('generate a file with success', () => {
            // verify
            generatePDF(filePath);
        });
        
    });
});
