import type { IMainEntity } from "./global";
import type { IUser } from "./user";

export interface IComment extends IMainEntity {
  content: string;
  authorId: string;
  postId: string;
  author: IUser;
}
