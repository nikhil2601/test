import DOMPurify from 'dompurify';

/**
 * Sanitize a given markup using DOM-Purify.
 *
 * @method sanitizeMarkup
 * @param  {string}       html        HTML string to sanitize
 * @param  {Object}       [config={}] DOMPurify config
 * @return {string}
 */
export const sanitizeMarkup = (html, config = {}) => ({
    __html: DOMPurify.sanitize(html, config),
});
