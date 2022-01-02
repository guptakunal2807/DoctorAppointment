import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDdyKUQUESBctXTDo0oPYCCe2puTb6_mSg",
  authDomain: "doctor-appointment-dev-eb9f9.firebaseapp.com",
  projectId: "doctor-appointment-dev-eb9f9",
  storageBucket: "doctor-appointment-dev-eb9f9.appspot.com",
  messagingSenderId: "529422616902",
  appId: "1:529422616902:web:7dade6d1e1ca664b1cfd47"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
