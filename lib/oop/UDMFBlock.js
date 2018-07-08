/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

module.exports = class UDMFBlock {
    constructor(udmfblock) {
        if (!(udmfblock instanceof Array || udmfblock instanceof UDMFBlock)) throw new TypeError('UDMFBlock must be a Array');

        [this[0], this[1]] = udmfblock;
        this.blocktype = udmfblock[0];
        Object.assign(this, udmfblock);
    }

    toUDMFArrayBlock() {
        return [this[0], this[1]];
    }

    toString() {
        return `[UDMF Block <${this[0]}>]`;
    }

    *[Symbol.iterator]() {
        yield this[0];
        yield this[1];
    }


    [Symbol.toStringTag]() {
        return this.toString();
    }

    [Symbol.toPrimitive]() {
        return this.toString();
    }

    /** Ищет блок в udmf.json массиве и возвращает его
     * @param  {array} json - udmf.json массив
     * @param  {string} blockname - Тип блока
     * @param  {number} no - Номер блока
     * @returns {array} udmf.json блок
     */
    static find(json, blockname, no) {
        let i = 0;

        for(const block of json) {
            if(block[0] === blockname) {
                if(no === i) return block[1];
                i++;
            }
        }

        return null;
    }
};