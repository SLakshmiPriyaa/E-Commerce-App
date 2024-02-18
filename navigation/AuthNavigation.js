import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../screens/Splash';
import login from '../screens/login';
import home from '../screens/home';
import cart from '../screens/cart';
const AuthNavigation = createStackNavigator(
  {
    home: {
      screen: home,
      navigationOptions: {
        headerShown: null,
      },
    },
    cart: {
      screen: cart,
      navigationOptions: {
        headerShown: null,
      },
    },
    login: {
      screen: login,
      navigationOptions: {
        headerShown: null,
      },
    },
    Splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: null,
      },
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

export default AuthNavigation;
