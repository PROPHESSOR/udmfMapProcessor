/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const UDMFBlock = require('./UDMFBlock');
const Line = require('./Line');

module.exports = class Sector extends UDMFBlock {
    constructor(udmfblock, udmfarray) {
        super(udmfblock);

        this.udmfblock = udmfblock;
        this.udmfarray = udmfarray;
    }

    get id() {
        return this.udmfblock.id;
    }

    get lines() {
        if (typeof this._lines === 'undefined')
            this._lines = this.udmfarray.filter(e => e[0] === 'linedef' && e[1].sector === this.id).map(e => new Line(new UDMFBlock(e), this.udmfarray));
        return this._lines;
    }
};