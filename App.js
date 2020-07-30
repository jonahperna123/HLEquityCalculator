import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import Deck from './equityCalcComponents/Deck';
import EquityCalc from './equityCalcComponents/EquityCalculator';

import BoardHeader from './components/BoardHeader.js';
import Player from './components/Player.js'

export default function App() {
  let deck = Deck();

  let shuffled_deck = EquityCalc({deck: deck});




  return (
    <MenuProvider>
      <View style={styles.fullPage}>
        <View style={styles.header}>
          <BoardHeader/>
        </View>

        <View style={styles.playerContainer}>
          <ScrollView>
            <Player />
            <Text>{JSON.stringify(shuffled_deck, 0, 4)}</Text>
          </ScrollView>
        </View>

      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  fullPage: {
    flexDirection: 'column',
    height: '100%'
  },
  header: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    alignContent: "center",
    justifyContent: 'center',
    width: '100%',
    height: '25%',
    top: 0,
    
  },
  playerContainer: {
    flex: 3,
    height: '100%',
  }
});
