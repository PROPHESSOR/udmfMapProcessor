/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const IN_FILE = 'test/test.udmf';
const OUT_FILE = 'test/test.out.udmf';

const fs = require('fs');
const path = require('path');

const Line = require('./structures/Line');
const Thing = require('./structures/Thing');
const Script = require('./Script');

const { udmf2json, json2udmf, jsonCompress, jsonDecompress } = require('./udmf2json');

const file = udmf2json(IN_FILE, OUT_FILE);

const lines = [];

for (const block of file) {
    if (block[0] === 'linedef') {
        const line = new Line(block[1], file);
        lines.push(line);
        // console.log(line)
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
            const lineAvg = line.avg();
            file.push((new Thing(lineAvg, 56)).toArray());
        }
    }
}

const scripts = [];
{
    const scriptpath = path.join(__dirname, 'scripts');
    let folderdata = null;
    try {
        folderdata = fs.readdirSync(scriptpath);
    } catch(e) {
        console.error(e);
        return console.error(`\n\nНевозможно прочитать содержимое папки по пути ${scriptpath}!\n`)
    }

    for(const scriptfolder of folderdata) {
        scripts.push(new Script(path.join(scriptpath, scriptfolder)));
    }
}

json2udmf(jsonCompress(jsonDecompress(file)), OUT_FILE);