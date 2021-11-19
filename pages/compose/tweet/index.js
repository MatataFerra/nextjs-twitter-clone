import shared from '../../styles/shared.module.css'
import styles from './styles/compose.module.css';
import { Button } from  '../../../components/home/Button'
import { useState } from 'react';
import useUser from '../../../hooks/useUser';

export default function ComposeTweet() {

  const user = useUser()

  return(
    <div className={shared.container}>
      <form action="">
        <textarea className={styles.textarea} placeholder='¿Qué está pasando?'></textarea>
        <Button>Devitear</Button>
      </form>
    </div>
  )
}
