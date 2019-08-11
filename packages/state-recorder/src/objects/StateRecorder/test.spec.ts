import StateRecorder from './';



describe('StateRecorder', () => {
    it('creates state phases', () => {
        const state1 = {
            action1: 'foo',
            action2: 'bar',
        };
        const stateRecorder = new StateRecorder(state1);
        const states1 = stateRecorder.all();
        expect(states1).toStrictEqual([state1]);

        const state2 = {
            action1: 'foo',
            action2: 'boo',
        };
        stateRecorder.add(state2);

        const states2 = stateRecorder.all();
        expect(states2).toStrictEqual([state1, state2]);

        const state3 = {
            action1: 'bag',
            action2: 'boo',
        };
        stateRecorder.add(state3);

        const states3 = stateRecorder.all();
        expect(states3).toStrictEqual([state1, state2, state3]);

        const currentState = stateRecorder.current();
        expect(currentState.state).toStrictEqual(state3);
        expect(currentState.last).toBe(true);

        const previousState2 = stateRecorder.previous();
        expect(previousState2.state).toStrictEqual(state2);

        const previousState1 = stateRecorder.previous();
        expect(previousState1.state).toStrictEqual(state1);
        expect(previousState1.first).toBe(true);

        const previousState0 = stateRecorder.previous();
        expect(previousState0.state).toStrictEqual(state1);
        expect(previousState0.first).toBe(true);

        const nextState1 = stateRecorder.next();
        expect(nextState1.state).toStrictEqual(state2);

        const differences = stateRecorder.differences();
        expect(differences.length).toBe(3);
    });
});
