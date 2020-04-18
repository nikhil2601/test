/* eslint-disable react/forbid-foreign-prop-types */

import React from 'react';
import ReactDOM from 'react-dom';
import _fromPairs from 'lodash/fromPairs';
import _isEmpty from 'lodash/isEmpty';
import ngComponent from 'ngcomponent';
import { ThemeProvider } from 'styled-components';

import { generateTheme as genTheme } from 'utils/theme';
import { isReactComponent } from 'utils/component';

/**
 * Bind a React JS Component to an Angular 1.x Component
 *
 * NOTE: The React Component must have all of its `propTypes`
 * defined in order to have Angular create the correct bindings.
 *
 * @method bindToAngular
 * @param  {Component}       Component        The React Component to bind
 * @param  {Array}           [bindings=[]]    The list of extra props passesd down to the component
 * @param  {Array}           [injectables=[]] Angular $injectables
 * @param  {Object|Function} [theme={}]       A `theme` object or function to generate a `theme` obj
 * @return {Object}                           The Angular Component
 */
const bindToAngular = (Component, bindings = [], injectables = [], theme = {}) => {
    // Determine if we are dealing with a valid react element,
    // or a styled-component.
    // TODO: Replace external dependency helpers with internal functions.
    const isValid = isReactComponent(Component);
    // If no valid React element / component is found, then return.
    if (!isValid) {
        return;
    }
    // Extract a list of the `Component` propTypes (keys).
    const propTypes = (Component.propTypes && Object.keys(Component.propTypes)) || [];
    // Build the Angular `bindings` for the component,
    // by concatenating the `Component` propTypes and
    // the extra bindings passed in via the `bindToAngular` func call.
    const ngBindings = [].concat(propTypes, bindings || []);
    /**
     * The new Angular Component class
     *
     * @class
     * @extends ngComponent
     */
    class Class extends ngComponent {
        constructor($element, ...injectedProps) {
            super();
            // Define the Angular $element.
            this.$element = $element;
            // Extra props that'll be passed down to the React Component.
            this.injectedProps = {};
            // Build a default `theme`.
            this.theme = {};
            // Build those extra props.
            injectables.forEach((name, idx) => (this.injectedProps[name] = injectedProps[idx]));
            // Update the default `theme`.
            // If the theme depends on some Angular $injectables,
            // then we can transform the `theme` into a function and pass in
            // all of the added $injectables.
            if (typeof theme === 'function') {
                // The theme will be the output of the passed in function.
                const componentTheme = theme(this.injectedProps);
                // Only update the `theme` if there is an object present, and it's not empty.
                this.theme =
                    typeof componentTheme === 'object' && !_isEmpty(componentTheme)
                        ? genTheme(componentTheme)
                        : genTheme({});
            } else {
                // Use the passed in `theme`.
                this.theme = genTheme(theme);
            }
        }

        static get $$ngIsClass() {
            return true;
        }

        componentWillUnmount() {
            ReactDOM.unmountComponentAtNode(this.$element[0]);
        }

        render() {
            ReactDOM.render(
                <ThemeProvider theme={this.theme}>
                    <Component {...this.props} {...this.injectedProps} />
                </ThemeProvider>,
                this.$element[0]
            );
        }
    }
    // Build the Angular Component's controller.
    const controller = [].concat('$element', injectables || [], Class);
    // Return the Angular JS Component.
    return {
        // Attach each of the `Component` propTypes and the extra bindings,
        // as this Angular Component's bindings.
        bindings: _fromPairs(ngBindings.map(name => [name, '<'])),
        // Attach the controller defined above.
        controller,
    };
};

export default bindToAngular;
