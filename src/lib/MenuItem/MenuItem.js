import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const MenuItem = styled.li`
    margin: 0;
    padding: 0;
    width: 100%;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('MenuItem.styles')};
`;

MenuItem.propTypes = {};

MenuItem.defaultProps = {};

export default MenuItem;
