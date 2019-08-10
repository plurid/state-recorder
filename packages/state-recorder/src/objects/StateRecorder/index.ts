import {
    IStateRecorder
} from '../../interfaces';



class StateRecorder implements IStateRecorder {
    private state: string;

    constructor(state: string) {
        this.state = state;
    }
}


export default StateRecorder;
