import { IResolvers } from "@graphql-tools/utils";
import { IContext } from "../../apollo";
import { IUser } from "../types/IUser";

const user = (root: any, { id }: { id: string }, { user }: IContext) => {
  console.log("user", user, id);
  if(!user || id !== user?.id){
    throw new Error("User not authenticated");
  }
  return { id: "1234", name: "Mocked", email: "m@m.com" };
};

const login = async (
  root: any,
  { email, password }: { email: string; password: string },
  { authAPI }: IContext
) => {
  return await authAPI.login(email, password);
};

export const userQuery: IResolvers = {
  Query: {
    user,
  },

  Mutation: {
    login,
  },
};
