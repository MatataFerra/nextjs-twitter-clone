import { useState } from 'react';
import shared from '../../styles/shared.module.css'
import styles from './styles/compose.module.css';
import { Button } from  '../../../components/home/Button';
import useUser from '../../../hooks/useUser';
import { addDevit } from '../../../firebase/client';

export default function ComposeTweet(): JSX.Element {
  const user = useUser();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.displayName,
    })
  }

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
        <Button disabled={message.trim().length === 0} >Devitear</Button>
      </form>
    </div>
  )
}
