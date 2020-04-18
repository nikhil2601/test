import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { themeGet } from 'utils/theme';

const IframeStyled = styled.iframe`
    /**
     * Add dynamic styles to the iframe component.
     */
    ${({ height, margin, padding, position, width }) => css`
        border: none;
        height: ${height || '100%'};
        margin: ${margin || 0};
        padding: ${padding || 0};
        position: ${position};
        width: ${width || '100%'};
    `};
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('Iframe.styles')};
`;

/**
 * A simple iframe component.
 *
 * @method      Iframe
 * @param       {Object} props The props for the component
 * @constructor
 */
class Iframe extends React.Component {
    onLoad = () => {
        const { onLoad } = this.props;

        if (typeof onLoad === 'function') {
            onLoad();
        }
    };

    render() {
        return <IframeStyled {...this.props} onLoad={this.onLoad} />;
    }
}

Iframe.propTypes = {
    height: PropTypes.string,
    margin: PropTypes.string,
    padding: PropTypes.string,
    position: PropTypes.string,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.string,
    onLoad: PropTypes.func,
};

Iframe.defaultProps = {
    height: null,
    margin: null,
    padding: null,
    position: null,
    width: null,
    onLoad: null,
};

export default Iframe;
