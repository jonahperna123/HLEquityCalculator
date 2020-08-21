import React from 'react';
import {
    View, 
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'

const InfoModal = (props) => {

    return (
        <View>
            <Modal visible={props.visible}
                    animationType="fade"
                    transparent="false">
                    <TouchableOpacity activeOpacity={1} onPressOut={() => props.onClose()}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.textHeader}>Texas Hold 'Em Equity Caclulator</Text>
                            <View style={{marginHorizontal: 7, }}>
                                <Text style={styles.textColor}>Hello! This calculator runs thousands of simulations to determine precise probabilities of any two given cards winning a poker hand.</Text>
                                <Text></Text>
                                <Text style={styles.textColor}>To select a card, simply click the face of any of the cards on the screen, and select your card from the pop-up keyboard.</Text>
                                <Text></Text>
                                <Text style={styles.textColor}>If you choose to leave a card blank, the simulation will select a new, random, card every iteration. For example if you wanted to see the probabibility a pair of Aces will win vs a flush draw, select an Ace on the board, an Ace in one hand, then the other suited cards. The simulation will do the rest!</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeader: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    textColor: {
        color: 'white',
        fontSize: 18
    }
})

export default InfoModal;


