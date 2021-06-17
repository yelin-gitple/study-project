import { ObjectId } from 'mongoose';

export interface BLOG_ITEM {
  _id: ObjectId;
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
