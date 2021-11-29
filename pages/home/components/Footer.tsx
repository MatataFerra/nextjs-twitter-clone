import Link from "next/link";
import Create from "../../../components/icons/Create";
import Home from "../../../components/icons/Home";
import Search from "../../../components/icons/Search";

import styles from "../home.module.css";

export const FooterHome: React.FC = () => {
  return (
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
  );
};
