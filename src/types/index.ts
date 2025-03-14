
export interface User {
  id: number;
  username: string;
  avatar: string;
  email: string;
  role: string;
  createTime: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createTime: Date;
  author?: User;
}

export interface Feature {
  name: string;
  description: string;
  icon: React.ReactNode;
}