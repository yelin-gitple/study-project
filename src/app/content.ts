import { ObjectId } from 'mongoose';

export interface BLOG_ITEM {
  _id: ObjectId;
  title: string;
  body: string;
  createdAt: number;
  username: string;
}
