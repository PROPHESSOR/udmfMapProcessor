// Copyright (c) 2018 PROPHESSOR
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use strict';

const Thing = require('../../structures/Thing');

const lighttextures = ['LITE3'];

module.exports = function (udmfarray, udmfobject, lines) {
/*     for (const line of lines) {
        for (const texture of lighttextures) {
            if (line.sidefront.texturetop === texture
                || line.sidefront.texturemiddle === texture
                || line.sidefront.texturebottom === texture
                || (line.sideback && (
                    line.sideback.texturetop === texture
                    || line.sideback.texturemiddle === texture
                    || line.sideback.texturebottom === texture
                ))) {

                udmfarray.push((new Thing(line.avg, 56)).toArray());
            }
        }
    } */

    return udmfarray;
}