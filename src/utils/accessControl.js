import PropTypes from 'prop-types';
import React from 'react';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';

/**
 * A Higher Order Component (HOC) to determine
 * if we should render the passed in `WrappedComponent`
 * based on the current user's permissions set.
 *
 * @method accessControl
 * @param  {Function}    WrappedComponent The component to render
 * @return {Function}                     React Component
 */
export function accessControl(WrappedComponent) {
    /**
     * An AccessControl HOC to render the `WrappedComponent`.
     *
     * @method      AccessControl
     * @param       {Object}      props The props for the WrappedComponent
     * @constructor
     */
    const AccessControl = React.forwardRef((props, ref) => {
        const { acl } = props;
        // Based on the `acl` render the wrapped component.
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

    // Set the `displayName` of this newly created component to be
    // `accessControl(WrappedComponent.displayName)`.
    // this will help in clearly expressing the relationship between this
    // `WrappedComponent` and the `accessControl` HOC.
    setDisplayName(wrapDisplayName(WrappedComponent, 'accessControl'))(AccessControl);

    // Return the composed component.
    return AccessControl;
}
