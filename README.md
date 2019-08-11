# State Recorder

Record the state of an application and play it back/forward


## Install

    npm install @plurid/state-recorder

or

    yarn add @plurid/state-recorder


## Usage


    import StateRecorder from '@plurid/state-recorder';

    const initialState = {
        // initial state object
    };

    const stateRecorder = new StateRecorder(initialState);

    const newState = {
        // updated application state object
    }

    stateRecorder.add(newState);

    stateRecorder.all();
    // returns an array of all the state objects
    // e.g. [initialState, newState];

    stateRecorder.current();
    // returns a state situation
    // e.g.
    // {
    //      state, // the state
    //      cursor, // the state location in all the recorded states
    //      first, // if it is the first state
    //      last, // if it is the last state
    // }

    stateRecorder.previous();
    // returns the previous state situation

    stateRecorder.next();
    // returns the next state situation

    const differences = stateRecorder.differences();
    // returns an array of differences between the states
    // with the first element, differences[0], the initial state
    // to be further stored in persistent storage

    // the differences can be loaded into a new StateRecorder
    // to obtain a previous state chain, a sitting
    const previousSitting = new StateRecorder(differences);
