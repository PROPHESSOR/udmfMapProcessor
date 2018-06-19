/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const IN_FILE = 'test/test.udmf';
const OUT_FILE = 'test/test.out.udmf';

const Line = require('./structures/Line')
const { udmf2json, json2udmf } = require('./udmf2json');

const file = udmf2json(IN_FILE, OUT_FILE);

const lines = [];

for (const block of file) {
    if (block[0] === 'linedef') {
        const line = new Line(block[1], file);
        lines.push(line);
        console.log(line)
    }
}