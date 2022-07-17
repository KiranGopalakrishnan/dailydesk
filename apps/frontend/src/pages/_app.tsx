import * as React from 'react';
import { theme } from '@ui-kit/Theme';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '@store';
import { WithAutoLogin } from '../utils/WithAutoLogin';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import '../utils/global.css';
import { Grid, StyledEngineProvider, ThemeProvider } from '@mui/material';

const clientSideEmotionCache = createEmotionCache();

interface EnhancedAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const App: React.FC<EnhancedAppProps> = (props: EnhancedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <WithAutoLogin>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Grid container style={{ height: '100%' }}>
                <Component {...pageProps} />
              </Grid>
            </ThemeProvider>
          </StyledEngineProvider>
        </WithAutoLogin>
      </CacheProvider>
    </Provider>
  );
};

export default App;
