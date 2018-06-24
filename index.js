/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const IN_FILE = 'input/TEXTMAP';
const OUT_FILE = 'output/TEXTMAP';

const fs = require('fs');
const path = require('path');

const Script = require('./Script');

const { udmf2json, json2udmf, jsonCompress, jsonDecompress } = require('./udmf2json');
const packagejson = require('./package.json');

console.info(`
 #====== UDMF Map Processor ======#
        v.${packagejson.version} by PROPHESSOR
 #====== ------------------ ======#

`);

const udmfarray = udmf2json(IN_FILE, OUT_FILE);
const udmfobject = jsonDecompress(udmfarray);

console.log('Подключение скриптов...');

const scripts = [];
{
    const scriptpath = path.join(__dirname, 'scripts');
    let folderdata = null;
    try {
        folderdata = fs.readdirSync(scriptpath);
    } catch (e) {
        console.error(e);
        return console.error(`\n\nНевозможно прочитать содержимое папки по пути ${scriptpath}!\n`);
    }

    for (const scriptfolder of folderdata) {
        scripts.push(new Script(path.join(scriptpath, scriptfolder)));
    }
}

console.log('Обработка карты...');
{
    let i = 0;
    for (const script of scripts) {
        console.log(`> [${Math.floor(i++ / scripts.length * 100)}%]: Обработка скриптом ${script.name}`);
        Object.assign(udmfarray, script.run(udmfarray, udmfobject));
    }
}

json2udmf(jsonCompress(jsonDecompress(udmfarray)), OUT_FILE);

console.info('> [100%]: Обработка карты завершена!');
console.info(`Путь к файлу: ${OUT_FILE}`);