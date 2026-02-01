import type { IMainEntity } from "./global";

export interface ILike extends IMainEntity {
  userId: string;
  postId: string;
}
