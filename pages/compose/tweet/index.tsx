import { ChangeEvent, DragEvent, FormEvent ,useEffect,useState } from 'react';
import Image from 'next/dist/client/image';
import { getDownloadURL } from 'firebase/storage';

import { useRouter } from 'next/dist/client/router';
import useUser from '../../../hooks/useUser';
import { addDevit, uploadImage } from '../../../firebase/client';

import { Button } from  '../../../components/home/Button';
import Cross from '../../../components/icons/Cross';
import { Avatar } from '../../../components/home/Avatar';

import shared from '../../styles/shared.module.css'
import styles from './styles/compose.module.css';

enum COMPOSE_STATE {
  LOADING,
  SUCCESS,
  ERROR,
  USER_NOT_KNOWN
}

enum DRAG_IMAGE_STATE {
  NONE,
  DRAG_OVER,
  UPLOADING,
  COMPLETE,
  ERROR
}

export default function ComposeTweet(): JSX.Element {
  const user = useUser();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(COMPOSE_STATE.USER_NOT_KNOWN);
  const [dragImageState, setDragImageState] = useState(DRAG_IMAGE_STATE.NONE);
  const [task, setTask] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    
    const onProgress = () => {}
    const onError = () => {}
    const onComplete = () => {
      getDownloadURL(task.snapshot.ref).then(setImageURL);
    }
    
    if(task) {
      task.on('state_changed', onProgress, onError, onComplete);
    }

  }, [task])

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
      image: imageURL
    })
    .then(() => {
      router.push('/home')
    })
    .catch(error => {
      console.error(error);
      setStatus(COMPOSE_STATE.ERROR);
    })
  }

  const handleDragEnter = (event: DragEvent<HTMLTextAreaElement>): void => {
    setDragImageState(DRAG_IMAGE_STATE.DRAG_OVER);
    
  }
  const handleDragLeave = (event: DragEvent<HTMLTextAreaElement>) => {
    setDragImageState(DRAG_IMAGE_STATE.NONE);
  }
  const handleDrop = (event: DragEvent<HTMLTextAreaElement>) => {
    setDragImageState(DRAG_IMAGE_STATE.UPLOADING);
    const file = event.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  }

  const isButtonDisabled: boolean = message.trim().length === 0 || status === COMPOSE_STATE.LOADING

  return(
    <>
      <div className={shared.container}>
        <section className={styles.sectionContainer}>
          {
            user && <Avatar src={user?.avatar} />
          }
          <form className={styles.form} action="" onSubmit={handleSubmit}>
            <textarea 
              className={styles.textarea} 
              placeholder='¿Qué está pasando?'
              value={message}
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
            </textarea>
            { imageURL &&
              <section className={styles.section}>
                <button className={styles.button} onClick={() => setImageURL(null)}> <Cross/> </button>
                <Image src={imageURL} alt="Dev Img" width={'450rem'} height={'250rem'} className={styles.image}/>
              </section>
            }
            <Button disabled={isButtonDisabled}> Devitear </Button>
          </form>
        </section>
      </div>
      <style jsx>{`
          textarea {
            border: ${dragImageState === DRAG_IMAGE_STATE.DRAG_OVER 
              ? '3px dashed #09f' : '3px solid #0000000a'};
          }
        `
      }
      </style>
    </>
  )
}
