import type { IComment } from "./comment";
import type { IMainEntity } from "./global";
import type { IUser } from "./user";

export interface IPost extends IMainEntity {
  content: string;
  img?: string;
  authorId: string;
  author: IUser;
  comments: IComment[] | null;
  _count: {
    likes: number;
    comments: number;
    postView: number;
  };
}

interface IPostStateData extends Partial<IPost> {}

export interface IPostInitialState {
  data: IPostStateData[];
  status?: "idle" | "loading" | "succeeded" | "failed";
}

export interface IPostCreate {
  content: string;
  img?: string;
}
