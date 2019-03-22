import React, { Component } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }), // [undefined, undefined, undefined, undefined, undefined]
      locked: Array(NUM_DICE).fill(false), // [false, false, false, false, false ]
      rollsLeft: NUM_ROLLS, //3
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.doScore = this.doScore.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      // Based on locked status, if T, don't roll, if F reroll
      dice: st.dice.map(
        (d, i) => st.locked[i] ? d : Math.ceil(Math.random() * 6)),
      // if rollsLeft value reaches 0, then all the dice are locked
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      // decrease rollsLeft by 1 each turn
      rollsLeft: st.rollsLeft - 1,
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    this.setState(st => ({
      // IS THIS A WEIRD FLEX??
      // Why can't you just slice all and toggle at idx
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ],
    }))
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      // Calculate score for given rulename with ruleFn, save that into scores
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      // Reset the rollsLeft back to start
      rollsLeft: NUM_ROLLS,
      // Reset the locked status for the dice back to unlocked for all
      locked: Array(NUM_DICE).fill(false),
    }));
    this.roll();
  }

  render() {
    return (
      <section>
        <Dice dice={this.state.dice} locked={this.state.locked} handleClick={this.toggleLocked} />
        <button
          className="Game-reroll"
          disabled={this.state.locked.every(x => x) || this.state.rollsLeft === 0}
          onClick={this.roll}>
          {this.state.rollsLeft} Rerolls Left
        </button>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </section>
    );
  }
}

export default Game;