import { PostCard } from "./PostCard";

const MOCK_POSTS = [
  {
    id: 1,
    author: "Pastor John",
    content: "Faith is not about everything turning out okay. Faith is about being okay no matter how things turn out.",
    timestamp: "2 hours ago",
    images: ["/placeholder.svg"]
  },
  {
    id: 2,
    author: "Sarah M.",
    content: "Today's devotional reminder: 'Be still, and know that I am God.' - Psalm 46:10",
    timestamp: "4 hours ago",
    images: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 3,
    author: "Ministry Team",
    content: "Join us this Sunday for a special service on finding peace in troubled times.",
    timestamp: "6 hours ago"
  }
];

export const Timeline = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {MOCK_POSTS.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};