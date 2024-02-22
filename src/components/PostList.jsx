

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";

const PostList = () => {
  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading.....</p>;
  if (isError) return <p>{error?.message}</p>;

  return (
    <div className="container">
      {postData && postData.map((post) => (
        <div className="card" key={post.id}>
          <h2>{post.title}</h2>
          <p>Views: {post.views}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;