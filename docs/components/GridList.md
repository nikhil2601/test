[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > GridList

--------------------------------------------------------------------------------

# GridList

**src**: [GridList.js](/src/lib/GridList/GridList.js)

`GridList` displays a collection of items (`image`, `div`, `li`, etc.) in an organized manner.

[Grid lists](https://material.io/design/components/image-lists.html#usage) represent a collection of items in a repeated pattern. They help improve the visual comprehension of the content they hold.

Read more about Grid Lists at [Material Design](https://material.io/design/components/image-lists.html).

## Example

```jsx
import React, { Component } from 'react';

import { Container, Divider, GridList, GridListItem, Typography } from 'lib';

const GRID_LIST_CONTENT = [
    {
        img: 'https://placeimg.com/640/480/any',
        title: 'Image',
        author: 'author',
        alt: 'author',
        cols: 1
    },
    {
        img: 'https://placeimg.com/640/480/arch',
        title: 'Image 2',
        author: 'author 2',
        alt: 'author 2',
        cols: 3
    },
    {
        img: 'https://placeimg.com/640/480/nature',
        title: 'Image 3',
        author: 'author 3',
        alt: 'author 3',
        cols: 2
    },
    {
        img: 'https://placeimg.com/640/480/tech',
        title: 'Image 4',
        author: 'author 4',
        alt: 'author 4',
        cols: 2
    }
];

const SampleGridList = () => (
    <Container margin="50px auto">
        <Typography type="subheading">Sample Grid List</Typography>
        <Divider light />
        <GridList cols={4}>
            {GRID_LIST_CONTENT.map(item => (
                <GridListItem key={item.title} {...item}>
                    <img src={item.img} alt={item.alt} />
                </GridListItem>
            ))}
        </GridList>
    </Container>
);

export default SampleGridList;
```

## Props

```javascript
/**
 * Set a pre-determined cell-height for a single `GridList` item.
 * Set to `auto` to have the inner children determine their own height.
 */
cellHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
/**
 * The items of the `GridList`.
 */
children  : PropTypes.node.isRequired,
/**
 * Number of grid-columns.
 */
cols      : PropTypes.number,
/**
 * The spacing to be added between the `GridList` items.
 */
spacing   : PropTypes.number
```

## Default Props

```javascript
cellHeight: 200,
cols      : 2,
spacing   : 10
```
