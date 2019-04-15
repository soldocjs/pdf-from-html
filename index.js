const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');


const templateFile = 'template/index.html';

/**
 * Transform an input into a pdf considering the input in the body
 * of an HTML page.
 * @param filePathInput path for input file
 */
exports.generatePDF = (inputContent) => {
    (async () => {
        // start a browser with puppeter
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setJavaScriptEnabled(true);
        // we assume, the input received externally, only have the body
        // so here, we have a template in order to apply styles
        const templatePath = path.join(__dirname, templateFile);
        const templateContent = String(fs.readFileSync(templatePath));
        // put all data together
        const view = {
            content: inputContent,
        };
        // calls the render engine
        const output = Mustache.render(templateContent, view);
        // verify if the docs/ folder exist and creates it if not
        const destinationDocsFolderPath = `${process.cwd()}/docs/`;
        if (!fs.existsSync(destinationDocsFolderPath)) {
            fs.mkdirSync(destinationDocsFolderPath);
        }
        // write it to a file
        fs.writeFileSync(`${process.cwd()}/docs/output.html`, output);
        // now, go to page
        await page.goto('file://' + process.cwd() + '/docs/output.html', { waitUntil: 'networkidle2' });
        await page.emulateMedia('screen');
        // generate the pdf
        await page.pdf({ path: 'docs/output.pdf', format: 'A4' });
        // close the browser
        await browser.close();
    })();
}