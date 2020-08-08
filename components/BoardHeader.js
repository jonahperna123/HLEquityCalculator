import React, { Component } from 'react';
import Card from '../components/Card';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
                    <Text>Flop</Text>
                    <View style={styles.flopView}>
                        <TouchableOpacity onPress={() => this.handleCardClick({number:0})}>
                            <Card style={styles.flopCardStyle}
                                card={cards[0]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleCardClick({number:1})}>
                            <Card style={styles.flopCardStyle}
                            card={cards[1]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleCardClick({number:2})}>
                            <Card style={styles.flopCardStyle}
                            card={cards[2]}/>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.turnView}>
                    <Text>Turn</Text>
                    <TouchableOpacity onPress={() => this.handleCardClick({number:3})}>
                            <Card style={styles.flopCardStyle}
                            card={cards[3]}/>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text>River</Text>
                    <TouchableOpacity onPress={() => this.handleCardClick({number:4})}>
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
    }
});

export default BoardHeader;