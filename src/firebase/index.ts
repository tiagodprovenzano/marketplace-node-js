import admin, { ServiceAccount, auth } from "firebase-admin";
var serviceAccount = require("../../firebase.json");

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});