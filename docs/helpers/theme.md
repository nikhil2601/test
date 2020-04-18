[pep-comp](/) > [docs](/docs/README.md) > [helpers](/docs/helpers/README.md) > theme

--------------------------------------------------------------------------------

# theme

**src**: [theme.js](/src/lib/utils/theme.js)

`theme` provides a powerful helper function, `getThemeProps`, which returns the `props.theme[givenPath]` or `fallback` property of a given styled or regular component.

## getThemeProps

```jsx
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
// Build a theme
const THEME = {
    palette: {
        dark: {
            bg: 'red',
            text: 'white'
        },
        light: {
            bg: 'yellow',
            text: '#101'
        }
    },
    Button: {
        styles: {
            backgroundColor: 'orange',
            color: 'white'
        }
    }
};
// Build a button
const Button = styled.button`
    /**
     * Get the default styles from the theme.
     */
    ${getThemeProps('Button.styles')};
    /**
     * Dynamic styles
     */
    ${({ theme, color }) => {
        const backgroundColor = getThemeProps(`palette.${color}.bg`, null, { theme });
        const color = getThemeProps(`palette.${color}.text`, null, { theme });

        return {
            backgroundColor,
            color
        };
    }};
`;
// Add the button to the main container element with the provided theme
const Container = () => (
    <ThemeProvider theme={THEME}>
        <Button color="dark">Hello</Button>
    </ThemeProvider>
);
```
