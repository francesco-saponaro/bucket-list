import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const useFirebase = () => {
    const firebaseConfig = {
        apiKey: process.env.VITE_APP_FIREBASE,
        authDomain: "bucket-list-ede9a.firebaseapp.com",
        projectId: "bucket-list-ede9a",
        storageBucket: "bucket-list-ede9a.appspot.com",
        messagingSenderId: "169535928299",
        appId: "1:169535928299:web:4bb6fdf50f65bd234bcbae",
        measurementId: "G-WKT71PZB7B"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app)
    const db = getFirestore(app);

    return { auth, db }
}

export default useFirebase