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
        return Sortable.create(this.refs.sortableList, {
            group: this.props.sortGroup,
            draggable: this.props.draggableClassName,
            onAdd: this._onAddedToList.bind(this),
            onUpdate: this._onListUpdate.bind(this),
            animation: 100
        });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onAddedToList(event) {
        var itemEl = event.item;

        // as react throws errors when you move dom elements not using react (which is the case here), we undo
        // the effects and afterwards let react re-render to put the elements back where they were put. Somewhat
        // of a workaround but it seems to be the only way to get it to work.
        event.to.removeChild(itemEl);
        event.from.appendChild(itemEl);

        this._onListUpdate(event);
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
        this._sorter = null;
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
