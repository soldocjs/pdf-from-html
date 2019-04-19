#!/usr/bin/env node

const fs = require('fs');
var path = require('path');
const meow = require('meow');
const { generatePDF } = require('../index');

const helpMessage = `
Usage
    $ pdf-from-html <output-folder> <file>

Options
    --help, -h  To get help

Examples
    $ pdf-from-html docs/ sample.html
`;

const cli = meow(helpMessage);
if (cli.input.length > 1) {
    const filename = path.parse(cli.input[1]).name;
    generatePDF(cli.input[0], filename, String(fs.readFileSync(cli.input[1])));
} else {
    console.error('Some fields are missing!');
    console.log(cli.help);
}
