const fs = require('fs');
const { generatePDF } = require('../src/index');


describe('MapComments', () => {
    describe('generate with success', () => {
        it('generate a file with success', async () => {
            // verify
            const exampleContent = String(fs.readFileSync('test/example.html'));
            await generatePDF('test/result', 'example.html', exampleContent);
        }).timeout(10000);
    });
});
