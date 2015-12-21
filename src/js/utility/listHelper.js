/**
 * @param {List} list
 * @param {Number} fromIndex
 * @param {Number} toIndex
 *
 * @returns {List}
 */
export function moveItem(list, fromIndex, toIndex) {
    var item = list.get(fromIndex, null);

    if (!item) {
        throw new Error(`From index ${fromIndex} does not exist`);
    }

    // remove item from list
    var newList = list.splice(fromIndex, 1);

    // re-add item to the list at another position
    return newList.splice(toIndex, 0, item);
}

/**
 * @param {List} list
 * @param {*} item
 * @param {Number} atIndex
 *
 * @returns {List}
 */
export function addItem(list, item, atIndex) {
    return list.splice(atIndex, 0, item);
}
