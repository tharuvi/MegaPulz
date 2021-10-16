/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import RNBootSplash from "react-native-bootsplash";
import LoginPage from '../../components/organisms/LoginPage';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  React.useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, [])
  const [text, onChangeText] = React.useState("");
  const [ptext, onChangePText] = React.useState("");

  return (
    <NavigationContainer>
      <View style={styles.root}>
        <LoginPage userName={text} passWord={ptext} />
      </View>
    </NavigationContainer>


  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#e6f2f2'
  },
});

export default App;
