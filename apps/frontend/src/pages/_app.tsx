import * as React from 'react';
import { Grid, MuiThemeProvider } from '@material-ui/core';
import { theme } from '../src/ui-kit/Theme';
import { Provider, useDispatch } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '@store';
import { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import { autoLogin } from '../src/store/user/user-thunk';
import { WithAutoLogin } from '../src/utils/WithAutoLogin';
import { Header } from '../src/shared/header/Header';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from './createEmotionCache';

const GlobalStyle = createGlobalStyle`
html,body,#__next {
  height: 100%;
  margin: 0;
}
`;


const clientSideEmotionCache = createEmotionCache();

interface ExtraMUIProps {
  emotionCache: EmotionCache
}

const App: React.FC<AppProps> = (props : AppProps&ExtraMUIProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
      <WithAutoLogin>
        <MuiThemeProvider theme={theme}>
          <GlobalStyle />
          {/*<Grid container style={{ height: '72px' }}>*/}
          {/*  <Header />*/}
          {/*</Grid>*/}
          <Grid container style={{ height: '100%' }}>
            <Component {...pageProps}/>
          </Grid>
        </MuiThemeProvider>
      </WithAutoLogin>
      </CacheProvider>
    </Provider>
  );
};

export default App;
