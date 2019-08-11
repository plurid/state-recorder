export interface State {
    [key: string]: any;
}


export interface StateSituation {
    state: State;
    cursor: number;
    first: boolean;
    last: boolean;
}


export interface IStateRecorder {
    getStates: () => State[];
    getCurrentState: () => State;
    addState: (state: State) => number;
    previousState: () => StateSituation;
    nextState: () => StateSituation;
}
