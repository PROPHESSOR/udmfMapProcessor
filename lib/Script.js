/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const path = require('path');
const chalk = require('chalk');

const Config = require('../config.json');
const Lang = require(`../lang/${Config.lang}.json`);

module.exports = class Script {
    /**
     * @constructor
     * @param  {string} folder - Путь к папке скрипта
     */
    constructor(folder) {
        if(!folder) throw new Error(chalk.red(`[Script.js->constructor]: ${Lang.Script.error.must_have_path}`));

        let umpscript = null;
        const umpscriptpath = path.join(folder, 'umpscript.json');

        try {
            umpscript = require(umpscriptpath);
        } catch (e) {
            console.error(e);
            return console.error(chalk.red(`\n\n${Lang.error.readfile} ${umpscriptpath}!\n`));
        }

        {
            const validator = {
                'name': 'string',
                'author': 'string',
                'version': 'string',
                'description': 'string',
                'url': 'string',
                'main': 'string',
                'dependencies': 'object'
            };

            for(const key in umpscript) {
                if(validator[key] && typeof umpscript[key] !== validator[key]) {
                    console.error(chalk.red(`\n${Lang.error.infile} ${umpscriptpath}! ${Lang.Script.error.type_error.replace(/\${key}/g, key).replace(/\${value}/g, validator[key])}\n`));
                    return process.exit(1);
                }
            }
        }

        Object.assign(this, umpscript);

        const mainpath = path.join(folder, umpscript.main);
        try {
            this.run = require(mainpath);
        } catch(e) {
            console.error(e);
            return console.error(chalk.red(`\n\n${Lang.error.readfile} ${umpscriptpath}!\n`));
        }

        console.info(chalk.green(Lang.Script.log.success.replace(/\${name}/g, this.name).replace(/\${version}/g, this.version).replace(/\${author}/g, this.author)));
    }
};

if(!module.parent) new module.exports(path.join(__dirname, './scripts/example/'));