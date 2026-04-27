import PostStatus from "@/app/components/PostStatus";

const page = async ({ params }) => {
  const { username, postId } = await params;
  return (
    <div>
      <PostStatus username={username} postId={postId} />
    </div>
  );
};

export default page;
