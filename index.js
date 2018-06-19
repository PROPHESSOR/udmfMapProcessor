/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const IN_FILE = 'test/test.udmf';
const OUT_FILE = 'test/test.out.udmf';

const Line = require('./structures/Line');
const Thing = require('./structures/Thing');
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

const lighttextures = ['LITE3'];

for (const line of lines) {
    for (const texture of lighttextures) {
        if (line.sidefront.texturetop === texture
            || line.sidefront.texturemiddle === texture
            || line.sidefront.texturebottom === texture
            || (line.sideback && (
                line.sideback.texturetop === texture
                || line.sideback.texturemiddle === texture
                || line.sideback.texturebottom === texture
            ))) {
            console.log(1);
            const lineAvg = line.avg();
            file.push((new Thing(lineAvg, 56)).toArray());
        }
    }
}

json2udmf(file, OUT_FILE);