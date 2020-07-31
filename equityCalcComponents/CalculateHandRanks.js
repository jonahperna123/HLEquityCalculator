import React from 'react';

const calculate_hand_ranks = (props) => {
    let completed_board = props.completed_board;
    let hole_cards = props.hole_cards;
    let num_players = hole_cards.length / 2;
    let hand_ranks = []
   

    // calculate the hand rank for each player
    for (let i = 0; i < num_players; ++i) {
        //start by getting players cards
        let full_hand = new Array(...completed_board);
        
        let rank = 0;
        let holeCardOne = {
            rank: hole_cards[i*2].rank,
            suit: hole_cards[i*2].suit   
        };
        let holeCardTwo = {
            rank: hole_cards[i*2 +1].rank,
            suit: hole_cards[i*2 +1].suit
        };
        full_hand.push(holeCardOne);
        full_hand.push(holeCardTwo);

        full_hand.sort((a,b) => (b.rank-a.rank)); //sort array in descending order
        
        rank = get_hand_rank({full_hand: full_hand, cardOne: holeCardOne, cardTwo: holeCardTwo});

        hand_ranks.push(rank);
        
    }
    
    return hand_ranks;
}

// Takes in players full 7 available cards
// RETURNS: # value of hand rank
const get_hand_rank = (props) => {
   
   
    let full_hand = props.full_hand;
   
    if (check_royal_flush({full_hand: full_hand})) {
        return 9;
    } else if (check_str_flush({full_hand: full_hand})) {
        return 8;
    } else if (check_quads({full_hand: full_hand})) {
        return 7;
    } else if (check_full_house({full_hand: full_hand})) {
        return 6;
    } else if (check_flush({full_hand: full_hand})) {
        return 5;
    } else if (check_straight({full_hand: full_hand})) {
        return get_straight_obj({full_hand: full_hand});
    } else if (check_trips({full_hand: full_hand})) {
        return get_trips_obj({full_hand: full_hand});
    } else if (check_two_pair({full_hand: full_hand})) {
        return get_two_pair_obj({full_hand: full_hand});
    } else if (check_pair({full_hand: full_hand})) {
        return get_pair_obj({full_hand: full_hand});
    } else {
        return get_high_card({full_hand: full_hand});
    }


}

const get_high_card = (props) => {
    let full_hand = props.full_hand;
    let hand = {
        rank: 0,
        kickers: full_hand.slice(0, 5)
    };
    return hand;
}



// Takes in 7 cards. 5 cards on board + 2 hole cards
// RETURNS: True if there is a pair
const check_pair = (props) => {
    let full_hand = props.full_hand;
   
    for (let i = 0; i < full_hand.length; ++i) {
        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].rank === full_hand[j].rank) {        
                return true;
            }
        }
    }

    return false;
}

const get_pair_obj = (props) => {
    let full_hand = props.full_hand;
    let kickers = [];
    let card = {};
    for (let i = 0; i < full_hand.length; ++i) {
        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].rank === full_hand[j].rank) {  
                
                for (let n = 0; n < full_hand.length; ++n) {
                    if (n !== i && n !== j) {
                        kickers.push(full_hand[n]);
                    } 
                    if (kickers.length === 3) {
                        break;
                    }
                }
                card = {
                    rank: 1,
                    pair_rank: full_hand[i].rank,
                    kickers: kickers
                };
            }
        }
    }
    return card;
}


// Takes in 7 cards. 5 cards on board + 2 hole cards
// RETURNS: True if there is a pair
const check_two_pair = (props) => {
    let full_hand = props.full_hand;
    
    let num_pairs = 0;
    for (let i = 0; i < full_hand.length; ++i) {
        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].rank === full_hand[j].rank) {
                ++num_pairs;
                if (num_pairs === 2) {
                    return true;
                }
            }
        }
    }

return false;
}

const get_two_pair_obj = (props) => {
    let full_hand = props.full_hand;
    let card = {};
    let num_pairs = 0;
    for (let i = 0; i < full_hand.length; ++i) {
        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].rank === full_hand[j].rank) {
                ++num_pairs;
                if (num_pairs === 1) {
                    card = {
                        rank: 2,
                        pair_rank_one: full_hand[i].rank
                    }
                } else if (num_pairs === 2) {
                    card.pair_rank_two = full_hand[i].rank;
                    
                    for (let k = 0; k < full_hand.length; ++k) {
                        if (full_hand[k] !== card.pair_rank_one && 
                            full_hand[k] !== card.pair_rank_two) {
                                card.kicker = full_hand[k];
                                break;
                            }
                    }

                    return card;
                }
                

                
            }
        }
    }
    return card;

}


// Returns true if there are 3 cards of the same rank
const check_trips = (props) => {
    let full_hand = props.full_hand;

    for (let i = 0; i < full_hand.length - 2; ++i) {
        let num_same = 1;
        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].rank === full_hand[j].rank) {
                ++num_same;
            }
            if (num_same === 3) {
                return true;
            }
        }
    }
  return false;
}

const get_trips_obj = (props) => {
    let full_hand = props.full_hand;
    let card = {};

    for (let i = 0; i < full_hand.length - 2; ++i) {
        let num_same = 1;
        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].rank === full_hand[j].rank) {
                ++num_same;
            }
            if (num_same === 3) {
                let kickers = [];
                for (let n = 0; n < full_hand.length; ++n) {
                    if (full_hand[n].rank !== full_hand[i].rank) {
                        kickers.push(full_hand[n]);
                    }
                    if (kickers.length === 2) {
                        break;
                    }
                }
                card = {
                    rank: 3,
                    trips_rank: full_hand[i].rank,
                    kickers: kickers
                };
                return card;
            } //if num same
        }
    }
    return card;

}

