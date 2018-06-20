/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

module.exports = class Line {
    /**
     * @constructor
     * @param  {array} line - udmf.json блок линии
     * @param  {array} json - udmf.json
     */
    constructor(line, json) { // line - block
        this.v1 = Line.find(json, 'vertex', line.v1);
        this.v2 = Line.find(json, 'vertex', line.v2);
        this.sidefront = Line.find(json, 'sidedef', line.sidefront);
        this.sideback = line.sideback
            ? Line.find(json, 'sidedef', line.sideback)
            : null;
        this.frontsector = Line.find(json, 'sector', this.sidefront.sector);
        this.backsector = this.sideback
            ? Line.find(json, 'sector', this.sideback.sector)
            : null;
    }
    
    /** Возвращает координаты середины линии
     * @returns {array} [x, y]
     */
    avg() {
        return [(this.v1.x + this.v2.x) / 2, (this.v1.y + this.v2.y) / 2];
    }
    
    /** JSON.stringify
     */
    toString() {
        return JSON.stringify(this, 0, 4);
    }
    
    /** TODO:
     * Возвращает направление линии
     * @returns {array} [x, y] [-1, 1]
     */
    get direction() {
        return [0, 0]; // x, y [-1, 1]
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

    static getSectorVertexes() {
        // TODO:
    }
}