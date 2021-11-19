import { useEffect, useState } from "react";
import { Devit } from "../../components/home/Devit";
import styles from "./home.module.css";
import shared from "../styles/shared.module.css";
import useUser from "../../hooks/useUser";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user && 
    fetch("http://localhost:3000/api/timeline")
      .then((res) => res.json())
      .then(setTimeline);
  }, [user]);
  return (
    <>
      <div className={shared.container} >
        <header className={styles.header}>
          <h2 className={styles.h2}>Inicio</h2>
        </header>
        <section className={styles.section}>
          {timeline.map((devit) => (
            <Devit
              key={devit.id}
              avatar={devit.avatar}
              message={devit.message}
              username={devit.username}
            />
          ))}
          <nav className={styles.nav}>

          </nav>
        </section>
      </div>
    </>
  );
}
