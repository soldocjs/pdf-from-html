#!/usr/bin/env node


const meow = require('meow');
const { generatePDF } = require('../src/index');

const helpMessage = `
Usage
    $ pdf-from-html <file>

Options
    --help, -h  To get help

Examples
    $ pdf-from-html sample.html
`;

const cli = meow(helpMessage);
generatePDF(String(cli.input));
