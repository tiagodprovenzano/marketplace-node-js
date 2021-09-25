import { firebase } from ".."

export class FirebaseDB {
    app: typeof firebase;
    constructor(){
        this.app = firebase
    }
}