import React, { useState, useEffect } from 'react';

const Title = (props) => {
  const { setShowNav } = props;
  return (
    <div id='titlebar'>
      {/* <button type='button' name='sidebar'>
        =
      </button> */}
      <h1>Octave</h1>
      {/* <div id='options'>
        <button type='button' name='reauth'>
          Reauthorize
        </button>
        <button type='button' name='logout'>
          Log out
        </button>
      </div> */}
    </div>
  );
};

export default Title;
