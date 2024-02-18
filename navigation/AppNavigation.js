import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../screens/Splash';
// import Categories from '../tabnavigation/Categories';
const AppNavigation = createStackNavigator(
  {
    Splash: {screen: Splash},
  },
  {
    initialRouteName: 'Splash',
  },
);

export default AppNavigation;
