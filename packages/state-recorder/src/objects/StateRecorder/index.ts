import {
    State,
    IStateRecorder,
    StateSituation,
} from '../../interfaces';



class StateRecorder implements IStateRecorder {
    private states: State[] = [];
    private stateCursor: number = 0;

    constructor(state: State) {
        this.states.push(state);
    }

    public getStates(): State[] {
        return this.states;
    }

    public getCurrentState(): StateSituation {
        const cursor = this.stateCursor;
        return {
            state: this.states[cursor],
            cursor,
            first: cursor === 0,
            last: cursor === this.states.length - 1,
        };
    }

    public addState(state: State): number {
        this.states.push(state);
        this.stateCursor = this.states.length - 1;

        return this.stateCursor;
    }

    public previousState(): StateSituation {
        this.decreasestateCursor();
        const cursor = this.stateCursor;
        return {
            state: this.states[cursor],
            cursor,
            first: cursor === 0,
            last: cursor === this.states.length - 1,
        };
    }

    public nextState(): StateSituation {
        this.increasestateCursor();
        const cursor = this.stateCursor;
        return {
            state: this.states[cursor],
            cursor,
            first: cursor === 0,
            last: cursor === this.states.length - 1,
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
        if (this.stateCursor + 1 <= this.states.length - 1) {
            this.stateCursor += 1;
        } else {
            this.stateCursor = this.states.length - 1;
        }
    }
}


export default StateRecorder;
