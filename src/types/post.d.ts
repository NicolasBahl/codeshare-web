import { UserData } from "@/types/user";

export interface Post {
  id: string;
  title: string;
  content: string;
  code?: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  stack_id: string;
  score: number;
  comments: [];
  user: UserData;
  stack: { id: string; name: string };
  user_current_vote?: number;
}
