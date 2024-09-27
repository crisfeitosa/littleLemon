import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';

type AppRoutes = {
  home: undefined;
  profile: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='home'>
      <Screen 
        name="home"
        component={Home}
      />

      <Screen 
        name="profile"
        component={Profile}
      />
    </Navigator>
  )
}
