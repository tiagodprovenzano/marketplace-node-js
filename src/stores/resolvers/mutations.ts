import { IResolvers } from '@graphql-tools/utils';
import { IContext } from '../../apollo';
import { IStore } from '../types/IStore';

type ICreateStoreArgs = {
  store: {name: string};
};
async function createStore(
  _root: any,
  { store }: ICreateStoreArgs,
  { storeApi, user }: IContext,
) {
  if(user){
    const newStore: Omit<IStore, 'id' | 'createDate'> = {name: store.name, ownerId: user?.id} 
    return storeApi.add(newStore);
  }
  throw new Error("User not authenticated");
  
}

export const storeMutations: IResolvers = {
  Mutation: {
    addStore: createStore,
  },
};
