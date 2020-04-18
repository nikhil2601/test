[pep-comp](/) > [docs](/docs) > [components](/docs/components) > README

--------------------------------------------------------------------------------

# Available Components

List of available components from the `pep-comp` library. Import them via the es6 `import *` statement or use the `window.pep-comp` if using the UMD definition. [Read more about pep-comp Installations...](/docs/Installation.md)

## List of Components

Documented:

- [Backdrop](/docs/components/Backdrop.md)
- [Box](/docs/components/Box.md)
- [ButtonIcon](/docs/components/ButtonIcon.md)
- [ButtonLink](/docs/components/ButtonLink.md)
- [ButtonSecondary](/docs/components/ButtonSecondary.md)
- [ButtonSwitch](/docs/components/ButtonSwitch.md)
- [Button](/docs/components/Button.md)
- [Checkbox](/docs/components/Checkbox.md)
- [DataView](/docs/components/DataView.md)
- [Divider](/docs/components/Divider.md)
- [Fade](/docs/components/Fade.md)
- [GridList](/docs/components/GridList.md)
- [Grid](/docs/components/Grid.md)
- [KeyValuePairs](/docs/components/KeyValuePairs.md)
- [Modal](/docs/components/Modal.md)
- [SvgIcon](/docs/components/SvgIcon.md)
- [Tooltip](/docs/components/Tooltip.md)
- [Typography](/docs/components/Typography.md)

In progress:

- [Form](/docs/components/Form.md)
- [List](/docs/components/List.md)
- [Pagination](/docs/components/Pagination.md)

## How to import and use a pep-comp Component in your code...

```jsx
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
// Just like any other named import statement.
import { Typography } from 'pep-comp';

// Styled variation of the `SuperComponent`
const SuperComponentStyled = styled.div`
    padding: 10px;
    background-color: #101;
    color: #10aded;
`;

// The main stateless `SuperComponent`
const SuperComponent = ({ align, title }) => (
    <SuperComponentStyled>
        {/* Write in JSX format as you need,
            passing in the props you require. */}
        <Typography align={align} type="headline">
            {title}
        </Typography>
    </SuperComponentStyled>
);

SuperComponent.propTypes = {
    /**
     * The alignment of the text.
     */
    align: PropTypes.string,
    /**
     * The title of the `SuperComponent`.
     */
    title: PropTypes.string
};

SuperComponent.defaultProps = {
    align: 'center',
    title: 'Hello World'
};

export default SuperComponent;
```

Read more about the [Typography Component...](/docs/components/Typography.md)
