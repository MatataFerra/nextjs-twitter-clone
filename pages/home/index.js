import { useEffect, useState } from "react";
import { Devit } from "../../components/home/Devit";
import styles from "./home.module.css";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/timeline")
      .then((res) => res.json())
      .then(setTimeline);
  }, []);
  return (
    <>
      <div className={styles.container} >
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
        </section>
        <nav></nav>
      </div>
    </>
  );
}
