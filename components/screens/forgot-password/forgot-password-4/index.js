import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {images} from '../../../../constants';
import styles from './style';

function Forgot4({route, navigation}) {
  const [accountTypes, setAccountTypes] = useState([
    {
      name: 'Sign in',
      isSelected: 'false',
    },
  ]);
  const {email} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={images.forgotPassword}
          style={{
            width: 110,
            height: 110,
            marginTop: '25%',
            alignSelf: 'center',
          }}></Image>
      </View>

      <View style={styles.mid}>
        <Text style={styles.text1}>Password Changed Successfully!</Text>
        <Text style={styles.text2}>
          If you are going to use a passage of Lorem ipsum you need to be sure
          there isn't anything embarrassing
        </Text>
        {accountTypes.map(accountType => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
              setAccountTypes(
                accountTypes.map(eachAccountType => {
                  return {
                    ...eachAccountType,
                    isSelected: eachAccountType.name == accountType.name,
                  };
                }),
              );
            }}
            style={styles.button}
            isSelected={accountType.isSelected}>
            <Text style={styles.textInnerBtn}>Sign in</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default Forgot4;
