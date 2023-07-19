import 'react-native-gesture-handler';
import * as React from 'react';
import { Home } from './src/Home';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/common/store';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { navigationRef } from './src/common/navigation/navigationService';
import { theme } from './src/common/theme';
import { ErrorBoundary } from './src/common/ErrorBoundary/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';

// Gets the current screen from navigation state
const getActiveRouteName: any = (state: any) => {
  const route = state?.routes[state?.index];

  if (route?.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route?.name;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.default },
  fallbackImageStyle: { width: "100%", height: "100%" }
});

const themeForPaper = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.background.base,
    accent: theme.colors.background.base,
  },
};

const Fallback = () => <Image style={styles.fallbackImageStyle} source={require("./res/assets/splash.png")} />;

const App = () => {
  const routeNameRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef?.current?.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={themeForPaper}>
          <ErrorBoundary>
            <View style={styles.container}>
              <NavigationContainer
                ref={navigationRef}
                fallback={<Fallback />}
                onReady={() => {
                  const state = navigationRef?.current?.getRootState();
                }}
                onStateChange={(state: any) => {
                  const previousRouteName = routeNameRef.current;
                  const currentRouteName = getActiveRouteName(state);
                  if (previousRouteName !== currentRouteName) {
                    console.log('Analytics : ', currentRouteName);

                    routeNameRef.current = currentRouteName;
                  }
                }
                }>
                <Home />
              </NavigationContainer>
            </View>
          </ErrorBoundary>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App