import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { gluestackUIConfig } from '../../config/gluestack-ui.config';
import { Box } from '@gluestack-ui/themed';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '@hooks/auth';
import { useEffect } from 'react';

export function Routes() {
  const { state, authActions } = useAuth();
  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.backgroundLight0;

  useEffect(() => {
    authActions.setLoading(true);
    authActions.checkOnboard();
  }, [authActions]);

  return (
    <Box flex={1} bg="$backgroundLight0">
      <NavigationContainer theme={theme}>
        {state.isOnboardingCompleted ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}