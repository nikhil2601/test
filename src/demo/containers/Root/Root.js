import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { generateTheme } from 'pep-comp';

import AppContent from 'demo/components/AppContent';
import AppWrapper from 'demo/components/AppWrapper';
import DEFAULT_THEME from 'demo/constants/theme';
import Routes from 'demo/containers/Routes';

/**
 * Create a global style palette
 *
 * @type {Object}
 */
const GlobalStyle = createGlobalStyle``;

class Root extends Component {
    static propTypes = {
        persistor: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
    };

    render() {
        const { persistor, store } = this.props;

        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <ThemeProvider theme={generateTheme(DEFAULT_THEME)}>
                        <BrowserRouter>
                            <AppWrapper>
                                <GlobalStyle />
                                <AppContent>
                                    <Routes />
                                </AppContent>
                            </AppWrapper>
                        </BrowserRouter>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        );
    }
}

export default Root;
