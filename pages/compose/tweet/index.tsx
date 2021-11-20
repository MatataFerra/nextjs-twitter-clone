import { ChangeEvent, FormEvent ,useState } from 'react';
import { Button } from  '../../../components/home/Button';
import { addDevit } from '../../../firebase/client';
import { useRouter } from 'next/dist/client/router';
import useUser from '../../../hooks/useUser';

import shared from '../../styles/shared.module.css'
import styles from './styles/compose.module.css';

enum COMPOSE_STATE {
  LOADING,
  SUCCESS,
  ERROR,
  USER_NOT_KNOWN
}

export default function ComposeTweet(): JSX.Element {
  const user = useUser();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(COMPOSE_STATE.USER_NOT_KNOWN);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, avatar, uid } = user;

    setStatus(COMPOSE_STATE.LOADING);

    addDevit({
      avatar: avatar,
      content: message,
      userId: uid,
      username: username,
    })
    .then(() => {
      router.push('/home')
    })
    .catch(error => {
      console.error(error);
      setStatus(COMPOSE_STATE.ERROR);
    })
  }

  const isButtonDisabled: boolean = message.trim().length === 0 || status === COMPOSE_STATE.LOADING

  return(
    <div className={shared.container}>
      <form action="" onSubmit={handleSubmit}>
        <textarea 
          className={styles.textarea} 
          placeholder='¿Qué está pasando?'
          value={message}
          onChange={handleChange}
        >
        </textarea>
        <Button disabled={isButtonDisabled} >Devitear</Button>
      </form>
    </div>
  )
}
