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

    /**
     * For all the keys in currentState
     * check if values are different in the previousState
     * and add the differences to stateDifferences
     *
     * @returns StateDifference
     */
    public difference(): StateDifference {
        const stateDifference: any = {};

        for (const key in this.currentState) {
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
