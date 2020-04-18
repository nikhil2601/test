import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const isPortalAvailable = ReactDOM && typeof ReactDOM.createPortal === 'function';
const docIsBrowser = typeof window !== 'undefined';

class Portal extends Component {
    static propTypes = {
        children: PropTypes.node,
        container: PropTypes.object,
    };

    static defaultProps = {
        children: null,
        container: null,
    };

    componentWillMount() {
        const { container } = this.props;

        if (docIsBrowser) {
            if (!container) {
                this.container = document.createElement('div');
                document.body.appendChild(this.container);
            } else {
                this.container = container;
            }
            this.renderLayer();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.renderLayer();
    }

    componentWillUnmount() {
        const { container } = this.props;

        if (!isPortalAvailable) {
            ReactDOM.unmountComponentAtNode(this.container);
        }

        if (!container) {
            document.body.removeChild(this.container);
        }
    }

    renderLayer = () => {
        const { children } = this.props;

        if (!isPortalAvailable) {
            ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this.container);
        }
    };

    render() {
        const { children } = this.props;

        if (isPortalAvailable) {
            return ReactDOM.createPortal(children, this.container);
        }

        return null;
    }
}

export default Portal;
