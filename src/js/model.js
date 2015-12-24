/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class Model {

    /**
     * @param {Object} data
     */
    constructor(data) {
        this.setData(data);
    }

    /**
     * @param {String} key
     * @param {*} value
     */
    set(key, value) {
        this._data[key] = value;
    }

    /**
     * @param {String} key
     * @param {*} value
     *
     * @returns {boolean}
     */
    is(key, value) {
        return this.has(key) ? this.get(key) === value : false;
    }

    /**
     * @param {Object} data
     */
    setData(data) {
        this._data = data;
    }

    /**
     * @returns {Object}
     */
    getData() {
        return this._data;
    }

    /**
     * @param {String} key
     * @param {*} defaultValue
     *
     * @returns {*}
     */
    get(key, defaultValue = undefined) {
        return this.has(key) ? this._data[key] : defaultValue;
    }

    /**
     * @param {String} key
     *
     * @returns {boolean}
     */
    has(key) {
        return typeof this._data[key] !== 'undefined';
    }
}

export default Model;
