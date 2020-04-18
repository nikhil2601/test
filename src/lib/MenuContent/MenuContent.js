import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const MenuContent = styled.ul`
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #c4ccd3;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    list-style: none;
    margin: ${({ distanceFromContainer }) => distanceFromContainer}px 0 0;
    min-width: 160px;
    overflow: hidden;
    padding: 0;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('MenuContent.styles')};
`;

MenuContent.propTypes = {
    /**
     * A dynamic margin for the MenuContent
     */
    distanceFromContainer: PropTypes.number,
};

MenuContent.defaultProps = {
    distanceFromContainer: 0,
};

export default MenuContent;
