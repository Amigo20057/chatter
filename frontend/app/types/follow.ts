import type { IMainEntity } from "./global";

export interface IFollow extends IMainEntity {
  followerId: string;
  followingId: string;
}
