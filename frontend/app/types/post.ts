import type { IComment } from "./comment";
import type { IMainEntity } from "./global";
import type { IUser } from "./user";

type Status = "idle" | "loading" | "succeeded" | "failed";

export interface IPost extends IMainEntity {
  content: string;
  img?: string;
  authorId: string;
  author: IUser;
  comments?: IComment[] | null;
  _count: {
    likes: number;
    comments: number;
    postView: number;
  };
  isLiked: boolean;
}

interface IPostStateData extends Partial<IPost> {}

export interface IPostInitialState {
  posts: IPostStateData[];
  post?: IPost | null;
  listStatus?: Status;
  actionStatus?: Status;
  postStatus?: Status;
}

export interface IPostCreate {
  content: string;
  img?: string;
}
