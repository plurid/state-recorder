import StateRecorder from './';


describe('StateRecorder', () => {
    it('create state phases', () => {
        const state1 = {
            action1: 'foo',
            action2: 'bar',
        }
        const stateRecorder = new StateRecorder(state1);
        const states1 = stateRecorder.getStates();
        expect(states1).toStrictEqual([state1]);

        const state2 = {
            action1: 'baz',
            action2: 'boo',
        }
        stateRecorder.addState(state2);
        const states2 = stateRecorder.getStates();
        expect(states2).toStrictEqual([state1, state2]);

        const state3 = {
            action1: 'bag',
            action2: 'bol',
        }
        stateRecorder.addState(state3);

        const states3 = stateRecorder.getStates();
        expect(states3).toStrictEqual([state1, state2, state3]);

        const currentState = stateRecorder.getCurrentState();
        expect(currentState.state).toStrictEqual(state3);
        expect(currentState.last).toBe(true);

        const previousState2 = stateRecorder.previousState();
        expect(previousState2.state).toStrictEqual(state2);

        const previousState1 = stateRecorder.previousState();
        expect(previousState1.state).toStrictEqual(state1);
        expect(previousState1.first).toBe(true);

        const nextState1 = stateRecorder.nextState();
        expect(nextState1.state).toStrictEqual(state2);
    });
});
