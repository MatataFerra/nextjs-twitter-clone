import { ComponentProps, useEffect, useState } from "react";
import Link from "next/link";
import { Devit } from "../../components/home/Devit";
import Create from "../../components/icons/Create";
import Home from "../../components/icons/Home";
import Search from "../../components/icons/Search";
import styles from "./styles/home.module.css";
import shared from "../styles/shared.module.css";
import useUser from "../../hooks/useUser";
import { ParsedUrlQuery } from "querystring";
import mocks from "../api/mocks/mocks";
import { GetStaticProps } from "next";

interface Params extends ParsedUrlQuery {
  mock: string;
}

export default function HomePage(props: ComponentProps<any>) {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    setTimeline(props.data);
  }, [props]);

  return (
    <>
      <div className={shared.container}>
        <section className={styles.section}>
          <div className={styles.divContainer}>
            <header className={styles.header}>
              <h2 className={styles.h2}>Inicio</h2>
            </header>
            {timeline?.map((devit) => (
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
          <nav className={styles.nav}>
            <Link href="/compose/tweet">
              <a>
                <Create height={32} width={32} color="#09f" />
              </a>
            </Link>

            <Link href="/search">
              <a>
                <Search color="#09f" />
              </a>
            </Link>

            <Link href="/home">
              <a>
                <Home color="#09f" />
              </a>
            </Link>
          </nav>
        </section>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<unknown, Params> = ({ params }) => {
  return mocks.mock.list(params.mock).then((res) => {
    const props = {
      data: [...res],
    };

    return { props };
  });
};
