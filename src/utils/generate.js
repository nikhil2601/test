/**
 * Generate a random ID
 *
 * @method genID
 * @param  {number|string} [prefixOrLength=10] The length or prefix for the generated ID
 * @param  {string} [prefix='']                Add a prefix to the generated ID
 * @return {string}                            The generated ID
 */
export const genID = (prefixOrLength = 10, prefix = '') => {
    // Generate a random time.
    const randomTime = Math.random() * new Date().getTime();
    // Use `btoa()` and convert from base-64 to ascii.
    let b64Rand = btoa(randomTime);
    // Check to see if we have a `prefix` as the first argument or the second.
    let strPrefix = typeof prefixOrLength === 'string' ? prefixOrLength : prefix;
    // Check to see if the first argument is a length.
    let strLength = typeof prefixOrLength === 'number' && prefixOrLength > 0 ? prefixOrLength : 10;
    // Double-check to make sure the length is not above 24 characters.
    // 24 characters is the max length for converting a `randomTime` via `btoa()`.
    strLength = strLength >= 24 ? 24 : strLength;
    // Return a slice of the randomy generated hash.
    return `${strPrefix}${b64Rand.slice(0, strLength)}`;
};
