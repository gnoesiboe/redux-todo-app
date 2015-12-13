import React from 'react';
import Sortable from 'sortablejs';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class SortableListComponent extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this._sorter = null;
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this._sorter = this._createSorter();
    }

    /**
     * @returns {Object}
     *
     * @private
     */
    _createSorter() {
        var _onUpdateListener = this._onListUpdate.bind(this);

        return Sortable.create(this.refs.sortableList, {
            group: this.props.sortGroup,
            draggable: this.props.draggableClassName,
            onAdd: _onUpdateListener,
            onUpdate: _onUpdateListener
        })
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onListUpdate(event) {
        var oldGroupIdentifier = event.from.getAttribute('data-sort-group-id'),
            newGroupIdentifier = event.to.getAttribute('data-sort-group-id');

        var oldIndex = event.oldIndex,
            newIndex = event.newIndex;

        this.props.onUpdate(oldGroupIdentifier, newGroupIdentifier, oldIndex, newIndex);
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        this._sorter.destroy();
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <ul className={this.props.className}
                ref="sortableList"
                data-sort-group-id={this.props.sortGroupIdentifier}>

                {this.props.children}
            </ul>
        );
    }
}

SortableListComponent.propTypes = {
    sortGroupIdentifier: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    sortGroup: React.PropTypes.string.isRequired,
    draggableClassName: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func.isRequired
};

export default SortableListComponent;
