/**
 * @param {String} value
 * @param {String} className
 *
 * @returns {String}
 */
export function wrapTags(value, className) {
    return value.replace(/(#[^\s.,]+)/i, `<span class="${className}">$1</span>`);
}

/**
 * @param {String} value
 * @param {String} className
 *
 * @returns {String}
 */
export function wrapAssignments(value, className) {
    return value.replace(/(@[^\s.,]+)/i, `<span class="${className}">$1</span>`);
}

/**
 * @param {String} value
 * @param {String} className
 *
 * @returns {String}
 */
export function wrapProjects(value, className) {
    return value.replace(/(\[[^\]]+])/i, `<span class="${className}">$1</span>`);
}
