import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";

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
  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  //onmutate will run before actual mutation (mutate method) working
  //on success works after mutate working
  //depends situation use both,if we return something in onMutate it will go to context
  const queryClient = useQueryClient();
  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
  } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      return { id: 1 };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postTitle = formData.get("title");
    //it will create an array from iterable object.We want store all tags in single array
    const postTags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );
    if (!postTitle || !formData) return;
    // console.log(postTitle);
    // console.log(postTags);
    mutate({ id: postData.length + 1, title: postTitle, tags: postTags });
    e.target.reset();
  };

  return (
    <div>
      <form className="post-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Your Post" name="title" />
        <div className="tags">
          {tagsData?.map((tag) => (
            <div key={tag.name} className="checkbox-container">
              <input type="checkbox" name={tag.name} id={tag.name} />
              <label htmlFor={tag.name}>{tag.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="container">
        {isLoading ? (
          <p>Loading.....</p>
        ) : isError ? (
          <p>{error?.message}</p>
        ) : (
          postData
            ?.slice()
            .reverse()
            .map((post) => (
              <div className="card" key={post.id}>
                <h2>{post.title}</h2>
                {post?.tags?.map((tag, index) => (
                  <p className="tag" key={index}>
                    {tag}
                  </p>
                ))}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default PostList;

