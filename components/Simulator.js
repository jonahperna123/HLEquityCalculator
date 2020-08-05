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

        let initialPlayerArr = [];


        let deck = Deck();
        let cards = [];
        cards.push({
            rank: '',
            suit: ''
        });
    

        this.state = {
                equityArr : [],
                numPlayers: 2,
                showKeyboard: false,
                playerCards: cards,
                cardSelecting: -1,
                runSim: false,
                deck: deck,
            
        }

        this.handleCardClick.bind(this);
        this.handleKeyBoardCloseNoSel.bind(this);
        this.handleKeyboardCardSel.bind(this);
        this.handEquityPress.bind(this);
        this.addNewPlayer.bind(this);
        this.removePlayer.bind(this);
    }


    handEquityPress = (props) =>{
        const dead_cards = [...this.state.playerCards];
        const deck = [...this.state.deck];
        const equity = EquityCalc({deck: deck, dead_cards: dead_cards});
        this.setState({
            equityArr: equity
        });
    

    }
    handleCardClick = (props) => {
        let num = props.number;
        this.setState({
            cardSelecting: num,
            showKeyboard: true
        });
       
    }
    handleKeyBoardCloseNoSel = (props) => {
        this.setState({
            showKeyboard: false
        });
    }

    handleKeyboardCardSel = (props) => {
        let rank = props.rank;
        let suit = props.suit;
        let cardSelecting = this.state.cardSelecting;
        let cardArr = this.state.playerCards;

        cardArr[cardSelecting] = {
            rank: rank,
            suit: suit
        }
       
        this.setState({
            playerCards: cardArr
        });
        
        this.setState({
            showKeyboard: false
        }    
        );
       



    }


    addNewPlayer = (props) => {
        let numPlayers = this.state.numPlayers;
        ++numPlayers;
        let cardArr = this.state.playerCards;
        cardArr.push({rank: '', suit: ''});
        cardArr.push({rank: '', suit: ''});
        this.setState({
            numPlayers: numPlayers,
            playerCards: cardArr
        });
    }

    removePlayer = (props) => {
        let numPlayers = this.state.numPlayers;
        --numPlayers;
        let cardArr = this.state.playerCards;
        cardArr.pop();
        cardArr.pop();
        this.setState({
            numPlayers: numPlayers,
            playerCards: cardArr
        });
    }



    render () {
        let deck = Deck();
        let probabilities = null;
        const equityCopy = [...this.state.equityArr];
        

        let players = [];
        const cards = this.state.playerCards;
        const numPlayers = this.state.numPlayers;
        for (let i = 0; i < numPlayers; ++i) {
            let equity;
            if (equityCopy.length !== 0) {
                equity = equityCopy[i];
            }
            players.push(
                <Player
            key={i} playerN={i} equity={equity} onPress={this.handleCardClick}
            cards={[cards[i*2], cards[i*2 + 1]]
            }
            />
            );
            
        }
        
        const playersOutput = players.map((player) => <View key={player.key}>{player}</View>)

     

        return  (
        <View style={styles.fullPage}>
            <View style={styles.header}>
            <BoardHeader/>
            </View>
            <View style={styles.playerContainer}>
            <ScrollView>
                {playersOutput}
            </ScrollView>
            
            <View style={styles.navigatorPanel}>
                <Button onPress={this.handEquityPress} title="Run Equity Simulator"/>
                <View style={styles.controlPlayers}>
                    <Button onPress={this.addNewPlayer} title="Add Player"/>
                    <Button onPress={this.removePlayer} title="Remove Player" />
                </View>
            </View>
        </View>
        <CardKeyboard 
        handleKeyBoardCloseNoSel={this.handleKeyBoardCloseNoSel}
        handleKeyboardCardSel={this.handleKeyboardCardSel}
        visible={this.state.showKeyboard}/>
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