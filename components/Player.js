import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Card from './Card.js';
import Colors from '../constants/Colors'

class Player extends Component {
    constructor(props) {
        super(props);
        
        let playerN = this.props.playerN;
        this.state = {
           playerN : playerN
        }
        this.handlePress.bind(this);
    }
    handlePress = (props) => {
        let n = props.n;

        let number = parseInt(this.state.playerN * 2) + n;
        this.props.onPress({number: number});
        
    }
    handleDeletePress = (props) => {
        const playerN = this.state.playerN;
        this.props.handlePlayerDelete({playerN: playerN});
    }


    render() {
        const cards = this.props.cards;
        let cardOne;
        let cardTwo;
        const equity = this.props.equity;
        let winP;
        let chopP;
        let output = null;
        let individHandP = null;
        let distArr;
        if (cards !== undefined) {
            if (cards[0] !== undefined && cards[0].rank !== '') {
                cardOne = cards[0];
            } if (cards[1] !== undefined && cards[1].rank !== '') {
                cardTwo = cards[1];
            }
        }
        
        if (equity !== undefined) {
            winP = equity[0];
            chopP = equity[1];
            distArr = equity[2];
        output = 
        <View style={{flexDirection: "row"}}>
            <View style={styles.totalPercetage}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.winPercentage}>Win: </Text>
                    <Text style={styles.percentageBig}>{Number.parseFloat(winP * 100).toFixed(2)} %</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.tiePercentage}>Tie: </Text>
                    <Text style={styles.percentageBig}>{Number.parseFloat(chopP * 100).toFixed(2)} %</Text>
                </View>
            </View>
            <TouchableOpacity style={{}} onPressOut={this.handleDeletePress}>
                        <Image source={require('../assets/deletePlayer.png')}></Image>
            </TouchableOpacity>
           
        </View>

            individHandP = 
                <View style={styles.distributionContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: "column"}}>
                            <Text style={styles.rankingText}>High Card: </Text>
                            <Text style={styles.rankingText}>One Pair: </Text>
                            <Text style={styles.rankingText}>Two Pair: </Text>
                            <Text style={styles.rankingText}>3 of a Kind: </Text>
                            <Text style={styles.rankingText}>Straight: </Text>
                        </View>
                        <View style={styles.rankPercentage}>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[0] * 100).toFixed(2)} %</Text>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[1] * 100).toFixed(2)} %</Text> 
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[2] * 100).toFixed(2)} %</Text>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[3] * 100).toFixed(2)} %</Text>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[4] * 100).toFixed(2)} %</Text>
                        </View>
                        </View>
               
                    <View style={styles.rightContainer}>
                        <View>
                            <Text style={styles.rankingText}>Flush: </Text>
                            <Text style={styles.rankingText}>Full House: </Text>
                            <Text style={styles.rankingText}>Quads: </Text>
                            <Text style={styles.rankingText}>Str Flush: </Text>
                            <Text style={styles.rankingText}>Royal Flu$h: </Text>
                        </View>
                        <View style={styles.rankPercentage}>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[5] * 100).toFixed(2)} %</Text>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[6] * 100).toFixed(2)} %</Text>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[7] * 100).toFixed(2)} %</Text>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[8] * 100).toFixed(2)} %</Text>
                            <Text style={styles.percentageText}>{Number.parseFloat(distArr[9] * 100).toFixed(2)} %</Text>
                       </View>
                    </View>
                </View>
                


            
        } else {
            output = 
            <View style={{flexDirection: 'row'}}>
                <View style={styles.totalPercetage}>
                    <Text style={styles.winPercentage}>Win: </Text> 
                    <Text style={styles.tiePercentage}>Tie: </Text>
                </View>
                <TouchableOpacity style={{left: '46%'}} onPressOut={this.handleDeletePress}>
                            <Image source={require('../assets/deletePlayer.png')}></Image>
                </TouchableOpacity>
            </View>
            individHandP = 
            <View style={styles.distributionContainer}>
                <View>
                        <Text style={styles.rankingText}>High Card: </Text>
                        <Text style={styles.rankingText}>One Pair: </Text>
                        <Text style={styles.rankingText}>Two Pair: </Text>
                        <Text style={styles.rankingText}>3 of a Kind: </Text>     
                        <Text style={styles.rankingText}>Straight: </Text>
                </View>
                <View style={{position: 'absolute', left: '50%'}}>  
                        <Text style={styles.rankingText}>Flush: </Text>
                        <Text style={styles.rankingText}>Full House: </Text>
                        <Text style={styles.rankingText}>Quads: </Text>
                        <Text style={styles.rankingText}>Str Flush: </Text>
                        <Text style={styles.rankingText}>Royal Flu$h: </Text>
                </View>
            </View>
        }
          
        
        return (
            <View style={styles.cardContainer}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPressOut={() => this.handlePress({n: 0})}>
                        <Card card={cardOne}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPressOut={() => this.handlePress({n: 1})}>
                        <Card card={cardTwo}/>     
                    </TouchableOpacity >
                    <View style={{flexDirection: "row"}}>
                        {output}
                    </View>
               
                </View>
                <View>
                   {individHandP}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        borderColor: 'black',
        borderBottomWidth: 1,
        paddingLeft: 10,
        overflow: 'hidden',
        width: '100%'
    },
    rankPercentage: {
        marginLeft: 20
    },
    rightContainer: {
        flexDirection: "row",
        position: 'absolute',
        left: '50%'
    },
    distributionContainer: {
        flexDirection: 'row',
        
    },
    totalPercetage: {
        top: 40,
        marginLeft: 7
    },
    winPercentage: {
        fontSize: 18,
        marginBottom: 5,
        color: Colors.percentageLabel,
    },
    tiePercentage: {
        fontSize: 18,
        color: Colors.percentageLabel
    },
    deleteButton: {
      right: 0,
    },
    percentageBig: {
        color: Colors.bigWinPercentageText,
        fontSize: 18,
        fontWeight: 'bold',
        // textShadowColor: 'rgba(0, 0, 0, 0.75)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 10
    },
    percentageText: {
        color: Colors.percentageTextSmall,
    },
    rankingText: {
        color: Colors.percentageLabel
    }
});




export default Player;