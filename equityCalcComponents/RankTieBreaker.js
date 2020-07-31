import React from 'react';

// breaks ties of hands with the same rank
// ex pair of AA vs KK
// or pair of AA w K kicker vs Q kicker
// takes in two hands of the same rank (e.g. pair)
// RETURNS:
//          1 if card one is better
//          2 if card two is better
//          -1 if they are actually the same
const Rank_tie_breaker = (props) => {
    let handOne = props.handOne;
    let handTwo = props.handTwo;
    let hand_rank = handOne.rank;
    console.log(hand_rank);
    if(hand_rank === 0) {
        //high card tie breaker
        return HighCardTieBreaker({handOne: handOne, handTwo: handTwo});
    } else if (hand_rank === 1) {
        //pair tie breaker
        return PairTieBreaker({handOne: handOne, handTwo: handTwo});
    } else if (hand_rank === 2) {
        // two pair tie breaker
        return TwoPairTieBreaker({handOne: handOne, handTwo: handTwo});
    } else if (hand_rank === 3) {
        // Trips tie breaker
        return TripsTieBreaker({handOne: handOne, handTwo: handTwo});
    } else if (hand_rank === 4) {
        // Straight Tie breaker
        return StraightTieBreaker({handOne: handOne, handTwo: handTwo});
    } else if (hand_rank === 5) {
        // Flush house tie breaker
    } else if (hand_rank === 6) {
        // Full house tie breaker
    } else if (hand_rank === 7) {
        // quads tie breaker
    } else if (hand_rank === 8) {
        // str flush tie breaker
    } 
    //Royal flush not possible


    return -1;
}


// Takes in two hands with no board connection
// RETURNS: 1 for hand one win
//          2 for hand two win
//          -1 for chop
const HighCardTieBreaker = (props) => {
    let handOne = props.handOne;
    let handTwo = props.handTwo;

    for (let i = 0; i < 5; ++i) {
        if (handOne.kickers[i].rank > handTwo.kickers[i].rank) {
            return 1;
        } else if (handTwo.kickers[i].rank > handOne.kickers[i].rank) {
            return 2;
        }
    }

    return -1
}

// Takes in two hands with pairs
// RETURNS: 1 for hand one win
//          2 for hand two win
//          -1 for chop

const PairTieBreaker = (props) => {
    let handOne = props.handOne;
    let handTwo = props.handTwo;

    if (handOne.pair_rank > handTwo.pair_rank) {
        return 1;
    } else if (handTwo.pair_rank > handOne.pair_rank) {
        return 2;
    } else {
        for (let i = 0; i < 3; ++i) {
            if (handOne.kickers[i].rank > handTwo.kickers[i].rank) {
                return 1;
            } else if (handTwo.kickers[i].rank > handOne.kickers[i].rank) {
                return 2;
            }
        }
    }
    return -1;
}

// Takes in two hands with Two pair
// RETURNS: 1 for hand one win
//          2 for hand two win
//          -1 for chop
const TwoPairTieBreaker = (props) => {
    let handOne = props.handOne;
    let handTwo = props.handTwo;

    if (handOne.pair_rank_one > handTwo.pair_rank_one) {
        return 1;
    } else if (handOne.pair_rank_one < handTwo.pair_rank_one) {
        return 2;
    } else if (handOne.pair_rank_two > handTwo.pair_rank_two) {
        return 1;
    } else if (handOne.pair_rank_two < handTwo.pair_rank_two) {
        return 2;
    } else if (handOne.kicker.rank > handTwo.kicker.rank) {
        return 1;
    } else if (handOne.kicker.rank < handTwo.kicker.rank) {
        return 2;
    } else {
        return -1;
    }
}

const TripsTieBreaker = (props) => {
    let handOne = props.handOne;
    let handTwo = props.handTwo;

    if (handOne.trips_rank > handTwo.trips_rank) {
        return 1;
    } else if (handTwo.trips_rank > handOne.trips_rank) {
        return 2;
    } else {
        for (let i = 0; i < 2; ++i) {
            if (handOne.kickers[i].rank > handTwo.kickers[i].rank) {
                return 1;
            } else if (handTwo.kickers[i].rank > handOne.kickers[i].rank) {
                return 2;
            }
        }
    }

    return -1;
}

const StraightTieBreaker = (props) => {
    let handOne = props.handOne;
    let handTwo = props.handTwo;
    if (handOne.high_card > handTwo.high_card) {
        return 1;
    } else if (handTwo.high_card > handOne.high_card) {
        return 2;
    }
    return -1;
}



export default Rank_tie_breaker;