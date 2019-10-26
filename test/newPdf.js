const path = require('path');
const fs = require('fs');
const pdfUtil = require('pdf-to-text');
const { expect } = require('chai');
const { generatePDF } = require('../src/index');


describe('MapComments', () => {
    describe('generate with success', () => {
        it('generate a file with success', async () => {
            // generate
            const exampleContent = String(fs.readFileSync('test/example.html'));
            await generatePDF('test/result', 'example.html', exampleContent);
            // verify
            const pdfPath = path.join(process.cwd(), 'test/result', 'example.pdf');
            const content = [
                'Advertisement',
                'pica - high quality and fast image resize in browser.',
                'babelfish - developer friendly i18n with plurals support and easy syntax.',
                'You will like those projects!',
            ];
            // log pdf info
            pdfUtil.info(pdfPath, function(err, info) {
                if (err) throw(err);
                console.log(info);
            });
            // verify
            pdfUtil.pdfToText(pdfPath, (err, data) => {
                if (err) {
                    throw (err);
                }
                content.forEach((c) => {
                    expect(data.indexOf(c) > -1).to.be.true;
                });
            });
        }).timeout(10000);
    });
});
