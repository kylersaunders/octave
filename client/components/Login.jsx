import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

const Login = (props) => {
  const { handleClick } = props;
  return (
    <div className={styles.formContainer}>
      <h1>Octave</h1>
      <h3>Add some depth to your sound</h3>
      <form className='login' onClick={handleClick}>
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
        <button type='submit' className={styles.loginButton}>
          Login with Spotify
        </button>
      </form>
    </div>
  );
};
export default Login;
