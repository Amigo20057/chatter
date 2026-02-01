import type { IMainEntity } from "./global";

export interface IUser extends IMainEntity {
  fullName: string;
  email: string;
  userTag: string;
  password: string;
  description?: string;
  avatar?: string;
  dateOfBirth?: string;
}

interface IUserStateData extends Partial<IUser> {}

export interface IUserInitialState {
  data: IUserStateData;
  status?: "idle" | "loading" | "succeeded" | "failed";
}
