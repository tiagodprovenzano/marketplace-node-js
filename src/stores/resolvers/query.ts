// type Query {
//   stores(userId: ID!): [Store]
// }

import { IResolvers } from '@graphql-tools/utils';
import { IContext } from '../../apollo';
import { IStore } from '../types/IStore';

async function getStores(
  _root: any,
  _args: any,
  { storeApi, user }: IContext,
): Promise<IStore[]> {
  if (user && user.id) {
    return storeApi.getMany(['userId', '==', user.id]);
  }
  throw new Error('User not authenticated');
}

export const storesQuerys: IResolvers = {
  Query: {
    stores: getStores,
  },
};
