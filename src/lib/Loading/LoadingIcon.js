import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import { getThemeProps } from 'utils/theme';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.div`
    ${({ animate, animationDuration }) => {
        // Determine the CSS
        const animation = props =>
            animate
                ? css`
                      ${rotate360} ${props.animationDuration} linear infinite;
                  `
                : null;

        return css`
            animation: ${animation};
            height: 25px;
            width: 25px;
        `;
    }};
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('LoadingIcon.styles')};
`;

LoadingIcon.propTypes = {
    /**
     * If `true`, the icon will animate in a 360 degree rotation.
     */
    animate: PropTypes.bool,
    /**
     * The duration for the animation of the icon.
     */
    animationDuration: PropTypes.string,
};

LoadingIcon.defaultProps = {
    animate: true,
    animationDuration: '1.5s',
};

export default LoadingIcon;
