import React from 'react';
import * as reactRedux from 'react-redux';
import * as actionFactory from '../../actions/actionFactory';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class AppComponent extends React.Component {

    /**
     * @param {Object} event
     *
     * @private
     */
    _onClick(event) {
        event.preventDefault();

        this.props.dispatch(actionFactory.createSomeAction());
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <h1>@todo</h1>
                <a href="#" onClick={this._onClick.bind(this)}>@todo</a>
            </div>
        );
    }
}

/**
 * @param {Object} completeState
 *
 * @returns {Object}
 */
var mapCompleteStateToAppComponentProps = function (completeState) {
    return {
        someKey: completeState.someKey
    }
};

export default reactRedux.connect(mapCompleteStateToAppComponentProps)(AppComponent);
