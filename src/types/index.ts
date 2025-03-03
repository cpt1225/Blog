
export interface User {
  id: number;
  username: string;
  avatar: string;
  email: string;
  role: string;
  createdTime: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createTime: Date;
  user:User
}

export interface Feature {
  name: string;
  description: string;
  icon: React.ReactNode;
}