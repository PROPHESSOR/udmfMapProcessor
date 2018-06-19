/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

module.exports = class Line {
    constructor(line, json) { // line - block
        this.sidefront = Line.find(json, 'sidedef', line.sidefront);
        this.sideback = line.sideback
            ? Line.find(json, 'sidedef', line.sideback)
            : null;
        this.frontsector = Line.find(json, 'sector', this.sidefront.sector);
        this.backsector = this.sideback
            ? Line.find(json, 'sector', this.sideback.sector)
            : null;
    }
    
    toString() {
        return JSON.stringify(this, 0, 4);
    }

    get direction() { // TODO:
        return [0, 0]; // x, y [-1, 1]
    }

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
}