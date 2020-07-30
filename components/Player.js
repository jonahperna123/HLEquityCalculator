import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card.js';

class Player extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cardOne: "",
            cardTwo: "",
        }
    }


    render() {
        return (
            <View style={styles.cardContainer}>
                <Card />
                <Card />     
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        height: 250,
        borderColor: 'black',
        borderTopWidth: 1,
        paddingTop: 25,
        paddingLeft: 10,
    }
});

export default Player;