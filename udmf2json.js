/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const fs = require('fs');

const IN_FILE = 'test/test.udmf';
const OUT_FILE = 'test/test.json';

module.exports = {
    udmf2json(infile, outfile) {
        const file = '[\n' +
            fs.readFileSync(infile, 'utf8')
                .replace(/(\/\/|namespace).+?\n/g, '')                                      // Remove comments
                .replace(/=/g, ': ')                                                        // = -> :
                .replace(/;/g, ',')                                                         // ; -> ,
                .replace(/(linedef|sidedef|vertex|sector|thing)\s*\n*{/g, '["$1", {')       // XXX{ -> ["XXX", {]
                .replace(/}/g, '}], ')                                                      // } -> }], 
                .replace(/\n(.+?):/g, '"$1":')                                              // v1: -> "v1":
                .replace(/,(\s*\n*\s*})/g, '$1')                                            // Remove last "," (attributes)
                .replace(/,\s*$/, '')                                                       // Remove last "," (file)
        + '\n]';
    
        fs.writeFileSync(outfile, file);
    
        return JSON.parse(file);
    },
    json2udmf(infile, outfile) {
        const file = typeof infile === 'string' ? require(infile) : infile;

        let out = '// Generated by PROPHESSOR\'s udmf2json converter\nnamespace = "zdoom";\n';
    
        for(const block of file) {
            out += block[0] + '\n{\n';
    
            for(const key in block[1]) {
                const value = block[1][key];
    
                out += `    ${key} = ${typeof value === 'string' ? `"${value}"` : value};\n`;
            }
    
            out += '}\n\n';
        }

        if(outfile) fs.writeFileSync(outfile, out);
    
        return out;
    },
    jsonDecompress(json) {
        const out = {
            linedefs: [],
            sidedefs: [],
            things: [],
            sectors: []
        }

        for(const block of json) {
            out[block[0]].push(block[1]); // TODO: try/catch
        }

        return out;
    },
    jsonCompress(json) {
        return console.warn('jsonCompress doesn\'t implemented!'); //TODO:
    }
}

if(!module.parent) return module.exports(IN_FILE, OUT_FILE);