import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';

import { getThemeProps } from 'utils/theme';

const DividerStyled = styled.hr`
    border: none;
    box-sizing: border-box;
    clear: both;
    flex-shrink: 0;
    /**
    * Add all of the remaining styles from theme
    */
    ${getThemeProps('Divider.styles')};
    /**
     * Add in the dynamic styles
     */
    ${({ height, light, margin, theme, transparent, color, width }) => {
        const bgColor = getThemeProps(`palette.${color}.color`, color || '#2D2D2D', {
            theme,
        });
        const backgroundColor = light ? lighten(0.4, bgColor) : bgColor;

        return {
            backgroundColor: transparent ? 'transparent' : backgroundColor,
            height,
            margin: margin ? margin : 0,
            width,
        };
    }};
`;

DividerStyled.propTypes = {
    /**
     * Apply themed styling to Divider.
     *
     * Colors can be defined in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * The height for the divider.
     */
    height: PropTypes.string,
    /**
     * Lighten the shade of the Divider.
     */
    light: PropTypes.bool,
    /**
     * Add a custom margin.
     */
    margin: PropTypes.string,
    /**
     * Render a transparent divider.
     * The `<Divider />` can be used as a spacer.
     */
    transparent: PropTypes.bool,
    /**
     * The width for the Divider.
     */
    width: PropTypes.string,
};

DividerStyled.defaultProps = {
    color: 'muted',
    height: '1px',
    light: false,
    margin: '10px 0',
    transparent: false,
    width: '100%',
};

export default DividerStyled;
