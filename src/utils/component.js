/* eslint-disable react/no-find-dom-node */

import { findDOMNode } from 'react-dom';
import { isStyledComponent as styledComponent } from 'styled-components';

/**
 * Determine if the Component is a React Class Component
 *
 * @method isClassComponent
 * @param  {Component}       Component The Component to check
 * @return {boolean}
 */
export const isClassComponent = Component =>
    Boolean(Component && Component.prototype && typeof Component.prototype.render === 'function');

/**
 * Determine of the Component is a Styled-Component.
 * Fallbacks to the `isStyledComponent` from 'styled-components'.
 *
 * @method isStyledComponent
 * @param  {Component}        Component The Component to check
 * @return {boolean}
 */
export const isStyledComponent = styledComponent;

/**
 * Determine if the Component is a React Element and HTML DOM type.
 * i.e. 'div', 'hr', 'p', 'h3', etc.
 *
 * @method isDOMTypeComponent
 * @param  {Component}  Component The Component to check
 * @return {boolean}
 */
export const isDOMTypeComponent = Component =>
    Boolean(typeof Component === 'string' && !Component.prototype);

/**
 * Determine if the Component is a React Element and a Composite (Functional) Component.
 * i.e. const Button = ({ width }) => <button width={width}>Hello</button>;
 *
 * @method isFunctionalComponent
 * @param  {Component}     Component The Component to check
 * @return {boolean}
 */
export const isFunctionalComponent = Component => {
    return Boolean(typeof Component === 'function' && !Component.prototype.render);
};

/**
 * Determine if the Component is a React Component,
 * functional, styled, or Class component
 *
 * @method isReactComponent
 * @param  {Component}  Component The Component to check
 * @return {boolean}
 */
export const isReactComponent = Component =>
    Boolean(
        isFunctionalComponent(Component) ||
            isStyledComponent(Component) ||
            isClassComponent(Component)
    );

/**
 * Get the top-level `document` object for the given node.
 *
 * @see    {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument}
 * @method getDocumentOwner
 * @param  {node}            node The node the document object for
 * @return {any}
 */
export const getDocumentOwner = node => (node && node.ownerDocument) || document;

/**
 * Get the current container based on it being an Object, or a Functional Component
 *
 * @method getContainer
 * @param  {Object|Function}  container        The React Component
 * @param  {HTMLElement}      defaultContainer The default container
 * @return {HTMLElement}
 */
export const getContainer = (container, defaultContainer) => {
    const el = typeof container === 'function' ? container() : container;

    return el && typeof el === 'object' && Object.hasOwnProperty.call(el, 'current')
        ? el.current || defaultContainer
        : findDOMNode(el) || defaultContainer;
};

/**
 * Get the anchor element for the given element.
 *
 * @method getAnchorEl
 * @param  {HTMLElement}  element The element to get the anchor for
 * @return {HTMLElement}
 */
export const getAnchorEl = element => (typeof element === 'function' ? element() : element);

/**
 * Is the DOM available?
 *
 * @type {boolean}
 */
export const canUseDOM = Boolean(
    typeof window !== 'undefined' && window.document && window.document.createElement
);
