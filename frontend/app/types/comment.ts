import type { IMainEntity } from "./global";

export interface IComment extends IMainEntity {
  content: string;
  authorId: string;
  postId: string;
}
