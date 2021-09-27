import { IUser } from "../../users/types/IUser";
import { FirebaseDB } from "./FirebaseDB";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { resolve } from "path/posix";
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

  async logout(id: string){
    this.app.auth().revokeRefreshTokens(id)
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          console.log(user);
          let token = await userCredentials.user.getIdToken();
          resolve({
            id: user.uid,
            name: user.displayName as string,
            email: user.email as string,
            token,
          });
        })
        .catch((e) => reject(new Error(e)));
    });
  }

  async checkToken(token: string): Promise<boolean | IUser> {
    return new Promise((resolve) => {
      this.app
        .auth()
        .verifyIdToken(token, true)
        .then((data) => {
          resolve({
            id: data.uid,
            name: data.name as string,
            email: data.email as string,
            token,
          });
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}
