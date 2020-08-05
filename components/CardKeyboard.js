import React, {Component} from 'react'
import { View, SectionList, Image, TouchableOpacity, Text, StyleSheet, Modal, ImageBackground, Button } from 'react-native';
import clubs from '../constants/clubPaths';
import diamonds from '../constants/diamondPaths'
import hearts from '../constants/heartPaths'
import spades from '../constants/spadePaths'

const BUTTONCOLOR='white';

class CardKeyboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.clubPaths = [];
        this.clubPathsTwo = [];
        let spadePaths = [];
        let diamondPaths = [];
        let heartPaths = [];

        this.state = {
            suit: 'Clubs'
        }

    }
    handleButtonPress = (props) => {
        let suit = props.suit;
        this.setState({
            suit: suit
        });
    }

    handleModalCloseWithoutSelection = () => {
        this.props.handleKeyBoardCloseNoSel();
    }
    handleCardClick = (props) => {
        let rank = props.rank;
        let suit = props.suit;
        this.props.handleKeyboardCardSel({rank: rank, suit: suit});
    }
    

    render () {
        let arrOne = [];
        let arrTwo = [];

        if (this.state.suit === 'Clubs') {
            arrOne = getClubOne();
            arrTwo = getClubTwo();
        } else if (this.state.suit === 'Spades') {
            arrOne = getSpadeOne();
            arrTwo = getSpadeTwo();
        }
        else if (this.state.suit === 'Hearts') {
            arrOne = getHeartOne();
            arrTwo = getHeartTwo();
        } else if (this.state.suit === 'Diamonds') {
            arrOne = getDiamondOne();
            arrTwo = getDiamondTwo();
        }



        let rank = 12;
        const rowOne = arrOne.map(img => {
            let idx = rank;
            --rank;
            return (
            <TouchableOpacity 
            onPressOut={() => this.handleCardClick({rank: idx, suit: this.state.suit})} key={rank+1} >{img}</TouchableOpacity>
            )
        }
       
            
        );

        const rowTwo = arrTwo.map(img => {
            let idx = rank;
            --rank;
            return (<TouchableOpacity 
                onPressOut={() => this.handleCardClick({rank: idx, suit: this.state.suit})}
            key={rank+1}>{img}</TouchableOpacity>)
        }
            
        )
      
        return (
            <View style={styles.keyboard}>
                <Modal
                visible={this.props.visible}
                transparent= 'true'
                animationType='slide'
                
                >
                <TouchableOpacity activeOpacity={0} style={styles.modalCloseArea} onPress={this.handleModalCloseWithoutSelection}>

                </TouchableOpacity >
                <View style={styles.inputSelectionContainer}>
                 <View style={styles.suitRow}>
                    {rowOne}
                </View>
                <View style={styles.suitRow}>
                    {rowTwo}
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Clubs" color={BUTTONCOLOR} 
                        onPress={() => this.handleButtonPress({suit: 'Clubs'})}/>
                    <Button title="Spades" color={BUTTONCOLOR}
                        onPress={() => this.handleButtonPress({suit: 'Spades'})}/>
                    <Button title="Hearts" color={BUTTONCOLOR}
                        onPress={() => this.handleButtonPress({suit: 'Hearts'})}/>
                    <Button title="Diamonds" color={BUTTONCOLOR}
                        onPress={() => this.handleButtonPress({suit: 'Diamonds'})}/>
                </View>
                </View>
            </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    modalCloseArea: {
        height: '65%'
    },

    suitRow: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 5
    
    },
    cardSize: {
        height: 80,
        width: 50,
        margin: 2,
        borderRadius: 5
    },
    keyboard: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSelectionContainer: {
        backgroundColor: 'grey',
        paddingBottom: '35%'

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonStyle: {
        color: 'white'
    }
});

const getDiamondOne = () => {
    let diamondArr = []
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/AD.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/KD.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/QD.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/JD.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/10D.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/9D.png')} />
    );
    return diamondArr;
}

const getDiamondTwo = () => {
    let diamondArr = []
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/8D.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/7D.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/6D.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/5D.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/4D.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/3D.png')} />
    );
    diamondArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/2D.png')} />
    );
    return diamondArr;
}

const getSpadeOne = () => {
    let spadeArr = [];
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/AS.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/KS.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/QS.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/JS.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/10S.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/9S.png')} />
    );
    return spadeArr;
}

const getSpadeTwo = () => {
    let spadeArr = [];
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/8S.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/7S.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/6S.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/5S.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/4S.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/3S.png')} />
    );
    spadeArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/2S.png')} />
    );
    return spadeArr;
}

const getHeartOne = () => {
    let heartArr = []
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/AH.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/KH.png')} />
    )
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/QH.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/JH.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/10H.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/9H.png')} />
    );
    return heartArr;
}

const getHeartTwo = () => {
    let heartArr = []
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/8H.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/7H.png')} />
    )
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/6H.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/5H.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/4H.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/3H.png')} />
    );
    heartArr.push(
        <Image style={styles.cardSize} source={require('../assets/card_pictures/2H.png')} />
    );
    return heartArr;
}

const getClubOne = () => {
    let clubArr = []
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/AC.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/KC.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/QC.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/JC.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/10C.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/9C.png')} />
    );

    return clubArr;
}

const getClubTwo = () => {
    let clubArr = []
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/8C.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/7C.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/6C.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/5C.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/4C.png')} />
    );
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/3C.png')} />
    );
    
    clubArr.push(
        <Image style={styles.cardSize}source={require('../assets/card_pictures/2C.png')} />
    );
        return clubArr;
}


export default CardKeyboard;