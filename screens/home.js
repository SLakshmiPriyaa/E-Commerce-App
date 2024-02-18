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
import {NavigationEvents} from 'react-navigation';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CustomPicker} from 'react-native-custom-picker';
import {Dialog} from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';
class home extends React.Component {
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
      Listofdata: [],
      listlength: 0,
    };
  }
  renderOption(settings) {
    const {item, getLabel} = settings;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this.props.navigation.push('update')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );
    // console.log(item)
    return (
      <View style={styles.optionContainer}>
        <Text
          style={{
            color: 'black',
            // alignSelf: 'center',
            marginLeft: wp('3%'),
            fontSize: 14,
            fontFamily: 'NexaLight',
            marginTop: hp('1%'),
            marginRight: wp('1%'),
            textAlign: 'left',
          }}>
          {getLabel(item)}
        </Text>
      </View>
    );
  }
  renderField(settings) {
    const {selectedItem, defaultText, getLabel, clear} = settings;
    return (
      <View style={styles.container1}>
        <View>
          {!selectedItem && (
            <Text
              style={[
                styles.text,
                {
                  fontSize: 14,
                  fontFamily: 'WorkSans-Regular',

                  textAlign: 'left',

                  borderRadius: 20,
                  color: '#666',

                  // paddingLeft: 10,
                  paddingTop: -4,
                  marginLeft: wp('3%'),
                  // width: wp('30%'),
                },
              ]}>
              {defaultText}
            </Text>
          )}
          {selectedItem && (
            <View style={styles.innerContainer}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 14,
                    fontFamily: 'WorkSans-Regular',

                    textAlign: 'left',

                    borderRadius: 20,
                    color: '#333',

                    paddingLeft: 2,
                    paddingTop: 2,
                    marginLeft: wp('3%'),
                    // width: wp('25%'),
                    flexWrap: 'wrap',
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
  handleInputChange = (inputName, inputValue) => {
    this.setState(state => ({...state, [inputName]: inputValue}));
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
  componentDidMount = async () => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      this.setState({wishes: 'Good Morning'});
      // console.log('good morning')
    } else if (curHr < 18) {
      this.setState({wishes: 'Good Afternoon'});
      // console.log('good afternoon')
    } else {
      this.setState({wishes: 'Good Evening'});
      // console.log('good evening')
    }
    var p = await AsyncStorage.getItem('Fromcart');

    if (p == 'true') {
      var cc = await AsyncStorage.getItem('ListCount');
      this.setState({listlength: cc});
      var dd = await AsyncStorage.getItem('List');
      this.setState({Listofdata: JSON.parse(dd)}, () => {
        // console.log(this.state.Listofdata);
      });
    }
  };
  barcodeReceived = e => {
    // console.log('Barcode: ' + e.data);
    // console.log('Type: ' + e.type);
    // console.log(e);
    // alert('Barcode Found!', e.data);

    // this.state.Listofdata.push(e.data);

    // if (this.state.Listofdata.includes(e.data) == true) {
    //   this.setState({qrcodetext: e.data, scandialo: true});
    // } else {
    //   this.setState({scan: false, qrcodetext: e.data}, () => {
    // console.log(this.state.Listofdata);
    //     this.RBSheet1.open();
    //   });
    // }
    if (this.state.Listofdata.length == 0) {
      this.setState({scan: false, qrcodetext: e.data}, () => {
        // console.log(e.data);
        this.RBSheet1.open();
      });
    } else if (this.state.Listofdata.includes(e.data) == true) {
      this.setState({qrcodetext: e.data, scandialo: true});
    } else {
      this.setState({scan: false, qrcodetext: e.data}, () => {
        // console.log(e.data);
        this.RBSheet1.open();
      });
    }
  };

  render() {
    return (
      <SafeAreaView>
        <NavigationEvents
          onWillFocus={this._onFocus}
          onWillBlur={this._onBlurr}
        />
        <Dialog
          visible={this.state.scandialo}
          dialogStyle={{
            borderRadius: wp('1%'),
            width: wp('90%'),
            alignSelf: 'center',
          }}
          onTouchOutside={() => {}}>
          <View
            style={{
              backgroundColor: '#ffbd80',
              // width: wp('90%'),
              borderBottomColor: '#333',
              borderBottomWidth: 2,
              marginLeft: wp('-6.3%'),
              marginRight: wp('-6.2%'),
              marginTop: hp('-2.45%'),
              borderTopLeftRadius: wp('1%'),
              borderTopRightRadius: wp('1%'),
              flexDirection: 'row',
              // alignItems: 'center',s
              // justifyContent: 'center',
            }}>
            <Text
              style={{
                // textAlign: 'center',
                color: '#333',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: 18,
                marginLeft: wp('4%'),
                // marginRight: wp('23%'),
                marginTop: hp('1.5%'),
                marginBottom: hp('1.5%'),
                // alignSelf: 'center',
              }}>
              ADD CART VALUE
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this.setState({scandialo: false, scan: false});
              }}>
              <Icon
                name="ios-close-circle"
                color={'#333'}
                style={{
                  marginTop: hp('1.2%'),
                  marginBottom: hp('1%'),
                  marginLeft: wp('25%'),
                }}
                size={hp('4.2%')}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={{
              //  borderWidth: 1,
              height: hp('7%'),
              width: hp('7%'),
              // borderColor: 'forestgreen',
              borderRadius: hp('100%'),
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: hp('2%'),
              // marginBottom: hp('1%'),
            }}
            resizeMode="contain"
            source={require('../assets/About-Icon-removebg-preview.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'WorkSans-SemiBold',
              marginTop: hp('2%'),
              color: '#333',
              marginLeft: wp('2%'),
              marginRight: wp('2%'),
            }}>
            Are you sure you want to add the cart value again?
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={async () => {
              this.state.Listofdata.push(this.state.qrcodetext);
              this.setState({
                listlength: this.state.Listofdata.length,
                scan: false,
                scandialo: false,
              });
              await AsyncStorage.setItem(
                'List',
                JSON.stringify(this.state.Listofdata),
              );
              await AsyncStorage.setItem(
                'ListCount',
                this.state.Listofdata.length.toString(),
              );
            }}>
            <View
              style={{
                backgroundColor: 'green',
                width: wp('32%'),
                alignItems: 'center',
                justifyContent: 'center',
                height: hp('4%'),
                marginTop: hp('4%'),
                borderRadius: wp('5%'),
                elevation: 15,
                borderColor: 'green',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.5,
                shadowRadius: 5,
                marginBottom: hp('2%'),
                marginLeft: wp('5%'),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontFamily: 'WorkSans-Bold',
                  // marginTop: hp('2%'),
                  color: '#ffff',
                  // marginLeft: wp('5%'),
                  // marginRight: wp('2%'),
                }}>
                YES
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              this.setState({
                scan: false,
                scandialo: false,
              })
            }>
            <View
              style={{
                backgroundColor: '#ba131a',
                width: wp('32%'),
                alignItems: 'center',
                justifyContent: 'center',
                height: hp('4%'),
                marginTop: hp('-6%'),
                borderRadius: wp('5%'),
                elevation: 15,
                borderColor: '#ba131a',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.5,
                shadowRadius: 5,
                marginBottom: hp('4%'),
                marginRight: wp('5%'),
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontFamily: 'WorkSans-Bold',
                  // marginTop: hp('2%'),
                  color: '#ffff',
                  // marginLeft: wp('5%'),
                  // marginRight: wp('2%'),
                }}>
                NO
              </Text>
            </View>
          </TouchableOpacity>
        </Dialog>
        {this.state.scan == true ? (
          <>
            <QRCodeScanner
              onRead={e => this.barcodeReceived(e)}
              // style={{height: hp('50%')}}
              // flashMode={RNCamera.Constants.FlashMode.torch}
              cameraTimeout={30000}
              cameraType={'back'}
              cameraStyle={{height: hp('85%')}}
            />

            <TouchableOpacity
              style={{
                marginTop: hp('90%'),
                paddingTop: hp('0.7%'),
                paddingBottom: hp('0.7%'),
                backgroundColor: '#ffbd80',
                borderRadius: wp('10%'),
                // marginLeft: wp('35%'),
                // marginRight: wp('33%'),
                width: wp('50%'),
                marginBottom: hp('4%'),
                alignSelf: 'center',
              }}
              activeOpacity={0.5}
              onPress={() =>
                this.setState({scan: false}, async () => {
                  // this.props.navigation.push('dashboard');
                  // let brightness =
                  //   await DeviceBrightness.getBrightnessLevel();
                  // DeviceBrightness.setBrightnessLevel(brightness);
                })
              }>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#333',
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 14,
                }}>
                {' '}
                BACK{' '}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={{width: wp('100%'), backgroundColor: '#f3c49b'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                // style={{position: 'absolute'}}
                onPress={async () => {
                  await AsyncStorage.removeItem('List');
                  await AsyncStorage.removeItem('ListCount');
                  await AsyncStorage.removeItem('Fromcart');
                  this.props.navigation.push('login');
                }}>
                <Icon
                  name="log-out"
                  color={'#333'}
                  size={hp('4%')}
                  style={{
                    marginRight: wp('7%'),
                    marginTop: hp('2.5%'),
                    alignSelf: 'flex-end',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  marginTop: hp('2%'),
                  marginBottom: hp('15%'),
                }}>
                <Image
                  style={{
                    height: hp('15%'),
                    width: wp('80%'),
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
                width: wp('100%'),
                borderRadius: wp('17%'),
                marginTop: hp('-8%'),
                height: hp('80%'),
              }}>
              <Text
                style={{
                  // textAlign: 'center',
                  color: '#333',
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 16,
                  marginLeft: wp('10%'),
                  // textDecorationLine: 'underline',
                  marginTop: hp('4%'),
                }}>
                😊 {this.state.wishes} ,
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#333',
                  fontFamily: 'WorkSans-Regular',
                  fontSize: 15,
                  marginLeft: wp('10%'),
                  marginRight: wp('10%'),
                  // textDecorationLine: 'underline',
                  marginTop: hp('2%'),
                  // width: wp('87%'),
                }}>
                Please click below button to scan QRCode to add value to the
                cart.
              </Text>

              <TouchableOpacity
                style={{
                  paddingTop: hp('0.7%'),
                  paddingBottom: hp('0.7%'),
                  backgroundColor: '#ffbd80',
                  borderRadius: wp('5%'),
                  width: wp('70%'),
                  alignSelf: 'center',
                  marginTop: hp('15%'),
                  // marginLeft: wp('3%'),
                  marginBottom: hp('12%'),
                }}
                activeOpacity={0.5}
                onPress={() => {
                  // this.RBSheet2.open();
                  this.setState({scan: true}, () => {
                    //   this.check();
                  });
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    fontFamily: 'WorkSans-Bold',
                    fontSize: 17,
                  }}>
                  {' '}
                  SCAN QRCODE{' '}
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={async () => {
                    this.props.navigation.push('cart');
                  }}>
                  <Image
                    style={{
                      //  borderWidth: 1,
                      height: hp('8%'),
                      width: hp('8%'),
                      // borderColor: 'forestgreen',
                      borderRadius: hp('100%'),
                      alignSelf: 'flex-end',
                      justifyContent: 'center',
                      marginRight: wp('7%'),
                      // marginTop: hp('-1%'),
                      // marginBottom: hp('1%'),
                    }}
                    resizeMode="contain"
                    source={require('../assets/cart-removebg-preview.png')}
                  />
                  <View
                    style={{
                      backgroundColor: 'forestgreen',
                      height: hp('4.5%'),
                      width: hp('4.5%'),
                      // borderColor: 'forestgreen',
                      borderRadius: hp('100%'),
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      right: wp('18%'),
                      top: hp('-2%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        // textAlign: 'right',
                        color: '#ffff',
                        fontFamily: 'WorkSans-SemiBold',
                        fontSize: 15,
                        // marginRight: wp('28%'),
                      }}>
                      {this.state.listlength}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          height={hp('50%')}
          // openDuration={250}
          customStyles={{
            container: {
              // justifyContent: "center",
              // alignItems: "center"
            },
          }}>
          <ScrollView>
            <Text
              style={{
                // textAlign: 'right',
                color: '#333',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: 15,
                // marginRight: wp('28%'),
                marginTop: hp('1.35%'),
                marginBottom: hp('1.2%'),
                marginLeft: wp('6%'),
                width: wp('60%'),
              }}>
              Add Cart Values
            </Text>
            <Separator1 />

            <Text
              style={{
                // textAlign: 'right',
                color: 'grey',
                fontFamily: 'WorkSans-Regular',
                fontSize: 14,
                // marginRight: wp('28%'),
                marginTop: hp('2%'),
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
              {this.state.qrcodetext}
            </Text>

            <Text
              style={{
                // textAlign: 'right',
                color: 'grey',
                fontFamily: 'WorkSans-Regular',
                fontSize: 14,
                // marginRight: wp('28%'),
                marginTop: hp('2%'),
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
                marginTop: hp('2%'),
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
                marginTop: hp('2%'),
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
                // marginBottom: hp('2.2%'),
                marginRight: wp('5%'),
                marginLeft: wp('35%'),
              }}>
              ₹ {this.state.gstprice + this.state.price}
            </Text>
            <TouchableOpacity
              style={{
                // paddingTop: hp('0.5%'),
                // paddingBottom: hp('0.5%'),
                backgroundColor: '#000096',
                borderRadius: wp('10%'),
                width: wp('40%'),
                // alignSelf: 'center',
                marginTop: hp('7%'),
                marginLeft: wp('6%'),
                // marginBottom: hp('2%'),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.5}
              onPress={() => {
                this.RBSheet2.open();
              }}>
              <Icon
                name="pencil-sharp"
                color={'#ffff'}
                style={{
                  marginTop: hp('0.5%'),
                  marginBottom: hp('0.5%'),
                  // marginLeft: wp('12%'),
                }}
                size={hp('3%')}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: '#ffff',
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 15,
                  marginLeft: wp('2%'),
                }}>
                {' '}
                EDIT GST{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // paddingTop: hp('0.5%'),
                // paddingBottom: hp('0.5%'),
                backgroundColor: 'green',
                borderRadius: wp('10%'),
                width: wp('40%'),
                alignSelf: 'flex-end',
                marginTop: hp('-4.2%'),
                marginRight: wp('6%'),
                marginBottom: hp('2%'),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.5}
              onPress={() => {
                this.state.Listofdata.push(this.state.qrcodetext);

                this.setState(
                  {listlength: this.state.Listofdata.length},
                  async () => {
                    await AsyncStorage.setItem(
                      'List',
                      JSON.stringify(this.state.Listofdata),
                    );
                    await AsyncStorage.setItem(
                      'ListCount',
                      this.state.Listofdata.length.toString(),
                    );
                    this.RBSheet1.close();
                  },
                );

                // this.setState({scan: true}, () => {
                //   //   this.check();
                // });
              }}>
              <Icon
                name="add-circle-sharp"
                color={'#ffff'}
                style={{
                  marginTop: hp('0.5%'),
                  marginBottom: hp('0.5%'),
                  // marginLeft: wp('12%'),
                }}
                size={hp('3.2%')}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: '#ffff',
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 15,
                  marginLeft: wp('2%'),
                }}>
                {' '}
                ADD{' '}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </RBSheet>
        <RBSheet
          ref={ref => {
            this.RBSheet2 = ref;
          }}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          height={hp('50%')}
          // openDuration={250}
          customStyles={{
            container: {
              // justifyContent: "center",
              // alignItems: "center"
            },
          }}>
          <ScrollView>
            <Text
              style={{
                textAlign: 'center',
                color: '#333',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: 17,
                // marginRight: wp('28%'),
                marginTop: hp('1.35%'),
                marginBottom: hp('1.2%'),
                // marginLeft: wp('6%'),
                // width: wp('60%'),
              }}>
              Change GST Value
            </Text>
            <Separator1 />
            <Text
              style={{
                // textAlign: 'right',
                color: '#666',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: 15,
                // marginRight: wp('28%'),
                marginTop: hp('3%'),
                marginBottom: hp('1.2%'),
                marginLeft: wp('6%'),
                // width: wp('60%'),
              }}>
              Choose GST Value
            </Text>
            <View
              style={{
                // justifyContent: 'center',
                borderWidth: wp('0.3%'),
                borderRadius: wp('3%'),
                // padding: 5,
                height: hp('5%'),
                // marginBottom: hp('3%'),
                borderColor: '#333',
                marginTop: hp('2%'),
                backgroundColor: '#ffff',

                width: wp('85%'),
                alignSelf: 'center',
                flexDirection: 'row',
                // paddingLeft: wp('12%'),a
                alignItems: 'center',
                // justifyContent: 'center',
              }}>
              <Icon
                style={{
                  // width: wp('10%'),
                  // marginRight: hp('2%'),
                  // marginTop: hp('-4.2%'),
                  marginLeft: wp('5%'),
                  // paddingLeft: wp('3.5%'),
                }}
                // onPress={this.setPasswordVisibility}
                activeOpacity={0.5}
                name="chevron-down-circle-sharp"
                color={'#144924'}
                size={hp('2.9%')}
              />
              <CustomPicker
                style={{color: '#dcdcdc'}}
                placeholder={this.state.gstvalue}
                fontFamily={'WorkSans-Regular'}
                placeholderTextColor={'black'}
                color={'black'}
                labelStyle={{
                  color: 'black',
                }}
                fieldTemplate={this.renderField}
                options={this.state.Gstlist}
                getLabel={item => item.title}
                optionTemplate={this.renderOption}
                //   onValueChange={(itemValue, itemIndex) =>
                //     this.setState({MemberShipID: itemValue})
                // console.log(itemValue);
                //   }

                onValueChange={value => {
                  this.setState({gstvalue: value.title});
                  if (value.title == '12%') {
                    this.setState({gstprice: 180});
                  } else if (value.title == '5%') {
                    this.setState({gstprice: 75});
                  } else if (value.title == '3%') {
                    this.setState({gstprice: 45});
                  }
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                paddingTop: hp('0.7%'),
                paddingBottom: hp('0.7%'),
                backgroundColor: '#ffbd80',
                borderRadius: wp('5%'),
                width: wp('70%'),
                alignSelf: 'center',
                marginTop: hp('10%'),
                // marginLeft: wp('3%'),
                marginBottom: hp('12%'),
              }}
              activeOpacity={0.5}
              onPress={() => {
                this.RBSheet2.close();
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
                CONTINUE{' '}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </RBSheet>
      </SafeAreaView>
    );
  }
}
const Separator1 = () => (
  <View
    style={{
      borderBottomColor: 'gray',
      borderBottomWidth: 0.7,
      marginTop: hp('1%'),
      alignSelf: 'center',
      width: wp('100%'),
      //   marginBottom: hp('1%'),
    }}
  />
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmitButtonStyle: {
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%'),
    backgroundColor: '#ffbd80',
    borderRadius: wp('5%'),
    width: wp('50%'),
    alignSelf: 'center',
    marginTop: hp('5%'),
    // marginLeft: wp('3%'),
    marginBottom: hp('20%'),
  },
  errorMessage: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
    // marginTop: hp('1%'),
    fontFamily: 'WorkSans-Regular',
    // marginBottom: hp('-2%'),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 18,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: '#0d591b',
    borderBottomWidth: 1,
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  box: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default home;
