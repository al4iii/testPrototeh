import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const Main = ({navigation}) => {
  function button(title, onPress) {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      {button('Task 1', () => navigation.navigate('Task1'))}
      {button('Task 2', () => navigation.navigate('Task2'))}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  button: {
    width: '50%',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#5EB5CB',
    marginVertical: 25,
  },
});
