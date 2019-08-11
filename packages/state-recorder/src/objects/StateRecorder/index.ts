import {
    IStateRecorder,
    State,
    StateSituation,
    StateDifference,
} from '../../interfaces';

import StateDifferenceEngine from '../StateDifferenceEngine';



class StateRecorder implements IStateRecorder {
    private initialState: State;
    private stateDifferences: any[] = [];
    private stateCursor: number = 0;

    constructor(state: State | any[] | undefined) {
        if (!Array.isArray(state)) {
            this.initialState = state || {};
            this.stateDifferences.push(this.initialState);
        } else {
            this.initialState = state[0];
            this.stateDifferences = state;
            this.stateCursor = state.length - 1;
        }
    }

    /**
     * Get all the State objects
     *
     * @returns State[]
     */
    public all(): State[] {
        const states: State[] = [ {...this.initialState}, ];

        for (let i = 1; i < this.stateDifferences.length; i++) {
            const state = this.composeState(i);
            states.push(state);
        }

        return states;
    }

    /**
     * Add a new state to the state chain.
     *
     * @param state
     */
    public add(state: State): number {
        const previousState = this.composeState(this.stateDifferences.length - 1);
        const differenceEngine = new StateDifferenceEngine(previousState, state);
        const difference = differenceEngine.difference();
        this.stateDifferences.push(difference);
        this.stateCursor = this.stateDifferences.length - 1;

        return this.stateCursor;
    }

    /**
     * Get the current StateSituation.
     *
     * @returns StateSituation
     */
    public current(): StateSituation {
        const cursor = this.stateCursor;
        return {
            state: this.composeState(cursor),
            cursor,
            first: cursor === 0,
            last: cursor === this.stateDifferences.length - 1,
        };
    }

    /**
     * Get the previous StateSituation, if it exists,
     * or the first StateSituation.
     *
     * @returns StateSituation
     */
    public previous(): StateSituation {
        this.decreaseStateCursor();
        const cursor = this.stateCursor;
        return {
            state: this.composeState(cursor),
            cursor,
            first: cursor === 0,
            last: cursor === this.stateDifferences.length - 1,
        };
    }

    /**
     * Get the next StateSituation, if it exists,
     * or the last StateSituation.
     *
     * @returns StateSituation
     */
    public next(): StateSituation {
        this.increaseStateCursor();
        const cursor = this.stateCursor;
        return {
            state: this.composeState(cursor),
            cursor,
            first: cursor === 0,
            last: cursor === this.stateDifferences.length - 1,
        };
    }

    /**
     * Get an array of state differences to be stored
     * in a persistent storage system and loaded at a later date
     * in a new StateRecorder.
     *
     * @returns StateDifference[]
     */
    public differences(): StateDifference[] {
        return this.stateDifferences;
    }


    private decreaseStateCursor() {
        if (this.stateCursor - 1 >= 0) {
            this.stateCursor -= 1;
        } else {
            this.stateCursor = 0;
        }
    }

    private increaseStateCursor() {
        if (this.stateCursor + 1 <= this.stateDifferences.length - 1) {
            this.stateCursor += 1;
        } else {
            this.stateCursor = this.stateDifferences.length - 1;
        }
    }

    private composeState(cursor: number) {
        // create a given state based on it's cursor
        // and the initial state
        let state = { ...this.initialState };

        for (const [index, difference] of this.stateDifferences.entries()) {
            if (index <= cursor) {
                state = { ...state, ...difference };
            }
        }

        return state;
    }
}


export default StateRecorder;
