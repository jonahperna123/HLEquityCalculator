import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card.js';

class Player extends Component {
    constructor(props) {
        super(props);
        this.playerNumber = this.props.playerN;
        
        this.state = {
            cardOne: "",
            cardTwo: "",
        }
    }
    handlePress = () => {
        this.props.onPress({number: this.playerNumber});
    }


    render() {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={this.handlePress}>
                    <Card />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handlePress}>
                    <Card />     
                </TouchableOpacity >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        height: 200,
        borderColor: 'black',
        borderTopWidth: 1,
        paddingTop: 25,
        paddingLeft: 10,
        overflow: 'hidden'
    }
});




export default Player;