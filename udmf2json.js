/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const fs = require('fs');

const IN_FILE = 'test/test.udmf';
const OUT_FILE = 'test/test.json';

module.exports = (infile, outfile) => {
    const file = fs.readFileSync(infile, 'utf8');

    file
        .replace(/\/\/.+?$/, '');

    fs.writeFileSync(outfile, file);
}

if(!module.parent) return module.exports(IN_FILE, OUT_FILE);