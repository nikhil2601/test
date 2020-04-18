/**
 * Normalize a given `string` and split it up based on a given `strToSplitWith`.
 *
 * @method normalizeSplitString
 * @param  {string}             [str=null]             The string to normalize
 * @param  {string}             [strToReplace='']      The string to replace inside of the str
 * @param  {string}             [strToSplitWith='___'] The string to split the replaced str
 * @return {Array}                                     The list of normalized split strings
 */
export function normalizeSplitString(str = null, strToReplace = '', strToSplitWith = '___') {
    // Build the regex with the `strToReplace`.
    const regex = new RegExp(`(${strToReplace})`, 'g');
    // Replace and split the `str` based on the given regex,
    // then split it up based on the `strToSplitWith` string.
    return str
        ? String(str)
              .replace(regex, '')
              .split(strToSplitWith)
        : [];
}
