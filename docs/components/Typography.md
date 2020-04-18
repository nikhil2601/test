[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Typography

--------------------------------------------------------------------------------

# Typography

**src**: [Typography.js](/src/lib/Typography/Typography.js)

Use `Typography` to present your content clearly and efficiently throughout the application.

`Typography` removes the overhead of having too many styles and font-sizes in a single application. It's better to have a defined set of styles that match the overall design of the application. That's where `Typography` shines.

It defines the following different styles, accessable via the `type` property, and can be updated by providing a `theme` prop to the component, with a `theme.typography.${VARIANT_NAME}` containing the updated styles:

1. display4
2. display3
3. display2
4. display1
5. headline
6. title
7. subheading
8. body
9. caption
10. button

The type-scale sort of follows the typographic principals set forth by [Google Material Design](https://material.io/design/typography/#type-scale).

## Example

```jsx
import React, { Fragment } from 'react';

import { Typography } from 'pep-comp';

const TypographyExamples = () => (
    <Fragment>
        <Typography type="display4">This is a Large Display.</Typography>
        <Typography type="display3">This is a Medium Display.</Typography>
        <Typography type="display2">This is a Small Display.</Typography>
        <Typography type="display1">This is a Regular Display.</Typography>
        <Typography type="headline">This is a Headline.</Typography>
        <Typography type="title">This is a Title.</Typography>
        <Typography type="subheading">This is a Sub-heading.</Typography>
        <Typography type="body">This is a Paragraph.</Typography>
        <Typography>This is a Paragraph.</Typography>
        <Typography type="caption">This is a Caption.</Typography>
        <Typography type="button">This is a Button.</Typography>
    </Fragment>
);

export default TypographyExamples;
```

## Props

```javascript
/**
 * The text-align property of the component.
 */
align       : responsiveProptypes(PropTypes.oneOf(['left', 'center', 'right', 'justify'])),
/**
 * Set the color of the typography component.
 *
 * Color(s) can be set in `theme.palette`.
 */
color       : responsiveProptypes(PropTypes.string),
/**
 * Add a gutter to the bottom of the Typography.
 */
gutterBottom: responsiveProptypes(PropTypes.string),
/**
 * Add a gutter to the left of the Typography.
 */
gutterLeft  : responsiveProptypes(PropTypes.string),
/**
 * Add a gutter to the right of the Typography.
 */
gutterRight : responsiveProptypes(PropTypes.string),
/**
 * Add a gutter to the top of the Typography.
 */
gutterTop   : responsiveProptypes(PropTypes.string),
/**
 * Set to `true` to enable truncation with an ellipsis.
 */
noWrap      : PropTypes.bool,
/**
 * Apply the themed typography styles.
 */
type        : responsiveProptypes(PropTypes.string)
```

## Default Props

```javascript
align       : null,
color       : null,
gutterBottom: '8px',
gutterLeft  : null,
gutterRight : null,
gutterTop   : null,
noWrap      : false,
type        : 'body'
```
