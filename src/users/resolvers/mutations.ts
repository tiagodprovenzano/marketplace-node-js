import { IResolvers } from "@graphql-tools/utils";
import { IContext } from "../../apollo";
import { IUser } from "../types/IUser";

const signup = async (
  root: any,
  { name, email, password }: { name: string; email: string; password: string },
  { authAPI }: IContext
): Promise<IUser> => {
  return await authAPI.signUp(name, email, password);
};

const login = async (
  root: any,
  { email, password }: { email: string; password: string },
  { authAPI }: IContext
) => {
  console.log(email, password);
  
  return await authAPI.login(email, password);
};

export const userMutation: IResolvers = {
  Mutation: {
    signup,
    login
  },
};
