/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

module.exports = class Thing {
    constructor(xyz, type) {
        [this.x, this.y, this.z] = xyz;
        this.type = type;
    }

    toArray() {
        return [
            "thing", {
                "x": this.x, "y": this.y, "type": this.type, "coop": true, "dm": true, "single": true, "skill1": true, "skill2": true, "skill3": true, "skill4": true, "skill5": true
            }];
    }

    toString() {
        return this[Symbol.toPrimitive]();
    }

    [Symbol.toStringTag]() {
        return this[Symbol.toPrimitive]();
    }

    [Symbol.toPrimitive]() {
        let out = `thing//#${this._id}\n{\n`;

        for (const key in this) {
            if (key[0] === '_') continue;
            out += `${key}=${this[key]};\n`;
        }

        out += '}\n';

        return out;
    }
}