import {
    State,
    IStateRecorder,
    StateSituation,
} from '../../interfaces';



class StateRecorder implements IStateRecorder {
    private states: State[] = [];
    private stateIndex: number = 0;

    constructor(state: State) {
        this.states.push(state);
    }

    public getStates(): State[] {
        return this.states;
    }

    public getCurrentState(): StateSituation {
        const index = this.stateIndex;
        return {
            state: this.states[index],
            index,
            first: index === 0,
            last: index === this.states.length - 1,
        };
    }

    public addState(state: State): number {
        this.states.push(state);
        this.stateIndex = this.states.length - 1;

        return this.stateIndex;
    }

    public previousState(): StateSituation {
        this.decreaseStateIndex();
        const index = this.stateIndex;
        return {
            state: this.states[index],
            index,
            first: index === 0,
            last: index === this.states.length - 1,
        };
    }

    public nextState(): StateSituation {
        this.increaseStateIndex();
        const index = this.stateIndex;
        return {
            state: this.states[index],
            index,
            first: index === 0,
            last: index === this.states.length - 1,
        };
    }

    private decreaseStateIndex() {
        if (this.stateIndex - 1 >= 0) {
            this.stateIndex -= 1;
        } else {
            this.stateIndex = 0;
        }
    }

    private increaseStateIndex() {
        if (this.stateIndex + 1 <= this.states.length - 1) {
            this.stateIndex += 1;
        } else {
            this.stateIndex = this.states.length - 1;
        }
    }
}


export default StateRecorder;
