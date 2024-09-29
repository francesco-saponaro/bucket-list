import { useEffect, useState } from "react";
import { useAuthStore } from "@store/storeAuth";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import useFirebase from '@hooks/useFirebase';

function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, user, logout } = useAuthStore();
  const { auth } = useFirebase();
  console.log(user, "user")

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signOut(auth).then(() => logout());
      }
      setIsLoading(false)
    });
    return () => unsubscribe();
  }, []);

  return { isLoading };
}

export default useAuth;





































// fetchUser(async () => {
//   console.log(paramToken, "PARAM TOKEN INSIDE FETCH USER CALL")
//   if (paramSessionId && paramToken) {
//     console.log("GET PARAMS SESSION");
//     await apiHoc(() => getSessionById(paramSessionId), () => {
//       setIsLoading(false)
//     });
//   } else {
//     console.log("GET ALL USER SESSION IF NO PARAMS");
//     await apiHoc(getSession, () => {
//       setIsLoading(false)
//     });
//   }
//   setIsLoading(false)
// }, (error) => {
//   setIsLoading(false)
//   setError(error);
// });

// FETCH SESSION BY ID IF PARAMS ARE PRESENT OR SESSION
// useEffect(() => {
//   if (session?.id !== Number(paramSessionId)) {
//     if (paramSessionId && paramToken) {
//       apiHoc(() => getSessionById(paramSessionId));
//     } else {
//       console.log("GET ALL USER SESSION IF NO PARAMS");
//       apiHoc(getSession);
//     }
//   }
// }, [fetchSessionAfterUserRedirectingAfterSaveParams, paramSessionId]);
