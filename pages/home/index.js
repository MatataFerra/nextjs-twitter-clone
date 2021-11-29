import { useEffect, useState } from "react";
import  Link  from 'next/link'
import { Devit } from "../../components/home/Devit";
import { FooterHome } from './components/Footer';
import Create from '../../components/icons/Create';
import Home from '../../components/icons/Home';
import Search from '../../components/icons/Search';
import styles from "./home.module.css";
import shared from "../styles/shared.module.css";
import useUser from "../../hooks/useUser";
import { listenLatestDevits } from "../../firebase/client";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  const devitTest = [{
    id: "1",
    createdAt: new Date(),
    userId: "01",
    avatar: "https://avatars.githubusercontent.com/u/65474240?v=4",
    content: "Este es un testing devit",
    username: "Matata_Test",
    image: null

  }]

  useEffect(() => {
    let unsuscribe = null;
    if (user) {
      unsuscribe = listenLatestDevits(setTimeline)
    }
    return () => unsuscribe && unsuscribe()

  }, [user]);

  useEffect(()=> {
    console.log(timeline)
  })

  return (
    <>
      <div className={shared.container}>
        <section className={styles.section}>
          <div className={styles.divContainer}>
            <header className={styles.header}>
              <h2 className={styles.h2}>Inicio</h2>
            </header>
            {timeline.map((devit) => (
              <Devit
                data-testid="devit"
                key={devit.id}
                id={devit.id}
                createdAt={devit.createdAt}
                userId={devit.userId}
                avatar={devit.avatar}
                content={devit.content}
                username={devit.username}
                image={devit?.image}
              />
            ))}
          </div>
          <FooterHome />
        </section>
      </div>
    </>
  );
}
