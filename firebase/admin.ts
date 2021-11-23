const admin = require('firebase-admin');
const serviceAccount = require("./devter-matata-firebase-adminsdk-7ieh7-bc8c8dac6c.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://devter-matata.firebaseio.com"
  });
  
} catch (error) {
  console.error(error);
}

export const firestore = admin.firestore();
