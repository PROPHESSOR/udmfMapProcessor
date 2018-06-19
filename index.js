/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const IN_FILE = 'test/test.udmf';
const OUT_FILE = 'test/test.out.udmf';

const {udmf2json, json2udmf} = require('./udmf2json');

const file = udmf2json(IN_FILE, OUT_FILE);
