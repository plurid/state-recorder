import {
    IStateDifferenceEngine,
    State,
    StateDifference,
} from '../../interfaces';



class StateDifferenceEngine implements IStateDifferenceEngine {
    private previousState: State;
    private currentState: State;

    constructor(previousState: State, currentState: State) {
        this.previousState = previousState;
        this.currentState = currentState;
    }

    public difference(): StateDifference {
        // for all the keys in previousState
        // check if values are different in the currentState
        // add the differences to stateDifferences
        // return stateDifference

        const stateDifference: any = {};

        for (const key in this.previousState) {
            if (typeof this.previousState[key] !== 'object') {
                if (this.previousState[key] !== this.currentState[key]) {
                    stateDifference[key] = this.currentState[key];
                }
            } else {
                // handle arrays, objects
            }
        }

        return stateDifference;
    }
}


export default StateDifferenceEngine;
