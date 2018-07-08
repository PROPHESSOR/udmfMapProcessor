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

const { UDMFBlock, Line, Sector } = require('./lib/oop');

let chalk = null;
let inquirer = null;
try {
    chalk = require('chalk');
    inquirer = require('inquirer');
} catch (e) {
    return console.error(chalk.red('You forgot to run the command: npm install'));
}

let Config = null;
try {
    Config = require('./config.json');
} catch (e) {
    return require('./lib/firstrun')();
}

let Lang = null;
try {
    Lang = require(`./lang/${Config.lang}.json`);
} catch (e) {
    return console.error(chalk.red(`Error reading file: ./lang/${Config.lang}.json.\nCheck the lang field in the file ./config.json`));
}

const Script = require('./lib/Script');

const { udmf2json, json2udmf, jsonCompress, jsonDecompress } = require('./lib/udmf2json');
const packagejson = require('./package.json');

console.info(`
 ${chalk.cyan(`#====== ${chalk.yellow('UDMF Map Processor')} ======#`)}
        ${chalk.yellow(`v.${packagejson.version} by PROPHESSOR`)}
 ${chalk.cyan(`#====== ${chalk.yellow('------------------')} ======#`)}

`);

const udmfarray = udmf2json(IN_FILE, OUT_FILE).map(e => {
    switch (e[0]) {
        case 'sector':
            return new Sector(e);
        case 'line':
            return new Line(e);
        default:
            return new UDMFBlock(e);
    }
});
const udmfobject = jsonDecompress(udmfarray);

console.log(chalk.cyan(Lang.log.connecting_scripts));

// Read the script folder
const scripts = [];
{
    const scriptpath = path.join(__dirname, 'scripts');
    let folderdata = null;
    try {
        folderdata = fs.readdirSync(scriptpath);
    } catch (e) {
        console.error(e);
        return console.error(`\n\n${Lang.error.readdir} ${scriptpath}!\n`);
    }

    for (const scriptfolder of folderdata) {
        scripts.push(new Script(path.join(scriptpath, scriptfolder)));
    }
}

// Scriptlist
{
    const choices = scripts.map(e => ({ name: `${e.name} v.${e.version} by ${e.author}`, value: e.name }));
    inquirer.prompt([
        {
            type: 'checkbox',
            name: 'scripts',
            message: Lang.question.select_scripts,
            choices
        },
    ]).then(ss => {
        const selectedScripts = scripts.filter((script) => ss.scripts.includes(script.name));
        console.log(chalk.cyan(Lang.log.processing_map));
        {
            let i = 0;
            for (const script of selectedScripts) {
                console.log(`${chalk.yellow('>')} [${Math.floor(i++ / selectedScripts.length * 100)}%]: ${chalk.cyan(`${Lang.log.script_process} ${script.name}`)}`);
                Object.assign(udmfarray, script.run(udmfarray, udmfobject));
            }
        }

        json2udmf(jsonCompress(jsonDecompress(udmfarray)), OUT_FILE);

        console.info(`${chalk.yellow('>')} [100%]: ${chalk.green(Lang.log.success)}!`);
        console.info(chalk.yellow(`${Lang.log.path_to_file}: ${OUT_FILE}`));
    });
}