
export interface user {
  id: number;
  username: string;
  avatar: string;
  email: string;
  role: string;
  created_at: Date;
}

export interface post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}