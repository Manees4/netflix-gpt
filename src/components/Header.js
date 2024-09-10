import React, { useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES, USER_ICON } from '../utils/constant';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changelanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  // Safeguard against undefined or null user
  const userExists = user && user.email;

  const handleGptSearchClick = ()=>{
    dispatch(toggleGptSearchView())
  }
  const handlelanguageChange = (e) =>{
    dispatch(changelanguage(e.target.value))

  }

  return (
    <div className='absolute px-8 py-2 z-10 w-full bg-gradient-to-b from-black flex justify-between'>
      <img className='w-40 mt-2 ml-4' alt='logo' src={LOGO} />
      {userExists && (
        <div className='p-2 mt-3 mr-12 flex'>
          {showGptSearch && (<select onChange={handlelanguageChange} className='p-2 m-2 bg-gray-900 text-white'>
            {SUPPORTED_LANGUAGES.map(lang =><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
           
  
          </select>)}
          <button onClick={handleGptSearchClick} className='mb-2 px-2 mr-8  rounded-lg bg-violet-800 text-white'>{showGptSearch ?"Home page" :"GPT Search"}</button>
          <img className='w-9 h-9' alt='usericon' src={user.photoURL || USER_ICON} />
          <button onClick={handleSignOut} className='p-2 font-bold text-white'>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

