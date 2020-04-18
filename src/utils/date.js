import _format from 'date-fns/format';
import { formatToTimeZone } from 'date-fns-timezone';

/**
 * Format a given timestamp into a human readable date format.
 *
 * @method formatDate
 * @param  {number|string}   timestamp  The timestamp to format
 * @param  {string}          dateFormat The date format to use
 * @param  {string}          timezone   The timezone format to use
 * @return {string}                     The formatted date
 */
export const formatDate = (timestamp, dateFormat, timezone) =>
    timezone
        ? formatToTimeZone(timestamp, dateFormat || 'MM/DD/YYYY', { timeZone: timezone })
        : _format(timestamp, dateFormat || 'MM/DD/YYYY');

/**
 * If value is a number, we need to fix its length due to Java APIs returning a 10 digit timestamp.
 *
 * @param {number|string}     timestamp The timestamp to format
 * @param {string}            dateFormat The date format to use
 * @return {string}                     The formmatted date
 */
export const formatJapiTimestamp = (timestamp, dateFormat) => {
    if (typeof timestamp !== 'number') {
        throw new Error('Expect timestamp to be a number');
    }

    timestamp = String(timestamp).length >= 13 ? Number(timestamp) : Number(timestamp) * 1000;

    return formatDate(timestamp, dateFormat);
};
