# pdf-from-html
pdf-from-html is a nodejs library to transform an html (possibly from [markdown-it](https://markdown-it.github.io/)) in a PDF.

## Installation

Install it with npm or yarn.

```bash
npm install pdf-from-html
```

```bash
yarn add pdf-from-html
```

## Usage

It's possible to use it from command line

```bash
pdf-from-html docs/ somefile.html
```
as npm script
```bash
"scripts": {
    "pdf": "pdf-from-html docs/ somefile.html"
},
```
or as part of your nodejs app
```js
import { generatePDF } from 'pdf-from-html';
// or
// const generatePDF = require('pdf-from-html').generatePDF;
// and then just call the method
generatePDF(outputDir, outputFileName, inputContent);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[Apache-2.0](LICENSE.md)