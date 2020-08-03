import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
//import { MenuProvider } from 'react-native-popup-menu';
import Simulator from './components/Simulator';


export default function App() {
  return (
  <View>
      <Simulator />
   </View>
  );
}

