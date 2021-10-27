import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  TextInput,
  Image,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  List,
} from 'react-native-paper';
import {colors} from '../constants/themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {images, slider} from '../constants/assets';
import Axios from 'axios';
import DrawerContent from '../drawer/DrawerContent';
import {useDispatch, useSelector} from 'react-redux';
import HeaderComponent from './Header';
import {addItemInCart} from '../redux/actions/CatAction';

import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Content,
  Accordion,
  Thumbnail,
  Toast,
} from 'native-base';

let arry = [];
const ListingHomeScreen = () => {
  let navigation = useNavigation();
  let [state, setState] = useState({
    selected: 'Best Value',
    selected2: 'Categories',
    images: [],
  });
  let {width, height} = Dimensions.get('window');
  let dispatch = useDispatch();
  let [resultData, setData] = useState(false);
  let [featured, setFeatured] = useState(false);
  let [recommended, setRecommended] = useState(false);
  let [sliderData, setSliderData] = useState(false);
  let r_num = Math.random() * 100000000;
  let guest_id = Math.round(r_num);
  let guestID = useSelector(state => state.UserReducer.guest_id);
  let user = useSelector(state => state.UserReducer.userDetails);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const images = [
    require('../images/download.jpg'),
    require('../images/dry1.jpg'),
    require('../images/istockphoto-1208790371-612x612.jpg'),
  ];

  useEffect(() => {
    // Axios.get(
    //   'http://thecodeditors.com/test/carobar/api-get-categories.php',
    // ).then((result) => {
    //   setData(result.data.Data);
    // });
    Axios.get(
      'http://thecodeditors.com/test/carobar/api-get-slider-images.php',
    ).then(result => {
      setSliderData(result.data.Data);
    });
    if (!guestID) {
      dispatch({type: 'Guest ID', payload: guest_id});
    }
  }, []);
  // Get Featured Posts....
  useEffect(() => {
    Axios.get(
      `http://thecodeditors.com/test/carobar/api-get-allproductrole.php?role=featured`,
    ).then(result => {
      setFeatured(result.data.Data);
    });
    Axios.get(
      `http://thecodeditors.com/test/carobar/api-get-allproductrole.php?role=recommended`,
    ).then(result => {
      setRecommended(result.data.Data);
    });
  }, []);

  const [main_cate, setMainCate] = useState(false);
  const [subCate, setSubCate] = useState(false);
  const [allCat, setAllCat] = useState([]);
  const [expanded, setExpanded] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleExpand = key => {
    setExpanded(!expanded[key]);
  };

  useEffect(() => {
    arry = [];
    Axios.get(
      'http://thecodeditors.com/test/carobar/api-get-categories.php',
    ).then(result1 => {
      setMainCate(result1.data.Data);
      result1.data.Data.forEach((item, key) => {
        Axios.get(
          `http://thecodeditors.com/test/carobar/api-get-subcategories.php?id=${item.cat_id}`,
        ).then(result2 => {
          let newObj = {
            cate: item,
            sub_cate: result2.data.Data,
          };
          // console.log(result2.data.Data);
          arry.push(newObj);
          setAllCat([...allCat, newObj]);
          setSubCate(result2.data.Data);
        });
      });
    });
  }, []);

  const RenderSlider = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: 'row',
            width: '100%',
            elevation: 1,
            borderRadius: 5,
            marginBottom: 10,
            height: 100,
          }}
          onPress={() => navigation.navigate('SubCategory', {item: item})}>
          <View>
            <Image
              source={{
                uri: `https://thecodeditors.com/test/marton/admin/third_cat_images/${item.cate.cat_image}`,
              }}
              resizeMode="stretch"
              style={{width: 80, height: 80}}
            />
          </View>
          <View style={{justifyContent: 'center', padding: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {item.cate.cat_name}
            </Text>

            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', width: '90%'}}>
              {item.sub_cate ? (
                item.sub_cate.map((item_sub, key) => (
                  <Text style={{fontWeight: 'normal', fontSize: 14}}>
                    {item_sub.sub_catname} ,
                  </Text>
                ))
              ) : (
                <Text style={{fontWeight: 'normal', fontSize: 14}}>
                  No item
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  // const RenderSlider = ({item}) => {
  //   return (
  //     <TouchableOpacity
  //       style={{padding: 10}}
  //       onPress={() => navigation.navigate('SubCategory', {item: item})} >
  //       <Image
  //         source={{
  //           uri: `https://thecodeditors.com/test/marton/admin/third_cat_images/${item.cat_image}`,
  //         }}
  //         resizeMode="stretch"
  //         style={{width: 150, height: 120}}
  //       />
  //       <Text>{item.cat_name}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const renderFeaturedItems = ({item}) => {
    return (
      <View
        style={{
          width: '50%',
          height: 290,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '90%',
            width: '90%',
            borderRadius: 10,
            elevation: 5,
            backgroundColor: '#fff',
          }}>
          <View style={{width: '100%', height: '72%'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetails', {item})}>
              <Image
                source={{
                  uri: `https://thecodeditors.com/test/marton/admin/plugin/product_images/${item.image_name}`,
                }}
                resizeMode="stretch"
                style={{
                  width: '90%',
                  height: '90%',
                  marginLeft: '4%',
                  marginTop: 10,
                  borderRadius: 15,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-around',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#3d423e'}}>
              {item.pro_name}
            </Text>
            <Text
              style={{fontSize: 12, fontWeight: 'normal', color: 'darkgray'}}>
              PKR {item.pro_price}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '60%',
              alignItems: 'center',
              marginTop: '5%',
              alignSelf: 'center',
              borderRadius: 30,
              backgroundColor: colors.ORANGE.PRIMARY,
            }}
            onPress={() => {
              dispatch(
                addItemInCart(item, guestID, user ? user.Data[0].user_id : 0),
              );
              Toast.show({
                text: 'Item added into cart',
                buttonText: 'Okay',
                duration: 3000,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Ionicons name={'cart-outline'} color={'#fff'} />
              <Text style={{color: 'white', padding: 5}}>Add to Cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const _renderHeader = (item, expanded) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          elevation: 2,
          borderRadius: 25,
          marginHorizontal: 5,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Thumbnail
            source={{
              uri: `https://thecodeditors.com/test/marton/admin/main_category_images/${item.cate.cat_image}`,
            }}
            medium
            style={{margin: 5}}
          />
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#3d423e'}}>
              {item.cate.cat_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 4,
                flexWrap: 'wrap',
                width: '95%',
              }}>
              {item.sub_cate ? (
                item.sub_cate.map((item_sub, key2) => (
                  <Text
                    style={{fontWeight: '600', color: 'darkgray'}}
                    key={key2}>
                    {item_sub.sub_catname},{' '}
                  </Text>
                ))
              ) : (
                <Text style={{fontWeight: '600', color: 'darkgray'}}>
                  No item
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  const _renderContent = item => {
    return (
      <View style={{flexWrap: 'wrap', flexDirection: 'row', width}}>
        {item.sub_cate ? (
          item.sub_cate.map((item_sub, key2) => (
            <TouchableOpacity
              style={{
                width: width * 0.32,
                alignItems: 'center',
                height: 100,
                borderColor: '#fbfbfb',
                borderWidth: 1,
                justifyContent: 'center',
              }}
              onPress={() =>
                navigation.navigate('Products', {
                  item: item_sub,
                })
              }
              key={key2}>
              <Image
                source={{
                  uri: `https://thecodeditors.com/test/marton/admin/sub_category_images/${item_sub.sub_image}`,
                }}
                resizeMode="contain"
                style={{width: '100%', height: 50}}
              />
              <Text
                style={{
                  fontSize: 10,
                  textAlign: 'center',
                  marginTop: 10,
                  fontWeight: '700',
                }}>
                {item_sub.sub_catname}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <List.Item title="0 Item" />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.APPCOLOR.DEFAULT,
      }}>
      <SafeAreaView />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{width: '100%', height: 300}}>
          <HeaderComponent />
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '30%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setState({...state, selected: 'Best Value'})}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'sans-serif',
                    color: state.selected == 'Best Value' ? 'black' : 'grey',
                  }}>
                  Best Value
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{width: '30%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Recents');
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'sans-serif',
                    color: state.selected == 'Top Sellers' ? 'black' : 'grey',
                  }}>
                  Recents
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{width: '30%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AllProducts');
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily: 'sans-serif',
                    color: state.selected == 'all' ? 'black' : 'grey',
                  }}>
                  All ➔
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: '50%',
              marginTop: '3%',
            }}>
            {/* //jhgdjhdgjhfgdhgf */}

            <SliderBox
              images={images}
              sliderBoxHeight={200}
              dotColor="gold"
              inactiveDotColor="#fff"
              autoplay
              circleLoop
              resizeMode={'cover'}
              ImageComponentStyle={{
                borderRadius: 10,
                width: windowWidth * 0.9,
                marginTop: windowHeight * 0.03,
              }}
              imageLoadingColor="#2196F3"
            />
          </View>
        </View>
        <View style={{}}>
          <Tabs
            tabBarUnderlineStyle={{borderBottomWidth: 0}}
            tabContainerStyle={{elevation: 0, alignSelf: 'center'}}>
            <Tab
              heading="Categories"
              tabStyle={{backgroundColor: 'white', borderWidth: 0}}
              textStyle={{color: 'black', fontSize: 18, width: '90%'}}
              activeTabStyle={{backgroundColor: 'white'}}
              activeTextStyle={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                width: '90%',
              }}>
              <Accordion
                dataArray={arry}
                animation={true}
                expanded={true}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                style={{width: windowWidth * 0.9, alignSelf: 'center'}}
              />
            </Tab>
            <Tab
              heading="Recommended"
              tabStyle={{backgroundColor: 'white'}}
              textStyle={{color: 'black', fontSize: 18, width: '120%'}}
              activeTabStyle={{backgroundColor: 'white'}}
              activeTextStyle={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                width: '120%',
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={recommended}
                keyExtractor={({_, i}) => String(i)}
                renderItem={renderFeaturedItems}
                numColumns={2}
                refreshing={true}
              />
            </Tab>
            <Tab
              heading="Featured"
              tabStyle={{backgroundColor: 'white'}}
              textStyle={{color: 'black', fontSize: 18, width: '90%'}}
              activeTabStyle={{backgroundColor: 'white'}}
              activeTextStyle={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                width: '90%',
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={featured}
                keyExtractor={({_, i}) => String(i)}
                renderItem={renderFeaturedItems}
                numColumns={2}
                refreshing={true}
              />
            </Tab>
          </Tabs>
        </View>
      </ScrollView>
    </View>
  );
};

export default ListingHomeScreen;
