import $ from 'jquery';

require('jquery-match-height/jquery.matchHeight.js');

// maintain scroll position when even when resizing components
jQuery.fn.matchHeight._maintainScroll = true;

/**
 * Resizes each row to fit the highest content
 */
export function resizeToContent() {

    // for some reason we need a timeout to do this
    // @todo find out why we need a timeout
    setTimeout(function () {
        jQuery.fn.matchHeight._update();
    }, 300);
}
