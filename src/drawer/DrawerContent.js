import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  List,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import IconsF from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';

let arry = [];
export default function DrawerContent(props) {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.UserReducer.userDetails);

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
  const handleExpand = (key) => {
    setExpanded(!expanded[key]);
  };

  useEffect(() => {
    arry = [];
    Axios.get(
      'http://thecodeditors.com/test/carobar/api-get-categories.php',
    ).then((result1) => {
      setMainCate(result1.data.Data);
      result1.data.Data.forEach((item, key) => {
        Axios.get(
          `http://thecodeditors.com/test/carobar/api-get-subcategories.php?id=${item.cat_id}`,
        ).then((result2) => {
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

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>
                  {user ? user.Data[0].user_name : 'Guest'}
                </Title>
                <Caption style={styles.caption}>
                  {user ? user.Data[0].user_email : 'guest@carobar.com'}
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('HomeScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icons name="staro" color={color} size={size} />
              )}
              label="Featured"
              onPress={() => {
                props.navigation.navigate('Featured');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icons name="like2" color={color} size={size} />
              )}
              label="Recommended"
              onPress={() => {
                props.navigation.navigate('Recommended');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialIcon name="category" color={color} size={size} />
              )}
              label="Categories"
              onPress={() => {
                props.navigation.navigate('Categories');
              }}
            />
            {user ? (
              <DrawerItem
                icon={({color, size}) => (
                  <IconsF name="shipping-fast" color={color} size={size} />
                )}
                label="Orders"
                onPress={() => {
                  props.navigation.navigate('Orders');
                }}
              />
            ) : null}
            <List.Section title="Categories">
              {arry.length > 0 &&
                arry.map((item, key) => {
                  return (
                    <List.Accordion
                      key={key}
                      title={item.cate.cat_name}
                      left={(props) => (
                        <List.Icon {...props} icon="view-list" />
                      )}
                      expanded={expanded[key]}
                      onPress={() => {
                        handleExpand(key);
                      }}>
                      {item.sub_cate ? (
                        item.sub_cate.map((item_sub, key) => (
                          <List.Item
                            key={key}
                            title={item_sub.sub_catname}
                            onPress={() =>
                              props.navigation.navigate('Products', {
                                item: item_sub,
                              })
                            }
                          />
                        ))
                      ) : (
                        <List.Item title="0 Item" />
                      )}
                    </List.Accordion>
                  );
                })}
            </List.Section>
            {user ? (
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="exit-to-app" color={color} size={size} />
                )}
                label="Sign Out"
                onPress={() => {
                  dispatch({type: 'SIGN_OUT', payload: false});
                }}
              />
            ) : (
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="login" color={color} size={size} />
                )}
                label="Login"
                onPress={() => {
                  props.navigation.navigate('Login');
                }}
              />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
