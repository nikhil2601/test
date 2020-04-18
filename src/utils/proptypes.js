import PropTypes from 'prop-types';

/**
 * Generate responsive prop-types for a component.
 *
 * @method responsiveProptypes
 * @param  {Function}           [types=()=>{}] A PropTypes func
 * @return {Function}                          A responsive PropTypes func
 */
export const responsiveProptypes = (types = () => {}) =>
    PropTypes.oneOfType([
        types,
        PropTypes.shape({
            xs: types,
            sm: types,
            md: types,
            lg: types,
            xl: types,
        }),
    ]);
