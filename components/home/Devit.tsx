import { Avatar } from "./Avatar";
import PropTypes from "prop-types";
import styles from './styles/devit.module.css';
import useTimeAgo from "../../hooks/useTimeAgo";

export const Devit = ({username, avatar, content, id, createdAt, userId}) : JSX.Element => {
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
          <p className={styles.p} > {content} </p>
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
  userId: PropTypes.string
}

