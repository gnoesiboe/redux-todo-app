import Model from './../model';
import _ from 'lodash';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class Todo extends Model {

    /**
     * @param {String} cid
     * @param {String} title
     */
    constructor(cid, title) {
        super({
            cid: cid,
            title: title,
            deadline: null,
            isCompleted: false,
            isCurrent: false,
            isBeingEdited: false
        });
    }

    /**
     * @returns {Todo}
     */
    clone() {
        var out = new Todo(this.get('cid'), this.get('title'));

        out.set('isCompleted', !!this.get('isCompleted', false));
        out.set('isCurrent', !!this.get('isCurrent', false));
        out.set('deadline', this.get('deadline'));
        out.set('isBeingEdited', !!this.get('isBeingEdited'));

        return out;
    }

    /**
     * @returns {Object}
     */
    toNative() {
        return _.clone(this.getData());
    }

    /**
     * @param {Object} nativeInput
     *
     * @return {Todo}
     */
    static fromNative(nativeInput) {

        // normalize input
        nativeInput = _.extend({
            cid: null,
            title: null,
            deadline: null,
            isCompleted: false,
            isCurrent: false
        }, nativeInput);

        // re-create todo
        var out = new Todo(nativeInput.cid, nativeInput.title);

        out.set('isCompleted', nativeInput.isCompleted);
        out.set('isCurrent', nativeInput.isCurrent);
        out.set('deadline', nativeInput.deadline);
        out.set('isBeingEdited', nativeInput.isBeingEdited);

        return out;
    }
}

export default Todo;
