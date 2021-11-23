import PropTypes from "prop-types";
import { MouseEvent, MouseEventHandler } from "react";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import useTimeAgo from "../../hooks/useTimeAgo";
import { Avatar } from "./Avatar";
import styles from './styles/devit.module.css';
import { useRouter } from "next/dist/client/router";

export const Devit = ({username, 
    avatar, 
    content, 
    id, 
    createdAt, 
    userId, 
    image
}) : JSX.Element => {
  const timeago = useTimeAgo(createdAt);
  const router = useRouter();

  const handleClickArticle = (e: MouseEvent<HTMLHtmlElement>) : void => {
    e.preventDefault();
    router.push(`/status/${id}`);
  }

  return(
    <>
      <article className={styles.article} onClick={handleClickArticle}>
        <Avatar alt={username} src={avatar} />
        <div className={styles.div} >
          <header>
            <strong> {username} </strong>
            <span>•</span>
            <Link href={`/status/${id}`} >
              <a>
              <small className={styles.small}> { timeago } </small>
              </a>
            </Link>
          </header>
          <p className={styles.p}> {content} </p>
          {image && <Image width={'450rem'} height={'250rem'} className={styles.image} src={image} alt={username} />}
        </div>
      </article>
    </>
  )
}

Devit.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  createdAt: PropTypes.number,
  userId: PropTypes.string,
  image: PropTypes.string
}

