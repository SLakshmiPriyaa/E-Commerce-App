import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FormInput,
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
  FlatList,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import NumericInput from 'react-native-numeric-input';
import {NavigationEvents} from 'react-navigation';
class cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishes: null,
      scan: false,
      cartvalue: false,
      Gstlist: [
        {title: '12%', id: 1},
        {title: '5%', id: 1},
        {title: '3%', id: 1},
      ],
      gstvalue: '12%',
      price: 1500,
      gstprice: 150,
      qrcodetext: null,
      Listofdata: null,
      Listofdatawithcount: null,
      listlength: 0,
    };
  }
  componentDidMount = async () => {
    var p = await AsyncStorage.getItem('List');
    this.setState({Listofdata: JSON.parse(p)}, () => {
      if (this.state.Listofdata == null || this.state.Listofdata == undefined) {
      } else {
        let arr = this.state.Listofdata.map(item => {
          return {name: item};
        });

        key = 'name';
        let arr2 = [];

        arr.forEach(x => {
          // Checking if there is any object in arr2
          // which contains the key value
          if (
            arr2.some(val => {
              return val[key] == x[key];
            })
          ) {
            // If yes! then increase the occurrence by 1
            arr2.forEach(k => {
              if (k[key] === x[key]) {
                k['occurrence']++;
              }
            });
          } else {
            // If not! Then create a new object initialize
            // it with the present iteration key's value and
            // set the occurrence to 1
            let a = {};
            a[key] = x[key];
            a['occurrence'] = 1;
            arr2.push(a);
          }
        });
        console.log(arr2);
        this.setState({Listofdatawithcount: arr2});
      }
    });
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
    return true;
  };
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <NavigationEvents
            onWillFocus={this._onFocus}
            onWillBlur={this._onBlurr}
          />
          <View style={{width: wp('100%'), backgroundColor: '#f3c49b'}}>
            <View
              style={{
                // alignItems: 'center',
                // justifyContent: 'center',
                marginTop: hp('3%'),
                marginBottom: hp('6%'),
              }}>
              <Image
                style={{
                  height: hp('12%'),
                  width: wp('70%'),
                  alignSelf: 'center',
                  //   marginTop: hp('-4%'),
                  // marginLeft: wp('60%'),
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // alignContent: 'center',
                }}
                resizeMode="stretch"
                source={require('../assets/Logo3.png')}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#ffff',
              width: wp('70%'),
              height: hp('5%'),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: wp('5%'),
              marginTop: hp('-2.5%'),
              marginBottom: hp('0.5%'),
            }}>
            <Text
              style={{
                color: '#333',
                fontSize: 18,
                fontFamily: 'WorkSans-Bold',
                textAlign: 'center',
                // marginTop: hp('-2%'),
                // marginBottom: hp('2.5%'),
                // marginLeft:wp('5%'),marginRight:wp('3%'),
              }}>
              CART VALUES
            </Text>
          </View>
          {this.state.Listofdata == null ||
          this.state.Listofdata == undefined ? (
            <>
              <Text
                style={{
                  //   marginLeft: wp('0.5%'),marginRight:wp('0.5%')
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 22,
                  color: '#b33035',
                  textAlign: 'center',
                  marginTop: hp('25%'),
                }}>
                OOPS !
              </Text>
              <Text
                style={{
                  //   marginLeft: wp('0.5%'),marginRight:wp('0.5%')
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 20,
                  color: 'black',
                  textAlign: 'center',
                  // marginTop: hp('5%'),
                }}>
                No Data Found
              </Text>
              <TouchableOpacity
                style={{
                  paddingTop: hp('0.7%'),
                  paddingBottom: hp('0.7%'),
                  backgroundColor: '#ffbd80',
                  borderRadius: wp('5%'),
                  width: wp('60%'),
                  alignSelf: 'center',
                  marginTop: hp('17%'),
                  // marginLeft: wp('3%'),
                  marginBottom: hp('2%'),
                }}
                activeOpacity={0.5}
                onPress={async () => {
                  await AsyncStorage.setItem('ListCount', '0');
                  this.props.navigation.push('home');
                  //   console.log(transformedArray);
                  // this.RBSheet2.open();
                  // this.setState({scan: true}, () => {
                  //   //   this.check();
                  // });
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    fontFamily: 'WorkSans-Bold',
                    fontSize: 17,
                  }}>
                  {' '}
                  BACK{' '}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <FlatList
                data={this.state.Listofdatawithcount}
                // horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <View
                        style={{
                          // height: hp('4.4%'),
                          width: wp('90%'),
                          borderRadius: wp('3%'),
                          backgroundColor: '#ffff',
                          marginLeft: wp('2%'),
                          marginRight: wp('2%'),
                          marginTop: hp('1%'),
                          marginBottom: hp('1%'),
                          // alignItems: 'center',
                          // justifyContent: 'center',
                          alignSelf: 'center',
                          elevation: 10,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 3},
                          shadowOpacity: 0.5,
                          shadowRadius: 5,
                        }}>
                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-Regular',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          Name
                        </Text>

                        <Text
                          style={{
                            textAlign: 'right',
                            color: '#333',
                            fontFamily: 'WorkSans-Regular',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('-3%'),
                            // marginBottom: hp('2.2%'),
                            marginRight: wp('5%'),
                            marginLeft: wp('35%'),
                          }}>
                          {item.name}
                        </Text>

                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-Regular',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          Price
                        </Text>
                        <Text
                          style={{
                            textAlign: 'right',
                            color: '#333',
                            fontFamily: 'WorkSans-Regular',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('-3%'),
                            // marginBottom: hp('2.2%'),
                            marginRight: wp('5%'),
                            marginLeft: wp('35%'),
                          }}>
                          ₹ {this.state.price}
                        </Text>

                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-Regular',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          GST ({this.state.gstvalue})
                        </Text>

                        <Text
                          style={{
                            textAlign: 'right',
                            color: '#333',
                            fontFamily: 'WorkSans-Regular',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('-3%'),
                            // marginBottom: hp('2.2%'),
                            marginRight: wp('5%'),
                            marginLeft: wp('35%'),
                          }}>
                          ₹ {this.state.gstprice}
                        </Text>
                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-Regular',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          Total (Inc. Tax)
                        </Text>

                        <Text
                          style={{
                            textAlign: 'right',
                            color: '#333',
                            fontFamily: 'WorkSans-Regular',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('-3%'),
                            marginBottom: hp('1.5%'),
                            marginRight: wp('5%'),
                            marginLeft: wp('35%'),
                          }}>
                          ₹ {this.state.gstprice + this.state.price}
                        </Text>
                        <View
                          style={{
                            alignSelf: 'flex-end',
                            marginBottom: hp('2%'),
                            marginRight: wp('5%'),
                          }}>
                          <NumericInput
                            value={item.occurrence}
                            minValue={1}
                            onChange={value => {
                              //   console.log(value);
                              let newMarkers = this.state.Listofdatawithcount;
                              newMarkers[index].occurrence = value;
                              console.log(newMarkers);
                              this.setState({Listofdatawithcount: newMarkers});
                              this.setState({value});
                            }}
                            onLimitReached={(isMax, msg) =>
                              console.log('isMax, msg')
                            }
                            maxValue={50}
                            totalWidth={wp('40%')}
                            totalHeight={hp('4%')}
                            iconSize={25}
                            step={1}
                            valueType="real"
                            rounded={true}
                            textColor="#c40293"
                            iconStyle={{color: 'white'}}
                            rightButtonBackgroundColor="#00a321"
                            leftButtonBackgroundColor="#E56B70"
                          />
                        </View>
                      </View>
                    </>
                  );
                }}
              />
              <TouchableOpacity
                style={{
                  paddingTop: hp('0.7%'),
                  paddingBottom: hp('0.7%'),
                  backgroundColor: '#ffbd80',
                  borderRadius: wp('5%'),
                  width: wp('60%'),
                  alignSelf: 'center',
                  marginTop: hp('7%'),
                  // marginLeft: wp('3%'),
                  marginBottom: hp('2%'),
                }}
                activeOpacity={0.5}
                onPress={async () => {
                  let originalArray = this.state.Listofdatawithcount;
                  let transformedArray = originalArray.reduce((acc, curr) => {
                    for (let i = 0; i < curr.occurrence; i++) {
                      acc.push(curr.name);
                    }
                    return acc;
                  }, []);
                  await AsyncStorage.setItem(
                    'List',
                    JSON.stringify(transformedArray),
                  );
                  await AsyncStorage.setItem('Fromcart', 'true');
                  await AsyncStorage.setItem(
                    'ListCount',
                    transformedArray.length.toString(),
                  );
                  this.props.navigation.push('home');
                  //   console.log(transformedArray);
                  // this.RBSheet2.open();
                  // this.setState({scan: true}, () => {
                  //   //   this.check();
                  // });
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    fontFamily: 'WorkSans-Bold',
                    fontSize: 17,
                  }}>
                  {' '}
                  SAVE & BACK{' '}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
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

export default cart;