// Returns true if there are 5 cards in a row
const check_straight = (props) => {
    let full_hand = props.full_hand;

    let rank_set = [];
    for (let i = 0; i < full_hand.length; ++i) {
        if (!rank_set.includes(full_hand[i].rank)) {
            rank_set.push(full_hand[i].rank);
        }
    }
    //if the rank set includes an Ace add -1 value so it can 
    // be counted if the wheel is present
    if (rank_set.includes(12)) {
        rank_set.push(-1);
    }
    console.log(rank_set);
    if (rank_set.length < 5) {
        return false;
    }
    for (let i = 0; i < full_hand.length - 4; ++i){
        if (rank_set[i] - 1 === rank_set[i+1]
            && rank_set[i+1] - 1 === rank_set[i+2]
            && rank_set[i+2] - 1 === rank_set[i+3]
            && rank_set[i+3] - 1 === rank_set[i+4]) {
                return true;
            } 
    }
    return false;
}

const get_straight_obj = (props) => {
    let full_hand = props.full_hand;
    let card = {};

    let rank_set = [];
    for (let i = 0; i < full_hand.length; ++i) {
        if (!rank_set.includes(full_hand[i].rank)) {
            rank_set.push(full_hand[i].rank);
        }
    }
 
    if (rank_set.includes(12)) {
        rank_set.push(-1);
    }

    for (let i = 0; i < full_hand.length - 4; ++i){
        if (rank_set[i] - 1 === rank_set[i+1]
            && rank_set[i+1] - 1 === rank_set[i+2]
            && rank_set[i+2] - 1 === rank_set[i+3]
            && rank_set[i+3] - 1 === rank_set[i+4]) {
                card = {
                    rank: 4,
                    high_card: rank_set[i]
                };
                return card;
            }
    }
    return card;

}

const check_flush = (props) => {
    let full_hand = props.full_hand;
    for (let i = 0; i < full_hand.length; ++i) {
        let num_suit = 1;
        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].suit === full_hand[j].suit) {
                ++num_suit;
                if (num_suit === 5) {
                    return true;
                }
            }
        }
    }
   return false;
}

const check_full_house = (props) => {
    let full_hand = props.full_hand.slice();
    let house_set = [];
    let isThree = false;
    let isTwo = false;
    for (let i = 0; i < full_hand.length - 2; ++i) {
        let num_same = 1;

        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].rank === full_hand[j].rank && !house_set.includes(i)) {
                ++num_same;
                house_set.push(j);
            }
            if (num_same === 3) {
                isThree = true;
                isTwo = false;
            } else if (num_same === 2) {
                isTwo = true;
            }
            if (isTwo && isThree) {
                return true;
            }
        }
    }

   return false;
}

const check_quads = (props) => {
    let full_hand = props.full_hand;
    for (let i = 0; i < full_hand.length - 3; ++i) {
        let num_same = 1;
        for (let j = i+1; j < full_hand.length; ++j) {
            if (full_hand[i].rank === full_hand[j].rank) {
                ++num_same;
            }
            if (num_same === 4) {
                return true;
            }
        }
    }
  return false;
}

const check_str_flush = (props) => {
    let full_hand = props.full_hand;
    let rank_set = [];
    let str_flush = [];
    for (let i = 0; i < full_hand.length; ++i) {
        if (!rank_set.includes(full_hand[i].rank)) {
            rank_set.push(full_hand[i].rank);
            str_flush.push(full_hand[i]);
        }
    }
    if (rank_set.length < 5) {
        return false;
    }
    for (let i = 0; i < rank_set.length - 4; ++i){
        if (rank_set[i] - 1 === rank_set[i+1]
            && rank_set[i+1] - 1 === rank_set[i+2]
            && rank_set[i+2] - 1 === rank_set[i+3]
            && rank_set[i+3] - 1 === rank_set[i+4]) {
                let suit = str_flush[i].suit;
                if (str_flush[i].suit === suit &&
                    str_flush[i+1].suit === suit &&
                    str_flush[i+2].suit === suit &&
                    str_flush[i+3].suit === suit &&
                    str_flush[i+4].suit === suit){
                        return true;
                    }
            }
    }
    return false;
}

const check_royal_flush = (props) => {
    let full_hand = props.full_hand;
    let rank_set = [];
    let royal_set = [];
    for (let i = 0; i < full_hand.length; ++i) {
        if (!rank_set.includes(full_hand[i].rank)) {
            rank_set.push(full_hand[i].rank);
            royal_set.push(full_hand[i]);
        }
    }
    if (royal_set.length < 5) {
        return false;
    }
    let royal_suit = royal_set[0].suit;
    if (royal_set[0].rank === 12 && royal_set[0].suit === royal_suit &&
        royal_set[1].rank === 11 && royal_set[0].suit === royal_suit &&
        royal_set[2].rank === 10 && royal_set[0].suit === royal_suit &&
        royal_set[3].rank === 9 && royal_set[0].suit === royal_suit &&
        royal_set[4].rank === 8 && royal_set[0].suit === royal_suit) {
            return true;
        }
        return false;
}


export default calculate_hand_ranks;