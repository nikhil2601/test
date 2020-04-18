/* eslint-disable react/no-find-dom-node */
import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

class RootRef extends Component {
    static propTypes = {
        /**
         * The wrapped React element.
         */
        children: PropTypes.element.isRequired,
        /**
         * The function / object to access the DOM node of the wrapped element.
         * Can be a function or a `React.createRef()`.
         */
        rootRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    };

    componentDidMount() {
        const { rootRef } = this.props;

        this.ref = findDOMNode(this);
        this.setRootRef(rootRef, this.ref);
    }

    componentDidUpdate(prevProps, prevState) {
        const { rootRef } = this.props;
        const ref = findDOMNode(this);

        if (prevProps.rootRef !== rootRef || this.ref !== ref) {
            if (prevProps.rootRef !== rootRef) {
                this.setRootRef(prevProps.rootRef, null);
            }
            this.ref = ref;
            this.setRootRef(rootRef, this.ref);
        }
    }

    componentWillUnmount() {
        const { rootRef } = this.props;

        this.ref = null;
        this.setRootRef(rootRef, null);
    }

    setRootRef = (rootRef, ref) => {
        if (typeof rootRef === 'function') {
            rootRef(ref);
        } else if (rootRef && typeof rootRef === 'object') {
            rootRef.current = ref;
        }
    };

    render() {
        const { children } = this.props;

        return children;
    }
}

export default RootRef;
