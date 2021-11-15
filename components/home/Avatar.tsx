import Image from 'next/dist/client/image';
import PropTypes from "prop-types";
import styles from './styles/Avatar.module.css';

export const Avatar = ({ src, alt = 'Avatar Image' , text, withText}):JSX.Element => {

  return (
    <div className={styles.container}>
      <Image src={src} alt={alt} width={49} height={49} className={styles.avatar} />
      { withText && <strong className={styles.strong}>{text || alt}</strong>}
    </div>
  )
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string,
  withText: PropTypes.bool
}
