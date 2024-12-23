import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, Keyboard, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../home';
import {Search1, Search2} from '../search';
import Course from '../course';
import {Profile1, Profile2, Profile3} from '../profile';

const Tab = createBottomTabNavigator();

const Navbar = ({route, navigation}) => {
  let userData = route.params.data.user;
  let courseArray = route.params.data.course;
  // let userData = {
  //   //fake data for testing, please comment this before push to github
  //   email: 'ttt2003@gmail.com',
  //   fisrtname: 'Truong Tan',
  //   lastname: 'Thanh',
  //   password: '123456',
  //   title: 'student', //teacher || student
  // };

  const [bottomMarginStatus, setbottomMarginStatus] = useState(20);
  useEffect(() => {
    const showNavBar = Keyboard.addListener('keyboardDidShow', () => {
      setbottomMarginStatus(0);
    });
    const hideNavBar = Keyboard.addListener('keyboardDidHide', () => {
      setbottomMarginStatus(20);
    });

    return () => {
      showNavBar.remove();
      hideNavBar.remove();
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: bottomMarginStatus,
          backgroundColor: '#fff',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          minHeight: Platform.OS === 'ios' ? 68 : 76,

          elevation: 2,
          shadowColor: '#171717',
          shadowOpacity: 0.5,
          shadowRadius: 8,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Course') {
            iconName = focused ? 'terminal' : 'terminal-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return (
            <View
              style={{
                alignItems: 'center',
                paddingTop: 12,
              }}>
              <Ionicons
                name={iconName}
                size={28}
                color={color}
                style={{
                  paddingBottom: 4,
                  marginTop: 12,
                }}
              />
              <Text
                disabled={focused ? false : true}
                style={{
                  color: focused ? '#3788ff' : '#777',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                {route.name}
              </Text>
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{
          lastname: userData.lastname,
        }}
      />
      <Tab.Screen name="Search" component={Search1} />
      <Tab.Screen
        name="Course"
        component={Course}
        initialParams={{
          role: userData.title,
          email: userData.email,
          fisrtname: userData.fisrtname,
          lastname: userData.lastname,
          courseArray: courseArray,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile1}
        initialParams={{
          role: userData.title,
          email: userData.email,
          password: userData.password,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
