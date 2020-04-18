import _flatten from 'lodash/flatten';
import _omitBy from 'lodash/omitBy';
import { css as styledCSS } from 'styled-components';

import { VALID_ATTRIBUTES_LIST } from 'constants/html';

import { getThemeProps } from './theme';

/**
 * Valdate a given styled component's CSS property value.
 *
 * @method _checkValue
 * @private
 * @param  {Function} [checker=null] A function to check the validity of the value
 * @return {boolean}
 */
const _checkValue = (checker = null, ...args) =>
    typeof checker === 'function' ? checker(...args) : true;

/**
 * Transform a given styled component's CSS property value.
 *
 * @method _transformValue
 * @private
 * @param  {Function}      [transform=null] A transformer function, MUST return a single templateString
 * @param  {string}        value            The CSS property value to transform and render
 * @param  {string}        name             The CSS property name
 * @return {string}
 */
const _transformValue = (transform = null, value, name, ...args) =>
    value &&
    (typeof transform === 'function' ? transform(value, name, ...args) : `${name}: ${value}`);

/**
 * A wrapper on top of styled-component's `css` helper,
 * helps with extra interpolations, if necessary.
 *
 * @method css
 * @param  {Array}         templateStringsList List of template strings
 * @param  {Interpolation} interpolations      Interpolations within templateStrings
 * @return {Array}                             The flattened css styles list
 */
export const css = (templateStringsList, ...interpolations) =>
    _flatten(styledCSS(templateStringsList, ...interpolations));

/**
 * Render some allowed styles for the styled components.
 *
 * @method renderStyle
 * @param  {string}    [name='']             The name of the CSS style property
 * @param  {string}    [value='']            The CSS style value to check for and render
 * @param  {Object}    [theme={}]            The current theme
 * @param  {Function}  [valueCheck=null]     A function to check the validity of the value
 * @param  {Function}  [valueTransform=null] A function to transform the final output of the value
 * @return {Array}
 */
export const renderStyle = (
    name = '',
    value = '',
    theme = {},
    valueCheck = null,
    valueTransform = null
) => {
    // If we have a value of type `object`,
    // we need to grab the current `breakpointValues`,
    // and add a `media` mixin for each of the asked for values.
    if (value != null && typeof value === 'object') {
        // Extract the breakpoint values from the current theme.
        const breakpointKeys = getThemeProps('breakpoints.keys', {}, { theme });
        const breakpointValues = getThemeProps('breakpoints.values', {}, { theme });
        // Extract the `media` mixin from the theme.
        const media = getThemeProps('media', {}, { theme });
        // Sort the value keys in the order defined in the breakpoints.
        const sortedKeys = Object.keys(value).sort(
            (a, b) => breakpointKeys.indexOf(a) - breakpointKeys.indexOf(b)
        );
        // We'll return a map of css properties.
        return sortedKeys.reduce((accum, key) => {
            // Only accept breakpoint keys if they've been added to the
            // theme's `breakpoints.values`
            if (Object.hasOwnProperty.call(breakpointValues, key)) {
                // For `xs` type breakpoint, we don't need to use the `media` mixin.
                // CSS is mobile first.
                if (key === 'xs') {
                    return _checkValue(valueCheck, value[key], name, theme)
                        ? css`
                              ${_transformValue(valueTransform, value[key], name, theme)};
                          `
                        : '';
                }
                // Otherwise, use the `media` mixin for the given breakpoint value.
                const query = _checkValue(valueCheck, value[key], name, theme)
                    ? media.up(key)`
                          ${_transformValue(valueTransform, value[key], name, theme)};
                      `
                    : '';
                // Add the CSS values to the accumulator.
                accum = [...accum, ...query];
            }
            // Return the accumulator.
            return accum;
        }, []);
    }
    // If value is not of type `object`,
    // let's check for it in the passed in `allowedList`,
    // if value is allowed, then let's render that style.
    return _checkValue(valueCheck, value, name, theme)
        ? css`
              ${_transformValue(valueTransform, value, name, theme)};
          `
        : '';
};

/**
 * Filter the given props from appearing as element
 * attributes in the DOM tree.
 * This helps to avoid adding extraneous DOM attributes
 * (valid or invalid HTML element attributes)
 * when building a styled-component.
 *
 * @method filterProps
 * @param  {Object}    [props={}]      The current props of the component
 * @return {Object}                    The filtered props
 */
export const filterProps = (props = {}) =>
    _omitBy(props, (value, key) => !VALID_ATTRIBUTES_LIST.includes(key));
