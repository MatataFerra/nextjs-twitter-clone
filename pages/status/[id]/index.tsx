import { firestore } from '../../../firebase/admin'
import shared from "../../styles/shared.module.css";
import { ComponentProps } from "react";
import { Devit } from "../../../components/home/Devit";
import { useRouter } from "next/router";

interface Props extends ComponentProps<any> {
  id: string;
}

export default function DevitPage(props: Props) {
  const router = useRouter();

  if(router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className={shared.container}>
        <Devit {...props}/>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{params: { id: "1" }}],
    fallback: true,
  }
}

export async function getStaticProps (context) {
  const { params } = context; 
  const { id } = params;

  return firestore.collection("devits").doc(id).get()
  .then((doc:any) => {
    if (doc.exists) {
      const data = doc.data()
      const { createdAt } = data;
      const id = doc.id;
      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      
      return { props }
    } else {
      return { props: {}}
    }
  })

  .catch((err: never) => {
    console.log(err)
    return {props: {}}
  })

}

// DevitPage.getInitialProps = async (context) => {
//   const { query, res } = context; 
//   const { id } = query;

//   const response = await fetch(`http://localhost:3000/api/devits/${id}`);
//   const data = await response.json();

//   if( res ) {
//     res.writeHead(301, {location: '/home'}).end();
//   }

//   return { data };
// };
