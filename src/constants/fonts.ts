import * as Font from 'expo-font';

// Define the font files
const fontAssets = {
  'Karla_700Bold': require('../assets/fonts/Karla-Bold.ttf'),
  'Karla_500Medium': require('../assets/fonts/Karla-Medium.ttf'),
  'Karla_400Regular': require('../assets/fonts/Karla-Regular.ttf'),
  'MarkaziText_500Medium': require('../assets/fonts/MarkaziText-Medium.ttf'),
  'MarkaziText_400Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
};

// Load fonts
export async function loadFonts() {
  await Font.loadAsync(fontAssets);
}

// Export font styles
// export const fonts = {
//   karla: {
//     bold: 'Karla-Bold',
//     boldItalic: 'Karla-BoldItalic',
//     extraBold: 'Karla-ExtraBold',
//     extraBoldItalic: 'Karla-ExtraBoldItalic',
//     extraLight: 'Karla-ExtraLight',
//     extraLightItalic: 'Karla-ExtraLightItalic',
//     italic: 'Karla-Italic',
//     light: 'Karla-Light',
//     lightItalic: 'Karla-LightItalic',
//     medium: 'Karla-Medium',
//     mediumItalic: 'Karla-MediumItalic',
//     regular: 'Karla-Regular',
//     semiBold: 'Karla-SemiBold',
//     semiBoldItalic: 'Karla-SemiBoldItalic',
//   },
//   markaziText: {
//     bold: 'MarkaziText-Bold',
//     medium: 'MarkaziText-Medium',
//     regular: 'MarkaziText-Regular',
//     semiBold: 'MarkaziText-SemiBold',
//   }
// };

// const [fontsLoaded] = useFonts({
//   'Karla_700Bold': require('./src/assets/fonts/Karla-Bold.ttf'),
//   'Karla_500Medium': require('./src/assets/fonts/Karla-Medium.ttf'),
//   'Karla_400Regular': require('./src/assets/fonts/Karla-Regular.ttf'),
//   'MarkaziText_500Medium': require('./src/assets/fonts/MarkaziText-Medium.ttf'),
//   'MarkaziText_400Regular': require('./src/assets/fonts/MarkaziText-Regular.ttf'),
// });