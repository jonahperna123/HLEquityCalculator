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

import DiamondPaths from '../constants/diamondPaths';
import ClubPaths from '../constants/clubPaths';
import SpadePaths from '../constants/spadePaths';
import HeartPaths from '../constants/heartPaths';

const getRank = (props) => {
    let rank = props.rank;
    if (rank === 0) {
        return '2';
    } else if (rank === 1) {
        return '3';
    } else if (rank === 2) {
        return '4';
    }else if (rank === 3) {
        return '5';
    }else if (rank === 4) {
        return '6';
    }else if (rank === 5) {
        return '7';
    }else if (rank === 6) {
        return '8';
    }else if (rank === 7) {
        return '9';
    }else if (rank === 8) {
        return '10';
    }else if (rank === 9) {
        return 'J';
    }else if (rank === 10) {
        return 'Q';
    }else if (rank === 11) {
        return 'K';
    }else if (rank === 12) {
        return 'A';
    }
    return '';
}

class Card extends Component {
    constructor(props) {
        super(props);
    


        this.state = {
            showMenu: false
        };

    }

    cardImage() {
    
        if (this.props.card === undefined || this.props.card.rank === '') {
            return (
                <Image source={require('../assets/card_pictures/back_of_card.png')}
                        style={[styles.cardImage, this.props.style]}/>
            )
        } else {
            let rank = this.props.card.rank;
            let suit = this.props.card.suit;
            let imgStr;
            if (suit === 'Diamonds') {
                imgStr = DiamondPaths[rank];
            } else if (suit === 'Clubs'){
                imgStr = ClubPaths[rank];
            } else if (suit === 'Spades') {
                imgStr = SpadePaths[rank];
            } else if (suit === 'Hearts') {
                imgStr = HeartPaths[rank]
            } else {
                imgStr = require('../assets/card_pictures/back_of_card.png');
            }
            

            return (
                <Image source={imgStr}
                style={[styles.cardImage, this.props.style]} />
            )
        }
    }

    render(){
        let cardDisplay = this.cardImage();

        

        return (
        <View style={styles.cardView}>{cardDisplay}</View>
        
        )
    }
}

const styles = StyleSheet.create({
    cardImage: {
        height: 135,
        width: 90,
        margin: 5,
        borderRadius: 5,

    },
    cardView: {
        shadowOffset: {
	        width: 1,
	        height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10

    }
});

export default Card;