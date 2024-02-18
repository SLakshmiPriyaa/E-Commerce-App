import React from 'react';
import {
  StyleSheet,
  Text,
  Share,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationEvents} from 'react-navigation';
class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 2.5,
    };
  }
  componentWillMount() {
    //Start the method containing the timer
    this.startTimer();
  }
  startTimer = async () => {
    let timeChange;
    //The key is to replace time in state with time for calculation and judgment, because time in state is constantly refreshed in render, but it will not be refreshed in the method
    let time = this.state.time;
    const clock = async () => {
      if (time > 0) {
        //The update method is executed when time>0
        time = time - 1;
        this.setState({
          time: time,
        });
        if (time == -0.5) {
          this.props.navigation.push('login');
        }
        // console.log(time);
      } else {
        //When time=0, execute the end loop method
        clearInterval(timeChange);
        //When the countdown time = 0, enter the project, routing jump is used here
        // try {
        //   const value = await AsyncStorage.getItem('isLogin');

        //   console.log('value');
        //   if (value != null || value == 'true') {
        //     this.props.navigation.navigate('login');
        //   } else {
        //     this.props.navigation.navigate('OrganizationScreen');
        //   }
        // } catch (error) {}
      }
    };
    //The clock method is executed every second
    timeChange = setInterval(clock, 999);
  };
  _onBlurr = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._handleBackButtonClick,
    );
  };

  _onFocus = () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this._handleBackButtonClick,
    );
  };

  _handleBackButtonClick = () => {
    // BackHandler.exitApp();
    return true;
  };
  render() {
    return (
      <View>
        <NavigationEvents
          onWillFocus={this._onFocus}
          onWillBlur={this._onBlurr}
        />
        <View
          style={{
            backgroundColor: '#f3c59b',
            width: wp('100%'),
            height: hp('15%'),
          }}></View>
        <Image
          style={{width: wp('100%'), height: hp('70%'), alignSelf: 'center'}}
          resizeMode="stretch"
          source={require('../assets/Welcome.gif')}
        />
        <View
          style={{
            backgroundColor: '#f3c499',
            width: wp('100%'),
            height: hp('15%'),
          }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
