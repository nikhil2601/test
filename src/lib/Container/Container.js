import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { renderStyle } from 'utils/styled';
import { getThemeProps } from 'utils/theme';
import { responsiveProptypes } from 'utils/proptypes';

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 100%;
    /**
     * Add in dynamic styles
     */
    ${({ margin, padding, theme, width }) => css`
        ${renderStyle('width', width, theme)};
        ${renderStyle('padding', padding, theme)};
        ${renderStyle('margin', margin, theme)};
    `};
    /**
    * Add all of the remaining styles from theme
    */
    ${getThemeProps('Container.styles')};
`;

Container.propTypes = {
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Add a specific padding to the container.
     */
    padding: responsiveProptypes(PropTypes.oneOfType([PropTypes.string])),
    /**
     * Add a specific margin to the container.
     */
    margin: responsiveProptypes(PropTypes.oneOfType([PropTypes.string])),
    /**
     * Add a specific width to the container.
     */
    width: responsiveProptypes(PropTypes.oneOfType([PropTypes.string])),
};

Container.defaultProps = {
    className: '',
    padding: '',
    margin: '',
    width: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
    },
};

export default Container;
