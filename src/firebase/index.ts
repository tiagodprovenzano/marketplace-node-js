import admin, { ServiceAccount } from "firebase-admin";
import {initializeApp} from 'firebase/app';

var serviceAccount = require("../../firebase.json");
var authAccount = require("../../firebase.auth.json");

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export const firestore = firebase.firestore();

export const firebaseAuth = initializeApp(authAccount);