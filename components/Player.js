import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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


    render() {
        const cards = this.props.cards;
        let cardOne;
        let cardTwo;
        const equity = this.props.equity;
        let winP;
        let chopP;
        let output = null;
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
        output = <View>
                <Text>Win: {Number.parseFloat(winP * 100).toFixed(2)} %</Text>
                <Text>Chop: {Number.parseFloat(chopP * 100).toFixed(2)} %</Text>
            </View>
        }
          
        
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity onPressOut={() => this.handlePress({n: 0})}>
                    <Card card={cardOne}/>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => this.handlePress({n: 1})}>
                    <Card card={cardTwo}/>     
                </TouchableOpacity >
                <View>
                    {output}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        height: 200,
        borderColor: 'black',
        borderBottomWidth: 1,
        paddingTop: 25,
        paddingLeft: 10,
        overflow: 'hidden',
    }
});




export default Player;