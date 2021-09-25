import { IUser } from "../../users/types/IUser";
import { FirebaseDB } from "./FirebaseDB";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export class AuthAPI extends FirebaseDB {
  constructor() {
    super();
  }

  async signUp(
    displayName: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const user = await this.app
      .auth()
      .createUser({ email, password, displayName });
    return {
      id: user.uid,
      name: user.displayName as string,
      email: user.email as string,
    };
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password).then(
        async (userCredentials) => {
          const user = userCredentials.user;
          let token = await userCredentials.user.getIdToken()
          console.log(token);
          
          resolve({
            id: user.uid,
            name: user.displayName as string,
            email: user.email as string,
            token
          })        
        }
      )
      .catch(
        () => reject(new Error('Wrong credentials'))
      );
    });
  }
}
