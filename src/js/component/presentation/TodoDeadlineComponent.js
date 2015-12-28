import React from 'react';
import moment from 'moment';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoDeadlineComponent extends React.Component {

    /**
     * @returns {XML|null}
     */
    render() {
        if (!this.props.value) {
            return null;
        }

        var date = moment(this.props.value);

        var today = moment(),
            tomorrow = today.clone().add(1, 'days');

        var deadline = null;
        if (date.isSame(today, 'day')) {
            deadline = 'today';
        } else if (date.isSame(tomorrow, 'day')) {
            deadline = 'tomorrow';
        } else {
            deadline = date.format('MM/DD');
        }

        var startOfToday = moment().startOf('day');

        var className = null;
        if (this.props.isCompleted) {
            className = '';
        } else {
            className = 'alert alert-sm' + (date.isBefore(startOfToday) ? ' alert-danger' : ' alert-info');
        }

        return (
            <span>
                <span className={className}>{deadline}</span>
                <span className="text-muted">&nbsp;&mdash;&nbsp;</span>
            </span>
        );
    }
}

TodoDeadlineComponent.propTypes = {
    value: React.PropTypes.string,
    isCompleted: React.PropTypes.bool.isRequired
};

export default TodoDeadlineComponent;
