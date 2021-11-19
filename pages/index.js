import { useEffect } from 'react';
import { loginWithGithub } from '../firebase/client';
import useUser from '../hooks/useUser';
import Github from '../components/icons/Github';
import { Title } from '../components/home/Title';
import { Button } from '../components/home/Button';
import { Avatar } from '../components/home/Avatar';
import { Logo} from '../components/icons/Logo';
import home_styles from '../components/home/styles/home_styles';
import { useRouter } from 'next/router';

const userCloseWindowError = (message) => {
  const error = new Error(message);
  return error;
}

export default function Home() {
  const user = useUser()
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user, router]);

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
        user === null &&
        <Button onClick={handleLoginGitHub}>
          <Github width={16} height={16} fill={'#FFF'} />
            Login With GitHub
        </Button>
      }

      {
        (user && user.avatar) && 
        <div>
          <Avatar src={user?.avatar} alt={user?.username} withText />
        </div>
      }
      
      <style jsx> {home_styles} </style>
      {/* <Footer /> */}
    </div>
  )
}
