export interface Post {
  id: string;
  author: string;
  content: string;
  images?: string[];
  timestamp: string;
  type: 'post' | 'short' | 'live' | 'podcast';
  likes: number;
}