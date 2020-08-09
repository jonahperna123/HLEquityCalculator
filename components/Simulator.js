import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, FlatList } from 'react-native';

import Deck from '../equityCalcComponents/Deck';
import EquityCalc from '../equityCalcComponents/EquityCalculator';
import BoardHeader from './BoardHeader'
import Player from './Player'
import CardKeyboard from './CardKeyboard';
import COLORS from '../constants/Colors';


class Simulator extends Component {
    constructor(props) {
        super(props);

        let initialPlayerArr = [];


        let deck = Deck();
        let cards = [];
        for (let i = 0; i < 9; i++) {
            cards.push({
                rank: '',
                suit: ''
            });
        
        }
        

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
   
        const numPlayers = this.state.numPlayers;
       
        const equity = EquityCalc({deck: deck, dead_cards: dead_cards, num_players: numPlayers});
        this.setState({
            equityArr: equity
        });
    

    }
    handleCardClick = (props) => {
        let num = props.number;
        if (props.boardCard === true) {
            num = this.state.numPlayers * 2 + num;
        }
        
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
        let cardSelecting = this.state.cardSelecting;
        let cardArr = this.state.playerCards;

        if (this.props.backspace === undefined) {
            let rank = props.rank;
            let suit = props.suit;

        // check if the card already has been selected 
        // and remove if it has been
        for (let i = 0; i < cardArr.length; ++i) {
            let card = cardArr[i];
            if (card.suit === suit && card.rank === rank) {
                cardArr[i] = {
                    rank: '',
                    suit: ''
                }
                break;
            }
        }

        cardArr[cardSelecting] = {
            rank: rank,
            suit: suit
        }
       
        this.setState({
            playerCards: cardArr,
            showKeyboard: false
        });
    } else {
        cardArr[cardSelecting] = {
            rank: '',
            suit: ''
        }
        this.setState({
            playerCards: cardArr,
            showKeyboard: true
        });

    }



    }


    addNewPlayer = (props) => {
        let numPlayers = this.state.numPlayers;
        ++numPlayers;
        let cardArr = this.state.playerCards;

        let boardCards = cardArr.slice(cardArr.length - 5, cardArr.length);

        cardArr = cardArr.slice(0, cardArr.length - 5);
        cardArr.push({rank: '', suit: ''});
        cardArr.push({rank: '', suit: ''});
      
        const neArr = cardArr.concat(boardCards);
        this.setState({
            numPlayers: numPlayers,
            playerCards: neArr
        });
        
    }

    removePlayer = (props) => {
        let numPlayers = this.state.numPlayers;
        --numPlayers;
        let cardArr = this.state.playerCards;
        let boardCards = cardArr.slice(cardArr.length - 5, cardArr.length);
        cardArr = cardArr.slice(0, cardArr.length - 5);
        cardArr.pop();
        cardArr.pop();
        const finalArr = cardArr.concat(boardCards);
        this.setState({
            numPlayers: numPlayers,
            playerCards: finalArr
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
        const boardCards = cards.slice(cards.length-5, cards.length);
     

        return  (
        <View style={styles.fullPage}>
            <View>

            </View>
            <View style={styles.header}>
            <BoardHeader 
            boardCards={boardCards}
            onPress={this.handleCardClick}/>
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
      height: '100%',
      backgroundColor: COLORS.primary
    },
    header: {
      paddingTop: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.boardBackground,
      width: '100%',
      height: '20%',
      top: 0,
      borderBottomWidth: 4,
      borderColor: COLORS.secondary
      
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