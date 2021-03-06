<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/state-recorder/master/about/identity/state-recorder-logo.png" height="200px">
    <br />
    <br />
    <a target="_blank" href="https://www.npmjs.com/package/@plurid/state-recorder">
        <img src="https://img.shields.io/npm/v/@plurid/state-recorder.svg?logo=npm&colorB=940c0c&style=for-the-badge" alt="Version">
    </a>
    <a href="https://github.com/plurid/state-recorder/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=940c0c&style=for-the-badge" alt="License">
    </a>
</p>



<h1 align="center">
    State Recorder
</h1>



<br />



Record the state of an application and play it back/forward.


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
    };

    stateRecorder.add(newState);


    stateRecorder.all();
    // returns an array of all the state objects
    // e.g.
    // [
    //      initialState,
    //      newState
    // ];


    stateRecorder.current();
    // returns the current StateSituation
    // e.g.
    // {
    //      state, // the state
    //      cursor, // the state location in all the recorded states
    //      first, // if it is the first state
    //      last, // if it is the last state
    // };


    stateRecorder.previous();
    // returns the previous StateSituation, if it exists,
    // or the first StateSituation;
    // sets playMode on


    stateRecorder.next();
    // returns the next StateSituation, if it exists,
    // or the last StateSituation;
    // sets playMode on
    // or sets playMode off if it returns the last StateSituation


    const differences = stateRecorder.differences();
    // returns an array of differences between the states
    // with the first element, differences[0], the initial state
    // to be further stored in persistent storage

    // the differences can be loaded into a new StateRecorder
    // to obtain a previous state chain, a sitting
    const previousSitting = new StateRecorder(differences);


    // when the stateRecorder state cursor is not on the last state of the state chain
    // due to an action of moving back/forward on the chain through previous()/next() methods
    // a playMode is automatically activated

    // during playMode new states cannot/will not be added onto the state chain with the add() method

    // any of the following will set playMode off:
    // - the cursor is placed on the last state of the state chain through successive next() methods
    // - the stateRecorder is resetted
    stateRecorder.reset();
    // - the stateRecorder is branched
    stateRecorder.branch();
    //   effectively discarding all the states on the state chain from the current position of the state cursor
