import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Typography from 'lib/Typography';
import { themeGet } from 'utils/theme';

const DescriptionFieldStyled = styled(Typography)`
    /**
     * Add all of the remaining styles from the theme
     */
    ${themeGet('DescriptionField.styles')};
    /**
     * Add in the dynamic styles
     */
    ${({ root, theme }) => {
        const rootStyles = themeGet('DescriptionField.styles.root', null)({ theme });

        return root ? rootStyles : null;
    }};
`;

function DescriptionField(props) {
    const { id, description, ...rest } = props;
    // If description is not available, don't render.
    if (!description) {
        return null;
    }
    // Otherwise, render the regular description.
    return (
        <DescriptionFieldStyled
            color="#848484"
            gutterBottom="0"
            gutterLeft="5px"
            gutterRight="5px"
            gutterTop="10px"
            {...rest}
            htmlFor={id}
        >
            {description}
        </DescriptionFieldStyled>
    );
}

DescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
};

DescriptionField.defaultProps = {
    id: null,
    description: null,
};

export default DescriptionField;
