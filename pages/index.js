import { useEffect, useState } from 'react';
import { loginWithGithub, onAuthStateChangedUser } from '../firebase/client';
import Image from 'next/dist/client/image';
import Github from '../components/icons/Github';
import { Title } from '../components/home/Title';
import { Button } from '../components/home/Button';
import { Avatar } from '../components/home/Avatar';
import { Logo} from '../components/icons/Logo';
import home_styles from '../components/home/styles/home_styles';
import Footer from './Footer';

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
    <div className='main-container'>
      <Logo width={100}/>
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
          <Avatar src={userLogin?.avatar} alt={userLogin?.username} withText />
        </div>
      }
      
      <style jsx> {home_styles} </style>
      {/* <Footer /> */}
    </div>
  )
}
