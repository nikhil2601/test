import React from 'react';
import PropTypes from 'prop-types';
import { FaIcon, get, List, ListItem, Row, Tooltip, Typography, callFunc, genID } from 'pep-comp';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

function UploadFieldDescription(props) {
    const { description, onClickDownloadLink } = props;
    const customFieldProps = get(props, 'formSchema.uiSchema.uploadInfo.file.ui:customFieldProps');
    const templateUrl = get(customFieldProps, 'templateUrl');
    const linkLabel = get(customFieldProps, 'linkLabel');
    const tooltip = get(customFieldProps, 'tooltip');

    if (!description) {
        return null;
    }

    function handleDownloadLinkClick() {
        callFunc(onClickDownloadLink);
    }

    function getTooltipContent() {
        if (Array.isArray(tooltip)) {
            return (
                <List backgroundColor="transparent" listStyle="disc" padding="0 0 0 15px">
                    {tooltip.map(value => (
                        <ListItem key={genID()} display="list-item" padding="3px">
                            {value}
                        </ListItem>
                    ))}
                </List>
            );
        }

        return tooltip;
    }

    return (
        <Row gutter={false} direction="column" margin="10px 0 0">
            <Typography>{description}</Typography>
            <Row gutter={false} alignItems="baseline">
                {linkLabel && (
                    <Typography
                        type="link"
                        onClick={handleDownloadLinkClick}
                        href={templateUrl}
                        gutterTop="0"
                        gutterRight="5px"
                    >
                        {linkLabel}
                    </Typography>
                )}
                {tooltip && (
                    <Tooltip content={getTooltipContent()} placement="left">
                        <FaIcon color="light" height="15px" width="15px" icon={faInfoCircle} />
                    </Tooltip>
                )}
            </Row>
        </Row>
    );
}

UploadFieldDescription.propTypes = {
    /**
     * Field description
     */
    description: PropTypes.string,
    /**
     * the schema for the form
     */
    formSchema: PropTypes.object.isRequired,
    /**
     * callback function for the download link click event
     */
    onClickDownloadLink: PropTypes.func,
};

UploadFieldDescription.defaultProps = {
    description: null,
    onClickDownloadLink: null,
};

export default UploadFieldDescription;
