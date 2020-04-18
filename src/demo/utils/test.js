import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow, mount } from 'enzyme';

// export const wrapWithTheme = (func, children, theme) => {
//   const wrapper = func(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
//
//   return wrapper[func.name]({
//     context          : wrapper.instance().getChildContext(),
//     childContextTypes: ThemeProvider.childContextTypes
//   });
// };

const wrapWithTheme = (func, tree, theme) => {
    const context = shallow(<ThemeProvider theme={theme} />)
        .instance()
        .getChildContext();

    return func(tree, {
        context,
        childContextTypes: ThemeProvider.childContextTypes,
    });
};

export const shallowWithTheme = (...args) => wrapWithTheme(shallow, ...args);

export const mountWithTheme = (...args) => wrapWithTheme(mount, ...args);
