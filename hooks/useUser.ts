import { useEffect, useState } from "react";
import { onAuthStateChangedUser } from "../firebase/client";
import { useRouter } from "next/dist/client/router";

enum USER_STATES {
  NOT_LOGGED = null,
  NOT_KNOWN = undefined
}

interface User {
  uid?: string;
  email?: string;
  username?: string;
  photoURL?: string;
  emailVerified?: boolean;
  avatar?: string;
  state?: USER_STATES;
}

export default function useUser():User {
  const [ user, setUser ] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChangedUser(setUser);
  }, []);

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && console.log("Not logged");
    
  }, [user, router]);

  return user;
}
