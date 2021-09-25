import { IResolvers } from "@graphql-tools/utils";
import { IUser } from "../types/IUser";

const getUser = (root: any, { id }: { id: string }): IUser => {
  return { id: "1234", name: "Mocked", email: "m@m.com" };
};


export const userQuery: IResolvers = {
    Query: {
        user: getUser
    }
} 
