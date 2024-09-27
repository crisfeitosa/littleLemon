import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { Onboarding } from '@screens/Onboarding';

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
  onboarding: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='onboarding'>
      <Screen 
        name="onboarding"
        component={Onboarding}
      />

      <Screen 
        name="signIn"
        component={SignIn}
      />

      <Screen 
        name="signUp"
        component={SignUp}
      />
    </Navigator>
  )
}