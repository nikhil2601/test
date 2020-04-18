import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import { THEME } from 'constants/theme';

import { mergeObjects } from './merge';

/**
 * Get the value for a given theme path from props or default `THEME`
 *
 * @method _getValue
 * @param  {string}  path     The path to extract the value from
 * @param  {Any}     fallback The default value
 * @param  {Object}  props    The component's props
 * @return {Any}              The extracted value or interpolated function
 */
const _getValue = (path, fallback, props) => {
    // Extract the value from the given props.
    const valueFromProps = _get(props, `theme.${path}`, fallback);
    // Extract the value from the default `THEME`.
    const valueFromTheme = _get(THEME, path, fallback);
    // Build the final value, checking to see if we have a
    // zero value '0' or empty string '' or any valid value (non null),
    // otherwise falling back to the valueFromTheme.
    let finalValue =
        valueFromProps || valueFromProps === 0 || valueFromProps === ''
            ? valueFromProps
            : valueFromTheme;
    // If the `finalValue` is an object and is empty,
    // then we want to default it back to the values from the default `THEME`.
    if (typeof finalValue === 'object' && _isEmpty(finalValue)) {
        finalValue = valueFromTheme;
    }
    // Return the final value
    return finalValue;
};

/**
 * Get the theme props for a styled component.
 * Returns the value of `props.theme[path]` or the provided `fallback`.
 * If `props` argument is present, then it will extract the `path` from the props,
 * otherwise, it will return an interpolated `${props => {}}` function.
 *
 * @method getThemeProps
 * @param  {string}      [path='']       The path to extract the value from
 * @param  {Any}         [fallback=null] The default value
 * @param  {Object}      [props={}]      The component's props
 * @return {Any}                         The extracted value or interpolated function
 */
export const getThemeProps = (path = '', fallback = null, props = {}) => {
    // If no props are passed in, then we will return an
    // interpolated function, similar to that of styled-components,
    // which will try to extract the value from the current component props.
    if (_isEmpty(props)) {
        return componentProps => _getValue(path, fallback, componentProps);
    }
    // If props are available, then we will use them to extract the requested value.
    return _getValue(path, fallback, props);
};

/**
 * Get the value of a given props from the current component's theme.
 * Returns the value of `props.theme[path]` or the provided `fallback`.
 *
 * @method themeGet
 * @param  {string}   [path='']       The path to extract the value from
 * @param  {Any}      [fallback=null] The default value
 * @return {Function}
 */
export const themeGet = (path = '', fallback = null) => ({ theme = THEME } = {}) =>
    _getValue(path, fallback, { theme });

/**
 * Theme helper, merges the default theme with the application provided theme.
 *
 * @method generateTheme
 * @param  {Object}      [theme={}] The provided theme
 * @return {Object}                 The merged theme
 */
export const generateTheme = (theme = {}) => mergeObjects(THEME, theme);

/**
 * Theme helper, meges the theme from the `props` and `props.schema`.
 *
 * @method getMergedThemeFromSchema
 * @param  {Object}                 props The component's props
 * @return {Object}                       The updated theme
 */
export const getMergedThemeFromSchema = props => {
    // Extract the theme out of the passed in props.
    const propsTheme = _get(props, 'theme', {});
    // Extract the theme out of the passed in schema.
    const schemaTheme = _get(props, 'schema.theme', {});
    // Merge the two themes, overwriting any array values where present.
    return mergeObjects(propsTheme, schemaTheme);
};
