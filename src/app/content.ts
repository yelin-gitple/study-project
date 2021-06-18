import { ObjectId } from 'mongoose';

export interface BLOG_ITEM {
  _id?: ObjectId;
  userId: string;
  title: string;
  body: string;
  createdAt: number;
  username: string;
}

export interface USER_INFO {
  userId: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface USER_ID_PW {
  id: ObjectId;
  success: boolean;
  userId: string;
  password: string;
  token: string;
}

export const USER: string = 'USER';

//export const LS_USER = JSON.parse(localStorage.getItem(USER) || "");
