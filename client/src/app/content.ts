import { ObjectId } from 'mongoose';

export interface BLOG_ITEM {
  _id?: ObjectId;
  uid: string;
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

export interface KEYWORD {
  keywordsList: [];
}

export const USER: string = 'USER';
