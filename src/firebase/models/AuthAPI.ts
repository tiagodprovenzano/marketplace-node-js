import { IUser } from "../../users/types/IUser";
import { FirebaseDB } from "./FirebaseDB";

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
    }
  }
}
