import styles from '../styles/shared_styles';
import Link from 'next/link';
import { Anchor } from '../../components/home/Anchor';

export default function Timeline({name}) {
  return (
    <>
      <h1 >This is the timeline for {name} </h1>
      <Anchor anchorText='Home' redirect={'/'}/>
      <style jsx>{styles}</style>
    </>
  );
}

Timeline.getInitialProps = async () => {
  return fetch('http://localhost:3000/api/hello')
  .then(res => res.json())
};
