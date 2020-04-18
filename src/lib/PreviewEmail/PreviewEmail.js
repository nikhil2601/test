import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Box, Typography, Divider, Row, KeyValuePairs } from 'lib';
import { COLORS } from 'constants/colors';
import { sanitizeMarkup } from 'utils/sanitize';

const HeaderLogo = styled.img`
    max-width: 200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

const TitleField = styled.label`
    color: #848484;
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 5px 10px;
    padding: 0;
`;

function PreviewEmail(props) {
    const { emailTemplate } = props;
    const { body, subject, header_logo: headerLogo, from_email: fromEmail } = emailTemplate;
    const senderInfo = [
        {
            itemKey: 'Sender ',
            itemValue: fromEmail,
        },
    ];

    const subjectInfo = [
        {
            itemKey: 'Subject',
            itemValue: subject,
        },
    ];
    return (
        <>
            <TitleField>Email Preview</TitleField>
            <Box>
                <KeyValuePairs
                    showDivider
                    items={senderInfo}
                    itemKey="itemKey"
                    itemValue="itemValue"
                    keySuffix=" :"
                />
                <KeyValuePairs
                    items={subjectInfo}
                    itemKey="itemKey"
                    itemValue="itemValue"
                    keySuffix=" :"
                />
                <Box padding="0" margin="10px 10px 0px 0px">
                    <Box backgroundColor={COLORS.PRIMARY}>
                        <HeaderLogo src={headerLogo} alt="logo" />
                    </Box>
                    <Typography gutterLeft="40px" dangerouslySetInnerHTML={sanitizeMarkup(body)} />
                    <Divider />

                    <Row direction="column" alignItems="center">
                        <Typography>PEPCUS</Typography>
                        <Typography as="a">www.pepcus.com</Typography>
                    </Row>
                </Box>
            </Box>
        </>
    );
}

PreviewEmail.propTypes = {
    emailTemplate: PropTypes.object,
};

PreviewEmail.defaultProps = {
    emailTemplate: null,
};

export default PreviewEmail;
