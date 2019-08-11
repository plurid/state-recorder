export interface State {
    [key: string]: any;
}

export interface StateDifference {
    [key: string]: any;
}


export interface StateSituation {
    state: State;
    cursor: number;
    first: boolean;
    last: boolean;
}


export interface IStateRecorder {
    all: () => State[];
    current: () => State;
    add: (state: State) => number;
    previous: () => StateSituation;
    next: () => StateSituation;
    differences: () => StateDifference[];
}


export interface IStateDifferenceEngine {
    difference: () => StateDifference;
}
