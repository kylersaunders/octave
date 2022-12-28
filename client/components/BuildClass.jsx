import React, { useState, useEffect } from 'react';
import PlaylistTracks from './PlaylistTracks.jsx';

const BuildClass = (props) => {
  //   const { handleClick, results, playIcon } = props;
  return (
    <>
      <h3>Class Blocks</h3>
      <input type='dropdown' values={[1, 2, 3, 4, 5]}></input>
    </>
  );
};

export default BuildClass;
