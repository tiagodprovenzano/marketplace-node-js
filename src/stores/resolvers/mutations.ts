import { IResolvers } from '@graphql-tools/utils';
import { IContext } from '../../apollo';
import { IStore } from '../types/IStore';

type ICreateStoreArgs = {
  store: Omit<IStore, 'id' | 'createDate'>;
};
async function createStore(
  _root: any,
  { store }: ICreateStoreArgs,
  { storeApi }: IContext,
) {
  return storeApi.add(store);
}

const storeMutations: IResolvers = {
  Mutation: {
    addStore: createStore,
  },
};
