import React, { Component } from 'react';
import Card from '../components/Card';


import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

class BoardHeader extends Component {
    handleCardClick = (props) => {
        const boardCard = true;
        const number = props.number;
        this.props.onPress({boardCard: boardCard, number: number});
    }

    render() {
        const cards = this.props.boardCards;
        return (
            <View style={styles.boardView}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.cardLabels}>Flop</Text>
                    <View style={styles.flopView}>
                        <TouchableOpacity onPressOut={() => this.handleCardClick({number:0})}>
                            <Card style={styles.flopCardStyle}
                                card={cards[0]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => this.handleCardClick({number:1})}>
                            <Card style={styles.flopCardStyle}
                            card={cards[1]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => this.handleCardClick({number:2})}>
                            <Card style={styles.flopCardStyle}
                            card={cards[2]}/>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.turnView}>
                    <Text style={styles.cardLabels}>Turn</Text>
                    <TouchableOpacity onPressOut={() => this.handleCardClick({number:3})}>
                            <Card style={styles.flopCardStyle}
                            card={cards[3]}/>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.cardLabels}>River</Text>
                    <TouchableOpacity onPressOut={() => this.handleCardClick({number:4})}>
                            <Card style={styles.flopCardStyle}
                            card={cards[4]}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }



}

const styles = StyleSheet.create({
    flopView: {
        flexDirection: 'row',
        marginRight: 6,

    }, boardView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flopCardStyle: {
        height: 94,
        width: 66,
        margin: 2
    },
    turnView: {
        marginRight: 6,
        alignItems: 'center'
    },
    cardLabels: {
        color: 'white',
        fontSize: 16,
        top: -7.5
    }
});

export default BoardHeader;