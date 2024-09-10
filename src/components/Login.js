import React, { useRef, useState } from 'react';
import Header from './Header';
import { BLOGO, USER_ICON } from '../utils/constant';
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_ICON,
        })
          .then(() => {
            const currentUser = auth.currentUser;
            if (currentUser) {
              const { uid, email, displayName, photoURL } = currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL}));
               // Navigate to "Browse" page after successful sign-up
            }
          })
          .catch((error) => {
            setErrorMessage(`Error updating profile: ${error.message}`);
          });
      })
      .catch((error) => {
        setErrorMessage(`Sign-up Error: ${error.code} - ${error.message}`);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }));
           // Navigate to "Browse" page after successful sign-in
        }
      })
      .catch((error) => {
        setErrorMessage(`Sign-in Error: ${error.code} - ${error.message}`);
      });
  };

  const handleButtonClick = () => {
    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img alt='background-img' src={BLOGO} />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 w-3/12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80 rounded-xl'>
        <h1 className='text-white mb-6 m-2 text-4xl font-bold'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input
            type='text'
            ref={name}
            placeholder='Full Name'
            className='p-4 m-2 w-full bg-opacity-50 bg-black border border-gray-400 rounded-lg text-white'
            aria-label='Full Name'
          />
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email Address'
          className='p-4 m-2 w-full bg-opacity-50 bg-black border border-gray-400 rounded-lg text-white'
          aria-label='Email Address'
        />
        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='p-4 m-2 w-full bg-opacity-50 bg-black border border-gray-400 rounded-lg text-white'
          aria-label='Password'
        />
        {errorMessage && <p className='text-red-600 font-bold m-2'>{errorMessage}</p>}
        <button onClick={handleButtonClick} className='p-2 m-2 bg-red-700 w-full rounded-lg text-white'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='text-white p-2 m-2 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

