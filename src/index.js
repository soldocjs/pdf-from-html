const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');


const templateFile = 'template/index.html';

/**
 * Transform an input into a pdf considering the input in the body
 * of an HTML page.
 * @param outputDir output folder path
 * @param outputFile output filename
 * @param inputContent content to be rendered
 */
exports.generatePDF = (outputDir, outputFile, inputContent) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            const destinationDocsFolderPath = path.join(process.cwd(), outputDir);
            if (!fs.existsSync(destinationDocsFolderPath)) {
                fs.mkdirSync(destinationDocsFolderPath, { recursive: true });
            }
            // write it to a file
            let outputFileName;
            if (path.extname(outputFile).length > 0) {
                outputFileName = path.parse(outputFile).name;
            } else {
                outputFileName = outputFile;
            }
            const outputHTMLFilePath = path.join(process.cwd(), outputDir, `${outputFileName}.tmp.html`);
            const outputPDFFilePath = path.join(process.cwd(), outputDir, `${outputFileName}.pdf`);
            fs.writeFileSync(outputHTMLFilePath, output);
            // now, go to page
            await page.goto(`file://${outputHTMLFilePath}`, { waitUntil: 'networkidle2' });
            await page.emulateMedia('screen');
            // generate the pdf
            await page.pdf({ path: outputPDFFilePath, format: 'A4' });
            // close the browser
            await browser.close();
        } catch(e) {
            reject(e);
        }
        resolve(0);
    });
}