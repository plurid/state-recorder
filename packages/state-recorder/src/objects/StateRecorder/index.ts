import {
    IStateRecorder,
    State,
    StateSituation,
} from '../../interfaces';

import StateDifferenceEngine from '../StateDifferenceEngine';



class StateRecorder implements IStateRecorder {
    private initialState: State;
    private stateDifferences: any[] = [];
    private stateCursor: number = 0;

    constructor(state: State) {
        this.initialState = state;
        this.stateDifferences.push(state);
    }

    public getStates(): State[] {
        const states: State[] = [ {...this.initialState}, ];

        for (let i = 1; i < this.stateDifferences.length; i++) {
            const state = this.composeState(i);
            states.push(state);
        }

        return states;
    }

    public getCurrentState(): StateSituation {
        const cursor = this.stateCursor;
        return {
            state: this.composeState(cursor),
            cursor,
            first: cursor === 0,
            last: cursor === this.stateDifferences.length - 1,
        };
    }

    public addState(state: State): number {
        // instead of storing the states as is
        // to store only the differences between the current, new state
        // and the old state

        const previousState = this.composeState(this.stateDifferences.length - 1);
        const differenceEngine = new StateDifferenceEngine(previousState, state);

        this.stateDifferences.push(differenceEngine.difference());
        this.stateCursor = this.stateDifferences.length - 1;

        return this.stateCursor;
    }

    public previousState(): StateSituation {
        this.decreasestateCursor();
        const cursor = this.stateCursor;
        return {
            state: this.composeState(cursor),
            cursor,
            first: cursor === 0,
            last: cursor === this.stateDifferences.length - 1,
        };
    }

    public nextState(): StateSituation {
        this.increasestateCursor();
        const cursor = this.stateCursor;
        return {
            state: this.composeState(cursor),
            cursor,
            first: cursor === 0,
            last: cursor === this.stateDifferences.length - 1,
        };
    }

    private decreasestateCursor() {
        if (this.stateCursor - 1 >= 0) {
            this.stateCursor -= 1;
        } else {
            this.stateCursor = 0;
        }
    }

    private increasestateCursor() {
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
                state = { ...difference };
            }
        }

        return state;
    }
}


export default StateRecorder;
