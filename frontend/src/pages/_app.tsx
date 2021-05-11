import * as React from 'react';
import { ProjectsProvider } from '@reducers/ProjectsReducer';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from '@ui-kit/Theme';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '@store';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,body,#__next {
  height: 100%;
  margin: 0;
}
`;

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ProjectsProvider>
          <GlobalStyle />
          <Component />
        </ProjectsProvider>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
