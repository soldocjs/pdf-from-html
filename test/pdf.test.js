const path = require('path');
const fs = require('fs');
const util = require('util');
const promisify = util.promisify;
const { info, pdfToText } = require('pdf-to-text');
const { expect } = require('chai');
const { generatePDF } = require('../src/index');

const promiseInfo = promisify(info);
const promisePdfToText = promisify(pdfToText);

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
                'h1 Heading',
                'h2 Heading',
                'h3 Heading',
                'h4 Heading',
                'h5 Heading',
                'h6 Heading',
                'Horizontal Rules',
                'Typographic replacements\nEnable typographer option to see result.',
                // '©©®®™™§§±',
                'test… test… test… test?.. test!..',
                '!!! ??? , – —',
                '“Smartypants, double quotes” and ‘single quotes’',
                'This is bold text',
                'This is bold text',
                'This is italic text',
                'This is italic text',
                'Strikethrough',
                'Blockquotes',
            ];
            // log pdf info
            const info = await promiseInfo(pdfPath);
            console.log(info);
            // verify
            const data = await promisePdfToText(pdfPath);
            for (let c = 0; c < content.length; c += 1) {
                expect(data.indexOf(content[c]) > -1).to.be.true;
            };
        }).timeout(20000);
    });
});
