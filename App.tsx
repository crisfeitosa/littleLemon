import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Loading } from '@components/Loading';
import { config } from './config/gluestack-ui.config';
import { Routes } from '@routes/index';
import { Providers } from './src/providers';
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Karla_700Bold': require('./src/assets/fonts/Karla-Bold.ttf'),
    'Karla_500Medium': require('./src/assets/fonts/Karla-Medium.ttf'),
    'Karla_400Regular': require('./src/assets/fonts/Karla-Regular.ttf'),
    'MarkaziText_500Medium': require('./src/assets/fonts/MarkaziText-Medium.ttf'),
    'MarkaziText_400Regular': require('./src/assets/fonts/MarkaziText-Regular.ttf'),
  });

  useEffect(() => {
    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    };

    showSplashScreen();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (fontsLoaded) hideSplashScreen();
  }, [fontsLoaded]);

  return (
    <GluestackUIProvider config={config}>
      <Providers>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
          {fontsLoaded ? <Routes /> : <Loading />}
      </Providers>
    </GluestackUIProvider>
  )
}
