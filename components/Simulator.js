import React, { Component } from 'react';
import { StyleSheet, 
        Text, 
        View, 
        ScrollView, 
        Button, 
        TextInput, 
        FlatList, 
        TouchableOpacity, 
        Image } from 'react-native';

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
        this.resetAll.bind(this);
        this.handlePlayerDelete.bind(this);
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
            showKeyboard: false,
            equityArr: []
        });
    } else {
        cardArr[cardSelecting] = {
            rank: '',
            suit: ''
        }
        this.setState({
            playerCards: cardArr,
            showKeyboard: true,
            equityArr: []
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
            playerCards: neArr,
            equityArr: []
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


    handlePlayerDelete = (props) => {
        const playerIndex = props.playerN;
        let numPlayers = this.state.numPlayers;
        --numPlayers;
        let cardArr = this.state.playerCards;
        cardArr.splice(playerIndex*2, 2); //remove two cards starting at player index
        this.setState({
            numPlayers: numPlayers,
            playerCards: cardArr,
            equityArr: []
        });
        
    }


    resetAll = (props) => {
        const deck = Deck();
        let cards = [];
        for (let i = 0; i < 9; i++) {
            cards.push({
                rank: '',
                suit: ''
            });
        
        }
        
        this.setState({
                equityArr : [],
                numPlayers: 2,
                showKeyboard: false,
                playerCards: cards,
                cardSelecting: -1,
                runSim: false,
                deck: deck,
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
            cards={[cards[i*2], cards[i*2 + 1]]} handlePlayerDelete={this.handlePlayerDelete}
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
                <View style={styles.controlPlayers}>
                <View style={styles.resetButton}>
                    <TouchableOpacity onPressOut={this.resetAll} >
                        <Image style={{marginBottom: 5}}source={require('../assets/resetIcon.png')}></Image>
                        <Text style={styles.bottomNavText}>Reset</Text>
                    </TouchableOpacity>
                </View>
                    <TouchableOpacity onPressOut={this.handEquityPress} style={styles.playButton}>
                        <Image source={require('../assets/runSimulator.png')}></Image>
                    </TouchableOpacity>
                    <View style={styles.addPlayerButton}>
                        <TouchableOpacity onPressOut={this.addNewPlayer} >
                            <Image style={{marginLeft: 7}} source={require('../assets/addPlayerIcon.png')}></Image>
                            <Text style={styles.bottomNavText}>Add player</Text>
                        </TouchableOpacity >
                    </View>
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
      backgroundColor: COLORS.bottomNavColor,
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
        borderTopColor: 'white',
        borderTopWidth: 5,
        width: '115%',
        left: -25,
        overflow: 'visible',
        backgroundColor: COLORS.bottomNavColor,
        height: '15%',
        bottom: -10
    },
    controlPlayers: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        zIndex: 2
    },
    addPlayerButton: {
        marginHorizontal: '27%',
        paddingTop: 5,
        alignItems: 'center',
        left: 5,
    },
    resetButton: {
        marginHorizontal: '27%',
        paddingTop: 13,
        alignItems: 'center',
        left: 5,
        
    },
    playButton: {
        position: 'absolute',
        top: -18
    },
    bottomNavText: {
        color: 'white'
    }
  });

export default Simulator;