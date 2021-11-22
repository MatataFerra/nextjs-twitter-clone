import { useEffect, useState } from "react";
import  Link  from 'next/link'
import { Devit } from "../../components/home/Devit";
import Create from '../../components/icons/Create';
import Home from '../../components/icons/Home';
import Search from '../../components/icons/Search';
import styles from "./home.module.css";
import shared from "../styles/shared.module.css";
import useUser from "../../hooks/useUser";
import { fetchLatestDevits } from "../../firebase/client";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user && 
    fetchLatestDevits()
      .then(setTimeline)
  }, [user]);
  return (
    <>
      <div className={shared.container} >
        <section className={styles.section}>
          <div className={styles.divContainer}>
            <header className={styles.header}>
              <h2 className={styles.h2}>Inicio</h2>
            </header>
            {timeline.map((devit) => (
              <Devit
                key={devit.id}
                createdAt={devit.createdAt}
                userId={devit.userId}
                avatar={devit.avatar}
                content={devit.content}
                username={devit.username}
                image={devit.image}
              />
            ))}
          </div>
          <nav className={styles.nav}>
            <Link href='/compose/tweet'>
              <a>
                <Create height={32} width={32} color='#09f' />
              </a>
            </Link>

            <Link href='/search'>
              <a>
                <Search color='#09f'/>
              </a>
            </Link>

            <Link href='/home'>
              <a>
                <Home color='#09f'/>
              </a>
            </Link>

          </nav>
        </section>
      </div>
    </>
  );
}
