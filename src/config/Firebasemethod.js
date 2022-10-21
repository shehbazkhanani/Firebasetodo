import app from "./Firebaseconfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, onValue, ref, set, } from "firebase/database";

const auth = getAuth(app);
const database = getDatabase(app);

let signUpUser = (obj) => {
  let { email, password, userName, lastname } = obj;

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password, userName, lastname)
      .then((Success) => {
        const user = Success.user;
        const reference = ref(database, `users/${user.uid}`);
        set(reference, obj)
          .then(() => {
            resolve("Your Data Successfully submited");
          })
          .catch((errr) => {
            reject(errr);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const logInUser = (obj) => {
  let { email, password } = obj;

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((Success) => {
        const user = Success.user;
        const reference = ref(database, `users/${user.uid}`);
        onValue(reference, (event) => {
          const status = event.exists();
          if (status) {
            resolve({ ...event.val(), uid: user.uid })
          } else {
            reject("Data Not Found")
          }
        })
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export { signUpUser, logInUser };