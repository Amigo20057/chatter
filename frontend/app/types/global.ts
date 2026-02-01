import type { IPostInitialState } from "./post";
import type { IUser, IUserInitialState } from "./user";

export interface IMainContext {
  user?: IUserInitialState["data"];
  posts?: IPostInitialState["data"];
}

export interface IMainEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
