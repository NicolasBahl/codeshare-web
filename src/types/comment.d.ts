interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  isAI: boolean;
  score: number;
  createdAt: string;
  author: Author;
  childComments: Comment[];
}

interface Author {
  id: string;
  username: string;
  level: string;
  score: number;
}
