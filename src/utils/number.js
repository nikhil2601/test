/**
 * Format a given number based on the number of spaces and delimiter provided.
 *
 * @method formatNumberWithDelimiter
 * @param  {number}                  [num=0]         The number to format
 * @param  {number}                  [spaces=3]      The number of spaces to insert delimiter
 * @param  {string}                  [delimiter=','] The delimiter to use
 * @return {string}                                  The formatted number
 */
export const formatNumberWithDelimiter = (num = 0, spaces = 3, delimiter = ',') => {
    if (!num) {
        return 0;
    }
    // Build the RegExp.
    const regex = `(.)(?=(\\d{${spaces}})+$)`;
    // Return the formatted number.
    return String(Number.parseInt(num, 10)).replace(new RegExp(regex, 'g'), `$1${delimiter}`);
};

/**
 * Parse a value out as a number
 *
 * @method parseAsNumber
 * @param  {Any}         value The value to parse
 * @return {Any|number}        The value
 */
export const parseAsNumber = value => {
    if (value === '') {
        return undefined;
    }
    // "1." isn't considered a number, even if JavaScript parses it fine.
    // The user is most likely entereing in a floating point integer.
    if (/\.$/.test(value)) {
        return value;
    }
    // "1.0" isn't considered a number, but a floating point number (float).
    // We should return the string, to allow for float inputs.
    if (/\.0$/.test(value)) {
        return value;
    }
    // If we're truly working with a number and not a float,
    // let's parse it via Number() and see if it is a valid Number.
    const num = Number(value);
    const isNumber = typeof num === 'number' && !Number.isNaN(num);
    // Fantastic, it's a number!
    // Now we should return it as a string so that it doesn't conflict
    // with the user entering in a currency symbol or any other value.
    if (/\.\d*0$/.test(value)) {
        return value;
    }
    // Return the valid number or the passed in value in the end.
    return isNumber ? num : value;
};
