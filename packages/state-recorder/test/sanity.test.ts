import StateRecorder from '../src';



/**
* StateRecorder sanity test
*/
xdescribe('StateRecorder sanity test', () => {
    it('works if true is truthy', () => {
        expect(true).toBeTruthy();
    });

    it('StateRecorder is instantiable', () => {
        expect(new StateRecorder('state'))
            .toBeInstanceOf(StateRecorder);
    });
});
