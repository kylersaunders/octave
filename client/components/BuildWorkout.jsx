import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { counter: state.counter.value, hi: 'hello' };
}

const BuildWorkout = (props) => {
  const { counter, hi } = props;
  return (
    <>
      <h3>Build Workout:</h3>
      <p>Counter: {counter}</p>
      <p>Message: {hi}</p>
      <button
        onClick={(e) => {
          props.dispatch({ type: 'DECREMENT' });
        }}
      >
        -
      </button>
      <button
        onClick={(e) => {
          props.dispatch({ type: 'INCREMENT' });
        }}
      >
        +
      </button>
    </>
  );
};

export default connect(mapStateToProps)(BuildWorkout);
