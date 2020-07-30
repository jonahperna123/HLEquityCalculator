import React from 'react';
import cardRankings from '../constants/cardRankings';
import suitRankings from '../constants/suitRankings';

const DeckConstructor = () => {
    let deck = [];
    for (let i = 0; i < 13; ++i) {
        for (let k = 0; k < 4; ++k) {
            let card = {
                suit: k,
                rank: i
            }
            deck.push(card);
        }
    }
    return deck;
}

export default DeckConstructor;