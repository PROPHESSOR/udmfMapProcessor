/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const UDMFBlock = require('./UDMFBlock');

module.exports = class Line extends UDMFBlock {               // TODO:Direction
    constructor(udmfblock, udmfarray) {
        super(udmfblock);

        this.udmfblock = udmfblock;
        this.udmfarray = udmfarray;
    }

    get v1() {
        if (typeof this._v1 === 'undefined')
            this._v1 = new UDMFBlock(this.udmfarray.filter(e => e[0] === 'vertex')[this.udmfblock.v1]);
        return this._v1;
    }

    get v2() {
        if (typeof this._v2 === 'undefined')
            this._v2 = new UDMFBlock(this.udmfarray.filter(e => e[0] === 'vertex')[this.udmfblock.v2]);
        return this._v2;
    }

    get front() {
        if (typeof this._front === 'undefined')
            this._front = new UDMFBlock(this.udmfarray.filter(e => e[0] === 'sidedef')[this.udmfblock.sidefront]);
        return this._front;
    }

    get back() {
        if (typeof this.udmfblock.sideback === 'undefined' || this.udmfblock.sideback === -1) return null;
        if (typeof this._back === 'undefined')
            this._back = new UDMFBlock(this.udmfarray.filter(e => e[0] === 'sidedef')[this.udmfblock.sideback]);
        return this._back;
    }

    /** Возвращает координаты середины линии
     * @returns {array} [x, y]
     */
    get avg() {
        return [(this.v1.x + this.v2.x) / 2, (this.v1.y + this.v2.y) / 2];
    }
};