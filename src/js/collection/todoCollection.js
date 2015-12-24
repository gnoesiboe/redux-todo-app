import _ from 'lodash';
import Collection from './../collection';
import Todo from './../model/todo';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoCollection extends Collection {

    /**
     * @param {String} cid
     *
     * @returns {Todo|null}
     */
    getOneWithCid(cid) {
        return this.first(
            function (todo) {
                return todo.is('cid', cid);
            },
            null
        );
    }

    /**
     * @param {String} cid
     *
     * @returns {Number}
     */
    locateOneWithCid(cid) {
        return this.locateFirst(
            function (todo) {
                console.log(todo);
                return todo.is('cid', cid);
            },
            null
        );
    }

    /**
     * @param {String} cid
     *
     * @returns {TodoCollection}
     */
    removeOneWithCid(cid) {
        var indexToRemove = this.locateOneWithCid(cid);

        if (indexToRemove === null) {
            return this;
        }

        this.remove(indexToRemove);

        return this;
    }

    /**
     * @return {Todo|null}
     */
    getCurrent() {
        return this.first(
            function (todo) {
                return todo.get('isCurrent', false) === true;
            },
            null
        )
    }

    /**
     * @return {Number|null}
     */
    locateCurrent() {
        return this.locateFirst(
            function (todo) {
                return todo.is('isCurrent', true);
            },
            null
        );
    }

    /**
     * @param {Function=} callback
     * @param {*=} defaultValue
     *
     * @returns {Todo|*}
     */
    first(callback = null, defaultValue = null) {
        if (callback) {
            var result = this.filter(callback);

            if (result.count() > 0) {
                return result.get(0);
            }

            return defaultValue;
        } else {
            return typeof this._items[0] !== 'undefined' ? this._items[0] : defaultValue;
        }
    }

    /**
     * @param {Function} callback
     *
     * @returns {TodoCollection}
     */
    filter(callback) {
        var out = [];

        for (let i = 0, l = this._items.length; i < l; i++) {
            let item = this._items[i];

            if (callback(item) === true) {
                out.push(item);
            }
        }

        return new TodoCollection(out);
    }

    /**
     * @returns {TodoCollection}
     */
    clone() {
        var clonedTodos = this._items.map(
            function (todo) {
                return todo.clone();
            }
        );

        return new TodoCollection(clonedTodos);
    }

    /**
     * @param {Array} nativeInput
     *
     * @return {TodoCollection}
     */
    static fromNative(nativeInput) {
        return new TodoCollection(
            nativeInput.map(function (nativeInputItem) {
                return Todo.fromNative(nativeInputItem);
            })
        )
    }
}

export default TodoCollection;
