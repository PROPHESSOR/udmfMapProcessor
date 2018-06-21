/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const fs = require('fs');
const path = require('path');

module.exports = class Script {
    /**
     * @constructor
     * @param  {string} folder - Путь к папке скрипта
     */
    constructor(folder) {
        if(!folder) throw new Error('[Script.js->constructor]: Скрипт должен иметь путь');

        let umpscript = null;
        const umpscriptpath = path.join(folder, 'umpscript.json');

        try {
            umpscript = require(umpscriptpath);
        } catch (e) {
            console.error(e);
            return console.error(`\n\nНевозможно прочитать файл по пути ${umpscriptpath}!\n`)
        }

        {
            const validator = {
                "name": "string",
                "author": "string",
                "version": "string",
                "description": "string",
                "url": "string",
                "main": "string",
                "dependencies": "object"
            }

            for(const key in umpscript) {
                if(validator[key] && typeof umpscript[key] !== validator[key]) return console.error(`\nОшибка в файле ${umpscriptpath}! Тип поля ${key} должно быть ${validator[key]}\n`);
            }
        }

        Object.assign(this, umpscript);

        const mainpath = path.join(folder, umpscript.main);
        try {
            this.run = require(mainpath)
        } catch(e) {
            console.error(e);
            return console.error(`\n\nНевозможно прочитать файл по пути ${umpscriptpath}!\n`)
        }

        console.info(`Скрипт "${this.name}" v.${this.version} от "${this.author}" успешно активирован!`);
    }
}

if(!module.parent) new module.exports(path.join(__dirname, './scripts/example/'));