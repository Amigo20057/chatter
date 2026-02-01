import type { IMainEntity } from "./global";

export interface IPost extends IMainEntity {
  content: string;
  img?: string;
  authorId: string;
}

interface IPostStateData extends Partial<IPost> {}

export interface IPostInitialState {
  data: IPostStateData[];
  status?: "idle" | "loading" | "succeeded" | "failed";
}
