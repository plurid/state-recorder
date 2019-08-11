import {
    IStateDifferenceEngine,
    State,
    StateDifference,
} from '../../interfaces';

import {
    isEqual
} from '../../utilities';



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
            const previousItem = this.previousState[key];
            const currentItem = this.currentState[key];

            if (typeof previousItem !== 'object') {
                if (previousItem !== currentItem) {
                    stateDifference[key] = currentItem;
                }
            } else {
                if (!isEqual(previousItem, currentItem)) {
                    stateDifference[key] = currentItem;
                }
            }
        }

        return stateDifference;
    }
}


export default StateDifferenceEngine;
