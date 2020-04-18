/**
 * Extract a process environment variable from the current Node.js process.
 *
 * @method getProcessEnv
 * @param  {string}      [name=''] The env variable to extract
 * @return {string}
 */
function getProcessEnv(name = '') {
    return (process && process.env && process.env[name]) || '';
}

module.exports = {
    getProcessEnv
};
