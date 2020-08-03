import React from 'react';
import { Component } from 'react';
import { 
        View, 
        Text,
        Image, 
        StyleSheet, 
        TouchableOpacity, 
        ScrollView
    } from 'react-native'

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

class Card extends Component {
    constructor(props) {
        super(props);
        
        let cardRank = props.rank;
        let cardSuit = props.suit;


        this.state = {
            rank: cardRank,
            suit: cardSuit,
            showMenu: false
        };

    }

    cardImage() {
        if (this.state.rank == undefined || this.state.suit == undefined) {
            return (
                <Image source={require('../assets/card_pictures/back_of_card.png')}
                        style={styles.cardImage}/>
            )
        } else {
            return (
                <Text>{this.state.rank} of {this.state.suit}</Text>
            )
        }
    }

    handleMenuCardSelection() {
        alert('achoo!');
    }

    render(){
        let cardDisplay = this.cardImage();

        

        return (
        <View>{cardDisplay}</View>
        
        )
    }
}

const styles = StyleSheet.create({
    cardImage: {
        height: 125,
        width: 90,
        margin: 5
    },
    menuOptions: {
        height: 400,
        alignSelf: 'stretch',
        
    }
})

export default Card;