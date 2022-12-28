import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const { handleClick } = props;
  return (
    <>
      <h1 className='h-0'>Octave</h1>
      <h3>Add some depth to your sound</h3>
      <form name='login' onClick={handleClick}>
        {/* <input
          type='text'
          name='username'
          className={styles.textInput}
          placeholder='Username'
        />
        <input
          type='password'
          name='password'
          className={styles.textInput}
          placeholder='Password'
        /> */}
        <button
          name='login'
          type='submit'
          className='btn btn-primary btn-accent'
        >
          Login with Spotify
        </button>
      </form>
    </>
  );
};
export default Login;
