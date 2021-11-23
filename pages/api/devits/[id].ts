import { firestore } from '../../../firebase/admin'

export default function getIdFromFirestore (req: any, res: any) {
  const { query } = req
  const { id } = query

  firestore.collection("devits").doc(id).get()
  .then(doc => {
    if (doc.exists) {
      const data = doc.data()
      const { createdAt } = data;
      const id = doc.id;
      return res.json({
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      })
    } else {
      return res.status(404).json({
        message: "No such document!"
      })
    }
  })

  .catch((err: never) => {
    console.log(err)
    return res.status(500).json({
      message: "Error getting document!"
    })
  })

}
