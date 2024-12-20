import { useQuery } from "@tanstack/react-query";
import { PostCard } from "./PostCard";
import { fetchPosts } from "@/lib/supabase";
import { Post } from "@/types/database";

export const Timeline = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 text-center text-red-500">
        Error loading posts. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {posts?.map((post: Post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};