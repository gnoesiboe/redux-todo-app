import Collection from './../collection';
import _ from 'lodash';
import TodoGroup from './../model/todoGroup';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoGroupCollection extends Collection {

    /**
     * @param {String} cid
     *
     * @returns {TodoGroup|null}
     */
    getOneWithCid(cid) {
        return this.first(
            function (todoGroup) {
                return todoGroup.is('cid', cid);
            },
            null
        );
    }

    /**
     * @param {String} cid
     *
     * @returns {boolean}
     */
    hasOneWithCid(cid) {
        return !!this.getOneWithCid(cid);
    }

    /**
     * @param {String} cid
     *
     * @returns {Number}
     */
    locateOneWithCid(cid) {
        return this.locateFirst(
            function (todoGroup) {
                return todoGroup.is('cid', cid);
            },
            null
        );
    }

    /**
     * @return {TodoGroup|null}
     */
    getCurrent() {
        return this.first(
            function (todoGroup) {
                return todoGroup.get('isCurrent', false) === true;
            },
            null
        )
    }

    /**
     * @return {Number|null}
     */
    locateCurrent() {
        return this.locateFirst(
            function (todoGroup) {
                return todoGroup.is('isCurrent', true);
            },
            null
        );
    }

    /**
     * @param {String} cid
     * @param {Number} steps
     *
     * @returns {TodoGroupCollection}
     */
    moveForwardWithCid(cid, steps = 1) {
        var currentIndex = this.locateFirst(
            function (todo) {
                return todo.is('cid', cid);
            },
            null
        );

        if (currentIndex === null) {
            return this;
        }

        this.moveItem(
            currentIndex,
            currentIndex + steps <= this.count() - 1 ? currentIndex + steps : 0
        );

        return this;
    }

    /**
     * @param {String} cid
     * @param {Number} steps
     *
     * @returns {TodoGroupCollection}
     */
    moveBackwardsWithCid(cid, steps = 1) {
        var currentIndex = this.locateFirst(
            function (todo) {
                return todo.is('cid', cid);
            },
            null
        );

        if (currentIndex === null) {
            return this;
        }

        this.moveItem(
            currentIndex,
            currentIndex - steps < 0 ? this.count() - 1 : currentIndex - steps
        );

        return this;
    }

    /**
     * @param {String} cid
     *
     * @returns {TodoGroupCollection}
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
     * @param {Function=} callback
     * @param {*=} defaultValue
     *
     * @returns {TodoGroup|*}
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
     * @returns {TodoGroupCollection}
     */
    filter(callback) {
        var out = [];

        for (let i = 0, l = this._items.length; i < l; i++) {
            let item = this._items[i];

            if (callback(item) === true) {
                out.push(item);
            }
        }

        return new TodoGroupCollection(out);
    }

    /**
     * @returns {TodoGroupCollection}
     */
    clone() {
        var clonedTodoGroups = this._items.map(function (todoGroup) {
            return todoGroup.clone();
        });

        return new TodoGroupCollection(clonedTodoGroups);
    }

    /**
     * @param {Array} nativeInput
     *
     * @returns {TodoGroupCollection}
     */
    static fromNative(nativeInput) {
        return new TodoGroupCollection(
            nativeInput.map(function (nativeInputItem) {
                return TodoGroup.fromNative(nativeInputItem);
            })
        );
    }
}

export default TodoGroupCollection;
