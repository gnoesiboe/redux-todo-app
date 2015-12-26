import toastr from 'toastr';

// set toastr default options
toastr.options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    newestOnTop: true,
    progressBar: true,
    escapeHtml: false
};

/**
 * @param {String} type
 * @param {String} message
 *
 * @private
 */
var _notify = function (type, message) {
    toastr[type](message);
};

/**
 * @private
 */
var _clearCurrentNotifications = function () {
    toastr.clear();
};

/**
 * @param {String} message
 */
export function notifySuccess(message) {
    _notify('success', message);
}

/**
 * @param {String} message
 */
export function notifyError(message) {
    _notify('error', message);
}

/**
 * Clears the currently vissible notifications
 */
export function clear() {
    _clearCurrentNotifications();
}
