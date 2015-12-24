import _ from 'lodash';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class Collection {

    /**
     * @param {Array} items
     */
    constructor(items = []) {
        this._items = items;
    }

    /**
     * @param {Function} callback
     * @param {*} defaultValue
     *
     * @returns {Number}
     */
    locateFirst(callback, defaultValue = null) {
        var result = this.locate(callback);

        return result.length > 0 ? result[0] : defaultValue;
    }

    /**
     * @param {Number} index
     * @param {*=} defaultValue
     *
     * @returns {*}
     */
    getFirstLocatedAfter(index, defaultValue = null) {
        if (this.count() === 0) {
            return defaultValue;
        }

        return this.has(index + 1) ? this.get(index + 1) : this.get(0);
    }

    /**
     * @param {Number} index
     * @param {*} defaultValue
     *
     * @returns {*}
     */
    getFirstLocatedBefore(index, defaultValue = null) {
        if (this.count() === 0) {
            return defaultValue;
        }

        return this.has(index - 1) ? this.get(index - 1) : this.get(this.count() - 1);
    }

    /**
     * @param {Function} callback
     *
     * @returns {Number[]}
     */
    locate(callback) {
        var out = [];

        for (let i = 0, l = this._items.length; i < l; i++) {
            if (callback(this._items[i]) === true) {
                out.push(i);
            }
        }

        return out;
    }

    /**
     * @returns {Array}
     */
    all() {
        return this._items;
    }

    /**
     * @param {*} item
     * @param {Number=} atIndex
     *
     * @return {Collection}
     */
    add(item, atIndex = null) {
        if (_.isNumber(atIndex)) {
            this._items.splice(atIndex, 0, item);
        } else {
            this._items.push(item);
        }

        return this;
    }

    /**
     * @param {Number} index
     * @param {*} defaultValue
     *
     * @returns {*}
     */
    get(index, defaultValue = null) {
        return this.has(index) ? this._items[index] : defaultValue;
    }

    /**
     * @param {Number} index
     *
     * @returns {boolean}
     */
    has(index) {
        return typeof this._items[index] !== 'undefined';
    }

    /**
     * @param {Number} index
     *
     * @returns {Collection}
     */
    remove(index) {
        if (typeof this._items[index] == 'undefined') {
            return this;
        }

        this._items.splice(index, 1);

        return this;
    }

    /**
     * @param {Number} fromIndex
     * @param {Number} toIndex
     *
     * @returns {Collection}
     */
    moveItem(fromIndex, toIndex) {
        var item = this.get(fromIndex, null);

        if (item === null) {
            throw new Error(`From index ${fromIndex} does not exist`);
        }

        // remove item from list
        this._items.splice(fromIndex, 1);

        // re-add item at the other position
        this._items.splice(toIndex, 0, item);

        return this;
    }

    /**
     * @param {*} item
     *
     * @returns {Collection}
     */
    push(item) {
        this._items.push(item);

        return this;
    }

    /**
     *  @param {Function} callback
     *
     * @returns {Collection}
     */
    forEach(callback) {
        for (let i = 0, l = this._items.length; i < l; i++) {
            callback(this._items[i], i);
        }

        return this;
    }

    /**
     * @param {Function} callback
     *
     * @returns {Array}
     */
    map(callback) {
        var out = [];

        for (let i = 0, l = this._items.length; i < l; i++) {
            out.push(callback(this._items[i], i));
        }

        return out;
    }

    /**
     * @returns {Number}
     */
    count() {
        return this._items.length;
    }

    /**
     * @returns {*[]}
     */
    toNative() {
        return this._items.map(function (item) {
            return typeof item.toNative !== 'undefined' ? item.toNative() : item;
        });
    }

    /**
     * @param {Array} items
     *
     * @returns {Collection}
     */
    static createInstance(items) {
        return new Collection(items);
    }
}

export default Collection;
