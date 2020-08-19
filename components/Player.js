import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Card from './Card.js';

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
                            <Text>High Card: </Text>
                            <Text>One Pair: </Text>
                            <Text>Two Pair: </Text>
                            <Text>3 of a Kind: </Text>
                            <Text>Straight: </Text>
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
                            <Text>Flush: </Text>
                            <Text>Full House: </Text>
                            <Text>Quads: </Text>
                            <Text>Str Flush: </Text>
                            <Text>Royal Flu$h: </Text>
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
                        <Text>High Card: </Text>
                        <Text>One Pair: </Text>
                        <Text>Two Pair: </Text>
                        <Text>3 of a Kind: </Text>     
                        <Text>Straight: </Text>
                </View>
                <View style={{position: 'absolute', left: '50%'}}>  
                        <Text>Flush: </Text>
                        <Text>Full House: </Text>
                        <Text>Quads: </Text>
                        <Text>Str Flush: </Text>
                        <Text>Royal Flu$h: </Text>
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
        marginBottom: 5
    },
    tiePercentage: {
        fontSize: 18
    },
    deleteButton: {
      right: 0,
    },
    percentageBig: {
        color: '#FFFF00',
        fontSize: 18
    },
    percentageText: {
        color: '#E2DCCD',
    },
});




export default Player;