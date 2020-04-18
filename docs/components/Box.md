[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Box

--------------------------------------------------------------------------------

# Box

**src**: [Box.js](/src/lib/Box/Box.js)

`Box` is a simple component that renders a single `<div />` in a rectangular fashion. Think of it as a paper to place underneath your components.

## Example

```jsx
import React from 'react';
import { Box, Col, Row, Typography } from 'pep-comp';

const AppContainer = () => (
    <Row direction="column">
        <Col>
            <Box elevation={5} borderWidth="0">
                <Typography type="headline">Headline</Typography>
            </Box>
        </Col>
        <Col>
            <Box backgroundColor="primary" borderRadius="50%">
                <Typography>Circular box with text!</Typography>
            </Box>
        </Col>
    </Row>
);

export default AppContainer;
```

## Props

```javascript
/**
 * Sets the `background-color` css property.
 */
backgroundColor: PropTypes.string,
/**
 * Sets the `border-color` css property.
 */
borderColor    : PropTypes.string,
/**
 * Sets the `border-color` css property.
 */
borderRadius   : PropTypes.string,
/**
 * Sets the `border-width` css property.
 */
borderWidth    : PropTypes.string,
/**
 * Sets the `box-shadow` css property.
 */
boxShadow      : PropTypes.string,
/**
 * Shadow depth for the box.
 * Accepts values between 0 and 24.
 */
elevation      : PropTypes.number,
/**
 * Sets the `margin` css property.
 */
margin         : PropTypes.string,
/**
 * Sets the `padding` css property.
 */
padding        : PropTypes.string
```

## Default Props

```javascript
backgroundColor: null,
borderColor    : null,
borderRadius   : null,
borderWidth    : null,
boxShadow      : null,
elevation      : 0,
margin         : null,
padding        : null
```
