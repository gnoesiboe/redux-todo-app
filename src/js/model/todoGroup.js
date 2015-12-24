import Model from './../model';
import TodoCollection from './../collection/todoCollection';
import _ from 'lodash';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoGroup extends Model {

    /**
     * @param {String} cid
     * @param {String} title
     * @param {TodoCollection} todos
     */
    constructor(cid, title, todos) {
        super({
            cid: cid,
            title: title,
            todos: todos,
            isStarred: false,
            isCurrent: false
        });
    }

    /**
     * @param {Todo} todo
     *
     * @returns {TodoGroup}
     */
    addTodo(todo) {
        this.get('todos').add(todo);

        return this;
    }

    /**
     * @returns {TodoGroup}
     */
    clone() {
        var out = new TodoGroup(this.get('cid'), this.get('title'), this.get('todos').clone());

        out.set('isStarred', !!this.get('isStarred', false));
        out.set('isCurrent', !!this.get('isCurrent', false));

        return out;
    }

    /**
     * @returns {Object}
     */
    toNative() {
        return _.clone(this.getData(), true, function (value) {
            if (typeof value.toNative !== 'undefined') {
                return value.toNative();
            }
        });
    }

    /**
     * @param {Object} nativeInput
     *
     * @return {TodoGroup}
     */
    static fromNative(nativeInput) {

        // normalize input
        nativeInput = _.extend({
            cid: null,
            title: null,
            todos: new TodoCollection(),
            isStarred: false,
            isCurrent: false
        }, nativeInput);

        nativeInput.todos = TodoCollection.fromNative(nativeInput.todos);

        // re-create todo group
        var out = new TodoGroup(nativeInput.cid, nativeInput.title, nativeInput.todos)

        out.set('isStarred', nativeInput.isStarred);
        out.set('isCurrent', nativeInput.isCurrent);

        return out;
    }
}

export default TodoGroup;
