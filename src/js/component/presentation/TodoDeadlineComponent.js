import React from 'react';
import moment from 'moment';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoDeadlineComponent extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        if (!this.props.value) {
            return <span>-</span>;
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
            className = date.isBefore(startOfToday) ? 'alert-danger' : 'alert-info';
        }
        
        return (
            <span className={className}>
                {deadline}
            </span>
        );
    }
}

TodoDeadlineComponent.propTypes = {
    value: React.PropTypes.string,
    isCompleted: React.PropTypes.bool.isRequired
};

export default TodoDeadlineComponent;
