import scrollIntoView from 'smooth-scroll-into-view-if-needed';

/**
 * Scroll to an element if its present.
 *
 * @method scrollTo
 * @param  {Element} [el=null]    An HTML element
 * @param  {Object}  [options={}] The options for the scrollTo feature
 */
export function scrollTo(el = null, options = {}) {
    if (el) {
        // Scroll to the element if available.
        scrollIntoView(el, {
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
            scrollMode: 'if-needed',
            ...options,
        });
    }
}
