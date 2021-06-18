import { ObjectId } from 'mongoose';

export interface BLOG_ITEM {
  _id?: ObjectId;
  title: string;
  body: string;
  createdAt: number;
  username: string;
  userId: string;
}

export interface USER_INFO {
  userId: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface USER_ID_PW {
  success: boolean;
  userId: string;
  password: string;
  token: string;
}

export const USER: string = 'USER';
