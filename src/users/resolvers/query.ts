import { IResolvers } from "@graphql-tools/utils";
import { IContext } from "../../apollo";
import { IUser } from "../types/IUser";

const getUser = (root: any, { id }: { id: string }, { user }: IContext) => {
  console.log("user", user, id);
  if(!user || id !== user?.id){
    throw new Error("User not authenticated");
  }
  return user;
};

const logout = (root: any, { id }: { id: string }, { user, authAPI }: IContext):boolean => {
  console.log("user", user, id);
  if(user?.id){
    authAPI.logout(user?.id)
  }
  return true
};

export const userQuery: IResolvers = {
  Query: {
    user: getUser,
    logout
  },
};
