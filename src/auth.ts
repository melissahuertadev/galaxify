import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Crear usuario en Firestore si no existe
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      role: "user",
      createdAt: serverTimestamp(),
    });
  }

  // Retornar info del usuario y rol
  return { uid: user.uid, email: user.email, role: docSnap.exists() ? docSnap.data()?.role : "user" };
};

export { auth, loginWithGoogle };