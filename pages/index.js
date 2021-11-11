import { Title } from '../components/home/Title';
import { Button } from '../components/home/Button';
import Image from 'next/dist/client/image';
import home_styles from '../components/home/styles/home_styles'
import Footer from './Footer';
import Github from '../components/icons/Github';
import { loginWithGithub, onAuthStateChangedUser } from '../firebase/client'
import { useEffect, useState } from 'react';

const userCloseWindowError = (message) => {
  const error = new Error(message);
  return error;
}

export default function Home() {
  const [userLogin, setUserLogin] = useState(undefined);

  useEffect(() => {
    onAuthStateChangedUser(setUserLogin);
  }, []);

  const handleLoginGitHub = () => {
    loginWithGithub()
    .then(user => {
      const { email,  photoURL, accessToken, displayName } = user.user;

      console.log(photoURL);

      setUserLogin({
        avatar: photoURL,
        username: displayName,
        token: accessToken,
        email,
      });
      
    })
    .catch(err => {
      console.log(err.message);
    })

  }
  
  return (
    <>
      <Image src="/logo-practice.png" alt="Logo practice" width={150} height={150}/>
      <Title />
      {
        userLogin === null &&
        <Button onClick={handleLoginGitHub}>
          <Github width={16} height={16} fill={'#FFF'} />
            Login With GitHub
        </Button>
      }

      {
        (userLogin && userLogin.avatar) && 
        <div>
          <Image src={userLogin?.avatar} alt='Avatar Image' width={150} height={150}/>
          <p>{userLogin?.username}</p>
        </div>
      }
      
      <style jsx> {home_styles} </style>
      {/* <Footer /> */}
    </>
  )
}
