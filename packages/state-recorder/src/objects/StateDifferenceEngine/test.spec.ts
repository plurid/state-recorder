import StateDifferenceEngine from './';



describe('StateDifferenceEngine', () => {
    it('handles the state differences of strings', () => {
        const state1 = {
            action1: 'foo',
            action2: 'bar',
        };

        const state2 = {
            action1: 'foo',
            action2: 'baz',
        };

        const stateDiffEngine = new StateDifferenceEngine(state1, state2);

        const stateDifference = {
            action2: 'baz',
        };
        expect(stateDiffEngine.difference()).toStrictEqual(stateDifference);
    });

    it('handles the state differences of numbers', () => {
        const state1 = {
            action1: 1,
            action2: 2,
        };

        const state2 = {
            action1: 1,
            action2: 3,
        };

        const stateDiffEngine = new StateDifferenceEngine(state1, state2);

        const stateDifference = {
            action2: 3,
        };
        expect(stateDiffEngine.difference()).toStrictEqual(stateDifference);
    });

    it('handles the state differences of arrays', () => {
        const state1 = {
            action1: [1, 2, 3],
            action2: [2, 3, 4],
        };

        const state2 = {
            action1: [1, 2, 3],
            action2: [2, 3, 5],
        };

        const stateDiffEngine = new StateDifferenceEngine(state1, state2);

        const stateDifference = {
            action2: [2, 3, 5],
        };
        expect(stateDiffEngine.difference()).toStrictEqual(stateDifference);
    });
});
