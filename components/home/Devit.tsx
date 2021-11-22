import { Avatar } from "./Avatar";
import Image from "next/dist/client/image";
import PropTypes from "prop-types";
import styles from './styles/devit.module.css';
import useTimeAgo from "../../hooks/useTimeAgo";

export const Devit = ({username, avatar, content, id, createdAt, userId, image}) : JSX.Element => {
  const timeago = useTimeAgo(createdAt);

  return(
    <>
      <article className={styles.article} >
        <Avatar alt={username} src={avatar} />
        <div className={styles.div} >
          <header>
            <strong> {username} </strong>
            <span>•</span>
            <small className={styles.small}> { timeago } </small>
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

