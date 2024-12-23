import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import {images, colors} from '../../../../constants';
import User from '../../../../asset/icons/user';
import Invisible from '../../../../asset/icons/invisible';
import Email from '../../../../asset/icons/email';
import Info from '../../../../asset/icons/info';

import {
  isValidEmail,
  isValidFirstName,
  isValidLastName,
  isValidPassword,
} from '../../../utilies/Validations';
import styles from './style';

import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';

const data = [
  {label: 'Student', value: 'student'},
  {label: 'Teacher', value: 'teacher'},
];

function Register2({route, navigation}) {
  const [KeyboardIsShow, setKeyboardIsShow] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShow(false);
    });
  });
  //states for validating
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorFirstname, setErrorFirstname] = useState('');
  const [errorLastname, setErrorLastname] = useState('');

  // state to store email, password
  const [value, setValue] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const isValidationOK = () =>
    email.length >= 0 &&
    password.length >= 0 &&
    firstname.length >= 0 &&
    lastname.length >= 0 &&
    value !== null &&
    isValidEmail(email) == true &&
    isValidPassword(password) == true;
  const [accountTypes, setAccountTypes] = useState([
    {
      name: 'Create Account ',
      isSelected: 'false',
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      {KeyboardIsShow == false && (
        <View style={styles.top}>
          <Image
            source={images.account}
            style={{
              width: 100,
              height: 100,
              margin: 16,
              alignSelf: 'center',
              marginTop: 50,
            }}
          />

          <Text style={styles.text1}> Create an Account</Text>

          <Text style={styles.text2}>
            A handful of model sentence structures
          </Text>
        </View>
      )}
      {KeyboardIsShow == true && <View style={{height: 40}}></View>}
      <View
        style={styles.mid}
        onAccessibilityTap={() => {
          Keyboard.dismiss;
        }}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select a role ..."
          value={value}
          onChange={item => {
            setValue(item.value);
            // console.log(value);
          }}
        />

        {/* <View style={{height: 4}} /> */}
        <View>
          <Info width="24" height="24" style={styles.icon} />
          <TextInput
            onChangeText={text => {
              setErrorFirstname(
                isValidFirstName(text) == true
                  ? ''
                  : 'Firstname must be at least 2 characters',
              );
              setFirstname(text);
            }}
            style={styles.inputText}
            placeholder="First Name"
            placeholderTextColor="black"></TextInput>
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              marginLeft: Platform.OS === 'ios' ? 32 : 56,
            }}>
            {errorFirstname}
          </Text>
        </View>
        <View>
          <Info width="24" height="24" style={styles.icon} />

          <TextInput
            onChangeText={text => {
              setErrorLastname(
                isValidLastName(text) == true
                  ? ''
                  : 'Lastname must be at least 2 characters',
              );
              setLastname(text);
            }}
            style={styles.inputText}
            placeholder="Last Name"
            placeholderTextColor="black"></TextInput>
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              marginLeft: Platform.OS === 'ios' ? 32 : 56,
            }}>
            {errorLastname}
          </Text>
        </View>

        <View>
          <Email width="24" height="24" style={styles.icon} />
          <TextInput
            onChangeText={text => {
              setErrorEmail(
                isValidEmail(text) == true ? '' : 'Please enter valid email',
              );
              setEmail(text);
            }}
            style={styles.inputText}
            placeholder="Email id"
            placeholderTextColor="black"
          />

          <Text
            style={{
              color: 'red',
              fontSize: 12,
              marginLeft: Platform.OS === 'ios' ? 32 : 56,
            }}>
            {errorEmail}
          </Text>
        </View>
        <View>
          <Invisible width="24" height="24" style={styles.icon} />

          <TextInput
            onChangeText={text => {
              setErrorPassword(
                isValidPassword(text) == true
                  ? ''
                  : 'Password must be at least 6 characters',
              );
              setPassword(text);
            }}
            style={styles.inputText}
            secureTextEntry={true} // tao dau **** trong password
            placeholder="Password"
            placeholderTextColor="black"
          />
        </View>
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            marginLeft: Platform.OS === 'ios' ? 32 : 56,
          }}>
          {errorPassword}
        </Text>
      </View>

      <View style={styles.below}>
        {accountTypes.map(accountType => (
          <TouchableOpacity
            disabled={isValidationOK() == false}
            onPress={async () => {
              const userdata = {
                title: value,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
              };
              try {
                const res = await axios.post(
                  `http://10.0.2.2:4848/${value}/storeInfor`,
                  userdata,
                );
                const data = res.data;
                // console.log(data, 123);
                console.log(JSON.stringify(data.message));
                if (data.message === '200') {
                  navigation.navigate('Register3', {
                    role: value,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                  });
                }
              } catch (error) {
                alert(error);
              }

              setAccountTypes(
                accountTypes.map(eachAccountType => {
                  return {
                    ...eachAccountType,
                    isSelected: eachAccountType.name == accountType.name,
                  };
                }),
              );
            }}
            isSelected={isValidationOK() == true ? true : false}
            style={styles.button}>
            <Text style={styles.textInnerBtn}>Create Account</Text>
          </TouchableOpacity>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#585859',
              textAlign: 'center',
            }}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={{
                color: '#5297fe',
                textDecorationLine: 'underline',
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Register2;
