import React from 'react';
import handRankings from '../constants/handRankings';
import suitRankings from '../constants/suitRankings';
import cardRankings from '../constants/cardRankings';
import calculate_hand_ranks from './CalculateHandRanks';
import rank_tie_breaker from './RankTieBreaker';

// sim p1: As4c
// sim p2: 2h2d


const EquityCalculator = (props) =>  {
        let deck = props.deck;
        let dead_cards = props.dead_cards;

        let num_players = 2;

        for (let i = 0; i < dead_cards.length; ++i) {  
            dead_cards[i] = extractNumberRanks({card: dead_cards[i]});
        }
        

        let hole_cards = [];
        for (let i = 0; i < num_players*2; ++i){
            hole_cards.push(dead_cards[i]);
        }

        let players_win_equity = Array(num_players).fill(0);
        let players_chop_equity = Array(num_players).fill(0);
        const SIMULATED_HANDS = 750;

        for (let hand = 0; hand < SIMULATED_HANDS; ++hand) {
            let shuffled_deck = removeHoleCardsAndShuffle({deck: deck, dead_cards: dead_cards});

            
            
            let current_board = get_current_board({shuffled_deck: shuffled_deck, num_players: num_players, 
                                                    num_dead_cards: dead_cards.length});
                
            
            
        
            let completed_board = get_completed_board({current_board: current_board, num_dead_cards: dead_cards.length, deck: shuffled_deck});
           
            let players_hand_ranks = calculate_hand_ranks({hole_cards:hole_cards, 
                completed_board: completed_board});
           
            let winner = calculate_hand_winner({hand_ranks: players_hand_ranks});

            if (winner.length === 1) {
                ++players_win_equity[winner[0]];
            } else {
                for (let i = 0; i < winner.length; ++i) {
                    ++players_chop_equity[winner[i]];
                }
            }
        }
        for (let i = 0; i < num_players; ++i) {
            players_win_equity[i] = (players_win_equity[i] / parseFloat(SIMULATED_HANDS)).toFixed(4);
            players_chop_equity[i] = (players_chop_equity[i] / parseFloat(SIMULATED_HANDS)).toFixed(4);
        }
       
        
        return [players_win_equity, players_chop_equity];

    }


    // Takes in the users Hole Cards and any cards that have already appeared on the flop
    // Returns an array of shuffled cards with the cards that have been removed in the first n places
    // ex: [used1, used2, random1, random2, ....]
    const removeHoleCardsAndShuffle = (props) => {
        let deck = props.deck;
        let dead_cards = props.dead_cards;
        let usedCards = [];

        
        for (let j = 0; j < dead_cards.length; ++j) {
            for (let i = 0; i < 52; ++i){            
                if (dead_cards[j].rank === deck[i].rank && 
                    dead_cards[j].suit === deck[i].suit) {
                        usedCards.push(i);
                    }
            } 
        } //get the indices of cards already used;

        let k = 0;
        let shuffledDeck = [];
        let postCardSwapUsed = [];
        for (let i = 0; i < usedCards.length; ++i) {
            let tempCard = {
                rank: deck[usedCards[i]].rank,
                suit: deck[usedCards[i]].suit
            }
            shuffledDeck.push(tempCard);
            postCardSwapUsed.push(usedCards[i]);

        }


        //     Shuffle Alogorithm
        //  
       
        //copy the first elements that have already been used over
        //ex: [usedCard1, usedCard2, ......]

        //    Fisher Yates Shuffling algorithm

        let insertIndex = postCardSwapUsed.length;
        while (postCardSwapUsed.length !== 52) {
            let randomNumb = Math.floor(Math.random() * 52);
            
            // if the card hasn't been picked yet
            if (!postCardSwapUsed.includes(randomNumb)) {
                let insertCard = {
                    rank: deck[randomNumb].rank,
                    suit: deck[randomNumb].suit
                }
                shuffledDeck.push(insertCard);
                postCardSwapUsed.push(randomNumb);
                ++insertIndex;
            }
        }

        return shuffledDeck;
    }

    // separates the hole cards from the cards on the board
    // RETURNS: an array of the cards that the user declared to
    //          be already shown
    const get_current_board = (props) => {
        let num_players = props.num_players;
        let deck = props.shuffled_deck;
        let num_dead_cards = props.num_dead_cards;

        let hole_cards = num_players * 2;
        let board = [];
        for (let i = hole_cards; i < num_dead_cards; ++i) {
            let card = {
                rank: deck[i].rank,
                suit: deck[i].suit
            }
            board.push(card);
           
        }

        return board;
    }


    // takes in an array consisting of the board declared
    // fills the array to get completed board;
    const get_completed_board = (props) => {
        let deck_index = props.num_dead_cards;
        let current_board = props.current_board;
        let deck = props.deck;

        // get the flop
        if (current_board.length === 0) {
            ++deck_index; // burn a card
            for (let i = 0; i < 3; ++i) {
                current_board.push(deck[deck_index]);
                ++deck_index;
            }
        }

        //get the turn card
        if (current_board.length === 3) {
            ++deck_index; // burn a card
            current_board.push(deck[deck_index]);
            ++deck_index;
        }

        // get the river
        if (current_board.length === 4) {
            ++deck_index; // burn a card
            current_board.push(deck[deck_index]);
            ++deck_index;
        }

        return current_board;
    }


    // RETURNS: the index of player who wins the hand or indexes of equivalent hands if chop
    // ex: player 2 wins hand: [2]
    //         player 1 and 3 chop: [1, 3]
    //      FIX: Implement chop scenario and if one same rank hand beats the other
    const calculate_hand_winner = (props) => {
        let hand_ranks = props.hand_ranks;
        let max_rank = -1;
        let winner = [];
        for (let i = 0; i < hand_ranks.length; ++i) {
            if (hand_ranks[i].rank > max_rank){
                max_rank = hand_ranks[i].rank;
                winner.splice(0, winner.length);
                winner.push(i);
            } else if (hand_ranks[i].rank === max_rank) {
                let hand_num = rank_tie_breaker({handOne: hand_ranks[winner[0]], handTwo: hand_ranks[i]});
                
                // if the hand currently in the winner arr beats the other hand of same rank
                // dont push new value on
                if (hand_num === 2) {
                    // if the hand beats the current hand that was ranked winner
                    // clear anything that might be on the array
                    // push the new winning hand index on the arr
                    winner.splice(0, winner.length);
                    winner.push(i);
                } else if (hand_num === -1) {
                    // the hands are chopping
                    // push the index on the arr
                    winner.push(i);
                }

            }
        }
        return winner;
    }

    // RETURNS: the hand rank number value of each player in an array
    //          the index of the rank correspond to the player
    //      ex: [0, 1, 2]
    //          player 1: high card
    //          player 2: pair
    //          player 3: two pair
    
    const extractNumberRanks = (props) => {
        let strRank = props.card.rank;
        let strSuit = props.card.suit;
        let numRank;
        let numSuit;
       
        for (let i = 0; i < cardRankings.length; ++i) {
            if (strRank === cardRankings[i]) {
                numRank = i;
            } 
        } for (let i = 0; i < suitRankings.length; ++i) {
           
            if (strSuit === suitRankings[i]) {
               numSuit = i;
               
            }
        }
        let card = {
            rank: numRank,
            suit: numSuit
        };
        return card;
    }


export default EquityCalculator;