import styles from "./styles/devitpage.module.css";
import shared from "../../styles/shared.module.css";
import { ComponentProps } from "react";
import { Devit } from "../../../components/home/Devit";

interface Props extends ComponentProps<any> {
  id: string;
}

export default function DevitPage({data}: Props) {
  return (
    <>
      <div className={shared.container}>
        <Devit {...data}/>
      </div>
    </>
  );
}

DevitPage.getInitialProps = async (context) => {
  const { query } = context; 
  const { id } = query;

  const response = await fetch(`http://localhost:3000/api/devits/${id}`);
  const data = await response.json();

  console.log({data});
  

  return { data };
};
