/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const Config = {
    'lang': 'en'
};

module.exports = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'lang',
            message: 'Select language:',
            default: 'en',
            choices: require('../lang/langs.json')
        },
    ]).then(res => {
        const { lang } = res;
        let Lang = null;
        try {
            Lang = require(`../lang/${lang}.json`);
        } catch(e) {
            console.error(e);
            return console.error(chalk.red(`\n\nError reading file: ./lang/${Config.lang}.json.\nCheck the lang field in the file ./config.json`));
        }

        Config.lang = lang;
        try {
            fs.writeFileSync(path.join(__dirname, '..', 'config.json'), JSON.stringify(Config, null, 4), 'utf8');
        } catch(e) {
            console.error(chalk.red(`${Lang.error.writefile} ../config.json`));
        }
        console.info(chalk.green(Lang.Config.log.success));
        console.info(chalk.yellow(Lang.Config.log.restart));
        process.exit(0);
    });
};