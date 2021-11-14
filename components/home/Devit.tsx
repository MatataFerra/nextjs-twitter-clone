import { Avatar } from "./Avatar";
import PropTypes from "prop-types";
import styles from './styles/devit.module.css';

export const Devit = ({username, avatar, message, id}) : JSX.Element => {
  return(
    <article className={styles.article} >
      <Avatar alt={username} src={avatar} />
      <div>
        <strong> {username} </strong>
        <p> {message} </p>
      </div>
    </article>
  )
}

Devit.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  message: PropTypes.string
}

