import type { IPost } from "~/types/post";
import type { IUser } from "~/types/user";

export const users: IUser[] = [
  {
    id: "string-user-1",
    email: "denrizuk@gmail.com",
    password: "dfsajkdweiqwhe",
    fullName: "Denys Ryzhuk",
    userTag: "amigosic",
    description: "Test description for this mock user",
    dateOfBirth: "05.12.2005",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const posts: IPost[] = [
  {
    id: "string-post-1",
    authorId: "string-user-1",
    content:
      "Today, I learned from GPT-5.2 that spectral clipping can be seen as replacing the linearized loss assumption in Muon by a local quadratic model with isotropic Hessian instead",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: users[0],
    comments: [],
    _count: {
      comments: 111,
      likes: 555,
      postView: 5000,
    },
    img: "/test.png",
  },
  {
    id: "string-post-2",
    authorId: "string-user-1",
    content: "This second test title for post",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: users[0],
    comments: [],
    _count: {
      comments: 111,
      likes: 555,
      postView: 5000,
    },
  },
  {
    id: "string-post-3",
    authorId: "string-user-1",
    content: "This test title for post",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: users[0],
    comments: [],
    _count: {
      comments: 111,
      likes: 555,
      postView: 5000,
    },
  },
  {
    id: "string-post-4",
    authorId: "string-user-1",
    content:
      "Today, I learned from GPT-5.2 that spectral clipping can be seen as replacing the linearized loss assumption in Muon by a local quadratic model with isotropic Hessian instead",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: users[0],
    comments: [],
    _count: {
      comments: 111,
      likes: 555,
      postView: 5000,
    },
  },
  {
    id: "string-post-5",
    authorId: "string-user-1",
    content:
      "Today, I learned from GPT-5.2 that spectral clipping can be seen as replacing the linearized loss assumption in Muon by a local quadratic model with isotropic Hessian instead",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: users[0],
    comments: [],
    _count: {
      comments: 111,
      likes: 555,
      postView: 5000,
    },
  },
  {
    id: "string-post-6",
    authorId: "string-user-1",
    content:
      "What matters is not release of some subset of the Epstein files, but rather the prosecution of those who committed heinous crimes with Epstein. When there is at least one arrest, some justice will have been done. If not, this is all performative. Nothing but a distraction.",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: users[0],
    comments: [],
    _count: {
      comments: 111,
      likes: 555,
      postView: 5000,
    },
  },
  {
    id: "string-post-7",
    authorId: "string-user-1",
    content:
      "What matters is not release of some subset of the Epstein files, but rather the prosecution of those who committed heinous crimes with Epstein. When there is at least one arrest, some justice will have been done. If not, this is all performative. Nothing but a distraction.",
    createdAt: new Date(),
    updatedAt: new Date(),
    author: users[0],
    comments: [],
    _count: {
      comments: 111,
      likes: 555,
      postView: 5000,
    },
  },
];
