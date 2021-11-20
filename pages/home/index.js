import { useEffect, useState } from "react";
import { Devit } from "../../components/home/Devit";
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
        <header className={styles.header}>
          <h2 className={styles.h2}>Inicio</h2>
        </header>
        <section className={styles.section}>
          <div className={styles.divContainer}>
            {timeline.map((devit) => (
              <Devit
                key={devit.id}
                createdAt={devit.createdAt}
                userId={devit.userId}
                avatar={devit.avatar}
                content={devit.content}
                username={devit.username}
              />
            ))}
          </div>
          <nav className={styles.nav}>

          </nav>
        </section>
      </div>
    </>
  );
}
