import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, FlatList } from 'react-native';

import Deck from '../equityCalcComponents/Deck';
import EquityCalc from '../equityCalcComponents/EquityCalculator';
import BoardHeader from './BoardHeader'
import Player from './Player'
import CardKeyboard from './CardKeyboard';


class Simulator extends Component {
    constructor(props) {
        super(props);

        let initialPlayerArr = []
        initialPlayerArr.push(<Player key={0} playerN={0} onPress={this.handleCardClick}/>);
        initialPlayerArr.push(<Player key={1} playerN={1} onPress={this.handleCardClick}/>);

        this.deck = Deck();
    

        this.state = {
                equityArr : [],
                defined: false,
                players: initialPlayerArr,
                numPlayers: 2,
                showKeyboard: false
            
        }

        this.handleCardClick.bind(this);
    }

    handEquityPress = (props) =>{
        let dead_cards = [];


        let equity = EquityCalc({deck: this.deck, dead_cards: dead_cards});
        this.setState({equityArr: equity})
        this.setState({
            defined: true
        });

    }
    handleCardClick = (props) => {
        console.log(props.number);
    }

    renderProbabilities() {
        const item = this.state.equityArr[0];
        const chop = this.state.equityArr[1];
        return (
        <View>
            <Text style={{fontWeight: 'bold'}}>Win Probability</Text>
            <Text key={0}>Hand {0} win: {item[0] * 100.00} %</Text>
            <Text key={1}>Hand {1} win: {item[1] * 100.00} %</Text>
            <Text style={{fontWeight: 'bold'}}>Chop Probability</Text>
            <Text key={2}>Hand {0} chop: {chop[0] * 100.00} %</Text>
            <Text key={3}>Hand {1} chop: {chop[1]* 100.00} %</Text>

        </View>
        )
        
    }

    addNewPlayer = (props) => {
        let arr = this.state.players;
        let numPlayers = this.state.numPlayers;
        arr.push(<Player key={numPlayers} playerN={numPlayers} onPress={this.handleCardClick}/>)
        ++numPlayers;
        this.setState({
            players: arr,
            numPlayers: numPlayers
        });
    }

    removePlayer = (props) => {
        let arr = this.state.players;
        let numPlayers = this.state.numPlayers;
        --numPlayers;
        arr.pop();
        this.setState({
            players: arr,
            numPlayers: numPlayers
        });
    }



    render () {
        let deck = Deck();
        let probabilities = null;
        if (this.state.defined) {
            probabilities = this.renderProbabilities();
        }
        let showModal = false;
        
        const playersOutput = this.state.players.map((player) => <View key={player.key}>{player}</View>)


        return  (
        <View style={styles.fullPage}>
            <View style={styles.header}>
            <BoardHeader/>
            </View>
            <View style={styles.playerContainer}>
            <ScrollView>
                {playersOutput}
            </ScrollView>
            {probabilities}
            <View style={styles.navigatorPanel}>
                <Button onPress={this.handEquityPress} title="Run Equity Simulator"/>
                <View style={styles.controlPlayers}>
                    <Button onPress={this.addNewPlayer} title="Add Player"/>
                    <Button onPress={this.removePlayer} title="Remove Player" />
                </View>
                <Button onPress={() => (this.setState({showKeyboard: true}))} title="Show Modal" />
                <CardKeyboard visible={this.state.showKeyboard} />
            </View>
        </View>
      </View>
        )
    }
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
      margin: 10
    },
    playerCardInput: {
        margin: 5,
        flexDirection: 'column'
    },
    cardInput: {
        flexDirection: 'row',
        margin: 5,
    },
    textInput: {
        paddingLeft: 7
    },
    rankSuitInput: {
        flexDirection: 'row',
        paddingLeft: 15
    },
    navigatorPanel: {
        borderTopColor: 'black',
        borderTopWidth: 1,
        bottom: 7,
        width: '115%',
        left: -25,
        overflow: 'visible'
    },
    controlPlayers: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    }
  });

export default Simulator;