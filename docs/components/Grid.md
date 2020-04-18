[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Grid

--------------------------------------------------------------------------------

# Grid

**src**: [Row.js](/src/lib/Row/Row.js) | [Col.js](/src/lib/Col/Col.js)

pep-comp provides a responsive grid system that adapts to screen size and orientation, ensuring consistency across layouts. ([link](https://material.io/design/layout/responsive-layout-grid.html))

The grid system consists of two components, `Row` and `Col`, which are built on top of the [`flexbox`](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) box model.

## Example

### Simple 2-Column Grid

```jsx
import React from 'react';

import { Col, Row, Typography } from 'lib';

/**
 * Build a simple 2-Column Grid with equal column widths of `50%` each.
 *
 * @method SampleTwoColGrid
 * @component
 */
const SampleTwoColGrid = () => (
    <Container margin="50px auto">
        <Row>
            <Col size>
                <Typography>1/2 Column</Typography>
            </Col>
            <Col size>
                <Typography>1/2 Column</Typography>
            </Col>
        </Row>
    </Container>
);

export default SampleTwoColGrid;
```

### Advanced 6-Column Grid with responsive `flex-direction` behavior based on current breakpoint.

```jsx
import React from 'react';

import { Col, Row, Typography } from 'lib';

/**
 * Build a simple 2-Column Grid with equal column widths of `50%` each.
 *
 * @method SampleTwoColGrid
 * @component
 */
const SampleTwoColGrid = () => (
    <Container margin="50px auto">
        <Row alignItems="center" direction={{ md: 'column', lg: 'row' }}>
            <Col size={{ lg: 1 }}>
                <Box>1</Box>
            </Col>
            <Col size={{ lg: 2 }}>
                <Box>2</Box>
            </Col>
            <Col size={{ lg: 6 }}>
                <Box>6</Box>
            </Col>
            <Col size={{ lg: 2 }}>
                <Box>2</Box>
            </Col>
            <Col size={{ lg: 1 }}>
                <Box>1</Box>
            </Col>
        </Row>
    </Container>
);

export default SampleTwoColGrid;
```

## `Row` Props

```javascript
/**
 * Defines the 'align-content' style property.
 */
alignContent: responsiveProptypes(PropTypes.oneOf(ALIGN_CONTENT)),
/**
 * The content of the Row.
 */
children    : PropTypes.node,
/**
 * Defines the 'align-items' style property.
 */
alignItems  : responsiveProptypes(PropTypes.oneOf(ALIGN_ITEMS)),
/**
 * Defines the 'flex-direction' style property.
 */
direction   : responsiveProptypes(PropTypes.oneOf(FLEX_DIRECTION)),
/**
 * Defines the 'display' style property.
 */
display     : responsiveProptypes(PropTypes.oneOf(DISPLAY)),
/**
 * Should the `theme.grid.gutterWidth` be taken into account?
 */
gutter      : PropTypes.bool,
/**
 * Defines the 'justify-content' style property.
 */
justify     : responsiveProptypes(PropTypes.oneOf(JUSTIFY_CONTENT)),
/**
 * The html tag or React component to use for the root node.
 */
tagname     : PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
/**
 * Defines the 'flex-wrap' style property.
 */
wrap        : responsiveProptypes(PropTypes.oneOf(FLEX_WRAP))
```

## `Row` Default Props

```javascript
alignContent: 'stretch',
alignItems  : 'stretch',
children    : null,
direction   : 'row',
display     : 'flex',
gutter      : true,
justify     : 'flex-start',
tagname     : 'div',
wrap        : 'wrap'
```

## `Col` Props

```javascript
/**
 * Defines the 'align-content' style property.
 */
alignSelf  : responsiveProptypes(PropTypes.oneOf(ALIGN_SELF)),
/**
 * The content of the Col.
 */
children   : PropTypes.node,
/**
 * Defines the 'flex' style property.
 */
flex       : responsiveProptypes(PropTypes.oneOfType([PropTypes.string])),
/**
 * Should the `theme.grid.gutterWidth` be taken into account?
 */
gutter     : PropTypes.bool,
/**
 * Add an offset `margin` to the left of the Col.
 */
leftOffset : responsiveProptypes(PropTypes.oneOfType([PropTypes.bool, PropTypes.number])),
/**
 * Defines the 'flex-order' style property.
 */
order      : responsiveProptypes(PropTypes.oneOfType([PropTypes.number])),
/**
 * Add an offset `margin` to the right of the Col.
 */
rightOffset: responsiveProptypes(PropTypes.oneOfType([PropTypes.bool, PropTypes.number])),
/**
 * Specifies the size of the `column`.
 * Can be set to `auto` for an auto-sizing.
 * Can be set to `true` for sizing the `column` as normal. (default)
 * Can be set to any number from `1 - n` (n being the `theme.grid.column` size).
 * Can be set to an object for responsive styling. `{{ sm: 6, lg: 12 }}`
 */
size       : responsiveProptypes(
    PropTypes.oneOfType([PropTypes.oneOf(['auto', true, false]), PropTypes.number])
),
/**
 * The html tag or React component to use for the root node.
 */
tagname: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object])
```

## `Col` Default Props

```javascript
alignSelf  : null,
children   : null,
flex       : null,
gutter     : true,
leftOffset : false,
order      : null,
rightOffset: false,
size       : false,
tagname    : 'div'
```
