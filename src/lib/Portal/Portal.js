/* eslint-disable react/no-find-dom-node */
import { Component } from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import { getContainer, getDocumentOwner } from 'utils/component';

// eslint-disable-next-line valid-jsdoc
/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @see     {@link https://reactjs.org/docs/portals.html}
 * @class
 * @extends Component
 */
class Portal extends Component {
    static propTypes = {
        /**
         * The children to be rendered in the passed in `container`.
         */
        children: PropTypes.node,
        /**
         * The `container` will have the children appended to itself during mount.
         * Default value is the `document.body`.
         */
        container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        /**
         * Disable the React portal behavior.
         * Only the children are rendered.
         */
        disable: PropTypes.bool,
        /**
         * Callback fired upon the children being rendered in the `container`.
         */
        onMount: PropTypes.func,
    };

    static defaultProps = {
        children: null,
        container: null,
        disable: false,
        onMount: () => {},
    };

    // Define an empty container
    container = null;

    componentDidMount() {
        // Set the container and force render if needed.
        this.setContainerAndRender(this.props);
    }

    componentDidUpdate(prevProps, prevState) {
        const { container, disable } = this.props;

        if (prevProps.container !== container || prevProps.disable !== disable) {
            // Set the container and force render if needed.
            this.setContainerAndRender(this.props);
        }
    }

    componentWillUnmount() {
        // Remove the current container
        this.container = null;
    }

    setContainerAndRender = props => {
        const { container, disable, onMount } = props;
        // Set the container
        this.setContainer(container);
        // Force the render when needed.
        // This skips the `shouldComponentUpdate` method call.
        if (!disable) {
            this.forceUpdate(onMount);
        }
    };

    setContainer = container => {
        const { disable } = this.props;
        // If the Portal is `disable`d, then set the current DOM node's parent as the container.
        if (disable) {
            this.container = findDOMNode(this).parentElement;
            return;
        }
        // Otherwise, find the current passed in `container`'s parent and set it to the `container`.
        this.container = getContainer(container, getDocumentOwner(this).body);
    };

    render() {
        const { children, disable } = this.props;
        // If the Portal is disabled, render just the children.
        if (disable) {
            return children;
        }
        // Create the portal for the current children, and the chosen container.
        return this.container ? createPortal(children, this.container) : null;
    }
}

export default Portal;
