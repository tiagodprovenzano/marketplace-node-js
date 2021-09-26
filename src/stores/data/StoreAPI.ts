import { FirebaseAPI } from "../../firebase/FirebaseAPI";
import { IStore } from "../types/IStore";

export class StoreAPI extends FirebaseAPI<IStore> {
  constructor(){
    super('stores')
  }
}