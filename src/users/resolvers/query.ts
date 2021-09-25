import { IResolvers } from "@graphql-tools/utils";
import { IContext } from "../../apollo";
import { IUser } from "../types/IUser";

const user = (root: any, { id }: { id: string }): IUser => {
  return { id: "1234", name: "Mocked", email: "m@m.com" };
};

const login = async (root: any, { email, password }: { email: string, password: string }, {authAPI}: IContext) => {
    return await authAPI.login(email, password)
}


export const userQuery: IResolvers = {
    Query: {
        user,
        login
    }
} 
