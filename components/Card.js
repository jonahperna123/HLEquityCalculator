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
                <Image source={require('../assets/card_pictures/2C.png')}
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
        let menu;
        

        return (


            <Menu>
                <MenuTrigger>
                    {cardDisplay}
                </MenuTrigger>
                <MenuOptions>
                    <View style={{flexDirection:"row"}}>
                        <ScrollView style={styles.menuOptions}>
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                        </ScrollView>
                        <ScrollView>
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                        </ScrollView>
                        <ScrollView>
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                            <MenuOption onSelect={this.handleMenuCardSelection} text="sneeze" />
                        </ScrollView>
                        <ScrollView>
                            <MenuOption onSelect={this.handleMenuCardSelection} Image="../assets/card_pictures/2C.png" />
                            <MenuOption onSelect={this.handleMenuCardSelection}  text="s"/>
                            <MenuOption onSelect={this.handleMenuCardSelection}  />
                        </ScrollView>
                   
                    </View>
                </MenuOptions>
                   
            </Menu>
        
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