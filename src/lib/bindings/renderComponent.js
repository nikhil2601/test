import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Render a simple react component to the given selector.
 * TODO: Add styled-components theme, redux, etc., when needed.
 *
 * @method renderComponent
 * @param  {Component}       Component The component to render
 * @param  {Object}          props     The properties to pass to the rendered Component
 * @param  {string}          selector  The ID selector used to find the DOM node for the Component
 */
const renderComponent = (Component, props, selector) => {
    // The target can be a string, in that case we will use the
    // `document.getElementById()` to grab it, otherwise if
    // the use passed in an actual DOM node then use that node.
    const target = typeof selector === 'string' ? document.getElementById(selector) : selector;
    // Render the requested component.
    ReactDOM.render(<Component {...props} />, target);
};

export default renderComponent;
