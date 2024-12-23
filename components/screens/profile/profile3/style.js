import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f1f9',
  },
  context: {
    flex: 100,
    margin: 20,
  },
  top: {
    flex: 90,
    marginTop: 20,
  },

  below: {
    flex: 10,

    justifyContent: 'center',
  },

  image: {
    width: 150,
    height: 150,
    marginTop: 40,

    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#3787ff',
    height: 52,
    width: 352,
    borderRadius: 28,
    justifyContent: 'center',
    marginHorizontal: 20,

    alignSelf: 'center',
  },
});

export default styles;
