import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { renderStyle } from 'utils/styled';
import { responsiveProptypes } from 'utils/proptypes';
import { themeGet } from 'utils/theme';

const FaIconStyled = styled(FontAwesomeIcon)`
    ${themeGet('FaIcon.styles')};
    ${({ color, height, margin, opacity, padding, theme, width }) => css`
        color: ${themeGet(`palette.${color}.color`, color || 'inherit')};
        ${renderStyle('height', height, theme, null, (val, name) => `${name}: ${val} !important;`)};
        ${renderStyle('margin', margin, theme)};
        ${renderStyle('opacity', opacity, theme)};
        ${renderStyle('padding', padding, theme)};
        ${renderStyle('width', width, theme, null, (val, name) => `${name}: ${val} !important;`)};
    `};
`;

function FaIcon(props) {
    return <FaIconStyled {...props} />;
}

FaIcon.propTypes = {
    color: PropTypes.string,
    fixedWidth: PropTypes.bool,
    height: responsiveProptypes(PropTypes.string),
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    margin: responsiveProptypes(PropTypes.string),
    opacity: responsiveProptypes(PropTypes.number),
    padding: responsiveProptypes(PropTypes.string),
    width: responsiveProptypes(PropTypes.string),
};

FaIcon.defaultProps = {
    color: null,
    fixedWidth: true,
    height: null,
    icon: null,
    margin: null,
    opacity: null,
    padding: null,
    width: null,
};

export default FaIcon;
