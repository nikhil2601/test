import PropTypes from 'prop-types';
import React from 'react';
import { wrapDisplayName } from 'recompose';

/**
 * An HOC to determine if we should render the passed in `WrappedComponent` based on it's `acl` prop, for now.
 *
 * @method accessControlHOC
 * @param  {Function}       WrappedComponent The component to render
 * @return {Function}                        The upgraded composed component
 */
function accessControlHOC(WrappedComponent) {
    /**
     * An AccessControl HOC to render the `WrappedComponent`
     *
     * @type {Function}
     */
    const AccessControl = React.forwardRef((props, ref) => {
        const { acl } = props;
        // Render the component based on the `acl` prop.
        return acl ? <WrappedComponent {...props} ref={ref} /> : null;
    });

    AccessControl.propTypes = {
        /**
         * If `false`, the wrapped component won't be rendered.
         */
        acl: PropTypes.bool,
    };

    AccessControl.defaultProps = {
        acl: false,
    };

    // Set the `displayName` of the newly created component to be
    // `accessControl(WrappedComponent.displayName)`.
    // This will help in clearly expressing the relationship between this
    // `WrappedComponent` and the `accessControl` HOC.
    AccessControl.displayName = wrapDisplayName(WrappedComponent, 'accessControl');

    // Return the composed component.
    return AccessControl;
}

export default accessControlHOC;
