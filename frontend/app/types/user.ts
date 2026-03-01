import type { IMainEntity } from "./global";

export interface IUser extends IMainEntity {
  fullName: string;
  email: string;
  userTag: string;
  password: string;
  description?: string;
  avatar?: string;
  dateOfBirth?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

interface IUserStateData extends Partial<IUser> {}

export interface IUserInitialState {
  data: IUserStateData | null;
  isAuth: boolean;
  error?: string | null;
  status?: "idle" | "loading" | "succeeded" | "failed";
}
