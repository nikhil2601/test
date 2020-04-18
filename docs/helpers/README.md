[pep-comp](/) > [docs](/docs) > [helpers](/docs/helpers) > README

--------------------------------------------------------------------------------

# Available Helpers

List of available helper functions from the `pep-comp` library. Import them via the es6 `import *` statement or use the `window.pepComp` if using the UMD definition. [Read more about pep-comp Installations...](/docs/Installation.md)

## List of Helper Functions

- [bindToAngular](/docs/helpers/bindToAngular.md)
- [component](/docs/helpers/component.md)
- [generate](/docs/helpers/generate.md)
- [renderComponent](/docs/helpers/renderComponent.md)
- [theme](/docs/helpers/theme.md)
- [withActionHandlers](/docs/helpers/withActionHandlers.md)

## How to import and use a pep-comp Helper Function in your code...

### `getThemeProps()`

```javascript
import styled from 'styled-components';
import { getThemeProps } from 'pep-comp';

const NavLogoStyled = styled.a`
    align-items: center;
    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'auto')};
    display: flex;
    height: 62px;
    justify-content: center;
    position: relative;
    img {
        max-width: 100%;
        max-height: 70%;
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('NavLogo.styles')};
`;

export default NavLogoStyled;
```

Read more about the [getThemeProps helper function...](/docs/helpers/theme.md)

### `genID()`

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { genID } from 'pep-comp';

import NavItem from '../NavItem';
import NavItemsStyled from './NavItemsListStyled';

const NavItemsList = ({ items }) => (
    <NavItemsStyled>
        {items.map(item => (
            <NavItem key={genID()} {...item}>
                {item.title}
            </NavItem>
        ))}
    </NavItemsStyled>
);

NavItemsList.propTypes = {
    items: PropTypes.array
};

NavItemsList.defaultProps = {
    items: []
};

export default NavItemsList;
```

Read more about the [genID helper function...](/docs/helpers/generate.md)
